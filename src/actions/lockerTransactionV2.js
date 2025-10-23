// controllers/lockerController.js
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const QRCode = require('qrcode');
const connection = require('../database/connection');
const { logActivity } = require('./auditlog');

// ---- constants ----
const RATE_PER_MONTH = 60;
const RECEIPT_DIR = path.join(__dirname, '..', 'uploads', 'receipts');
const QR_DIR = path.join(__dirname, '..', 'uploads', 'qrs');

// ✅ your official static gcash emv qr (fixed destination)
const GCASH_EMV_DATA =
  '00020101021127830012com.p2pqrpay0111GXCHPHM2XXX02089996440303152170200000006560417DWQM4TK3JDO11VF385204601653036085802PH5911SH*****E V.6006Umapad6104123463047E07';

// ✅ clean old qr codes (older than 7 days)
function cleanOldQRCodes(dir) {
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (now - stats.mtimeMs > sevenDays) fs.unlinkSync(filePath);
  });
}

// ensure upload directories exist
if (!fs.existsSync(RECEIPT_DIR)) fs.mkdirSync(RECEIPT_DIR, { recursive: true });
if (!fs.existsSync(QR_DIR)) fs.mkdirSync(QR_DIR, { recursive: true });
cleanOldQRCodes(QR_DIR);

// ---- multer setup for receipts ----
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, RECEIPT_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const filename = `${Date.now()}_${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

// helper: validate payment amount
function isValidPaymentAmount(amount, remainingBalance) {
  if (amount <= 0) return false;
  if (Math.abs(amount - remainingBalance) < 0.0001) return true;
  return amount % RATE_PER_MONTH === 0;
}

// ---- main controller: initial rent/reserve and admin assign ----
const lockerTransaction = async (req, res) => {
  const { locker_id, months, paid_months, payment_method, action_type, student_id } = req.body;
  const user_id = req.user.user_id;
  const role = req.user.role;
  const adminName = req.user.username;

  if (!locker_id || !payment_method)
    return res.status(400).json({ error: 'locker id and payment method are required' });

  // ---------- admin assign ----------
  if (role === 'admin') {
    try {
      if (action_type !== 'rent')
        return res.status(400).json({ error: 'admins can only assign rentals.' });
      if (!student_id)
        return res.status(400).json({ error: 'student id is required to assign a locker.' });

      const [studentRows] = await connection.query(
        'SELECT user_id, f_name, m_name, l_name, stud_id FROM users WHERE stud_id = ?',
        [student_id]
      );
      if (studentRows.length === 0)
        return res.status(404).json({ error: 'no user found with this student id.' });

      const targetUser = studentRows[0];
      const targetUserId = targetUser.user_id;
      const studentName = [targetUser.f_name, targetUser.m_name, targetUser.l_name]
        .filter(Boolean)
        .join(' ');

      const [userLockers] = await connection.query(
        'SELECT COUNT(*) AS count FROM lockers WHERE assigned_to = ? AND status IN ("rented", "pending", "reserved")',
        [targetUserId]
      );
      if (userLockers[0].count >= 2)
        return res.status(400).json({ error: 'this student reached locker limit (2)' });

      const [lockerRows] = await connection.query('SELECT * FROM lockers WHERE locker_id = ?', [
        locker_id,
      ]);
      if (lockerRows.length === 0)
        return res.status(404).json({ error: 'locker not found' });

      const locker = lockerRows[0];
      const lockerName = locker.locker_number;

      if (['rented', 'pending', 'reserved'].includes(locker.status))
        return res.status(400).json({ error: 'locker already assigned.' });

      const [existingRental] = await connection.query(
        `SELECT * FROM locker_rentals WHERE locker_id = ? AND user_id = ? 
         AND status IN ('active', 'pending', 'reserved')`,
        [locker_id, targetUserId]
      );
      if (existingRental.length > 0)
        return res.status(400).json({ error: 'student already has active rental.' });

      const ratePerMonth = RATE_PER_MONTH;
      const total = months * ratePerMonth;
      const paid = (paid_months || 0) * ratePerMonth;
      const balance = total - paid;

      let rentStatus = 'active';
      let lockerStatus = 'rented';

      await connection.query(
        `UPDATE lockers SET status=?, assigned_to=?, rented_date=NOW(), due_date=DATE_ADD(NOW(), INTERVAL ? MONTH)
         WHERE locker_id=?`,
        [lockerStatus, targetUserId, months, locker_id]
      );

      const [insertRental] = await connection.query(
        `INSERT INTO locker_rentals (locker_id,user_id,months,start_date,due_date,total_amount,paid_amount,balance,payment_method,status,action_type)
         VALUES (?,?,?,NOW(),DATE_ADD(NOW(),INTERVAL ? MONTH),?,?,?,?,?,?)`,
        [locker_id, targetUserId, months, months, total, paid, balance, payment_method, rentStatus, 'rent']
      );

      // get rental id
      const rentalId = insertRental.insertId;

      await logActivity(user_id, adminName, `assigned locker ${lockerName} to ${studentName}`);

      // ✅ generate qr if admin chose qr method
      if (payment_method === 'qr') {
        const fileName = `gcash_admin_${student_id}_${Date.now()}.png`;
        const qrPath = path.join(QR_DIR, fileName);
        await QRCode.toFile(qrPath, GCASH_EMV_DATA, { width: 400 });

        return res.status(200).json({
          message: `locker assigned successfully. scan qr below to pay.`,
          qr_download: `/uploads/qrs/${fileName}`,
          amount_due: paid,
          rental_id: rentalId,
        });
      }

      return res.status(200).json({ message: `locker assigned to student id ${targetUser.stud_id}` });
    } catch (error) {
      console.error('error during admin locker assignment:', error);
      return res.status(500).json({ error: 'internal server error' });
    }
  }

  // ---------- student rent/reserve ----------
  try {
    if (!action_type) return res.status(400).json({ error: 'action type is required' });

    const [lockerRows] = await connection.query('SELECT * FROM lockers WHERE locker_id = ?', [
      locker_id,
    ]);
    if (lockerRows.length === 0)
      return res.status(404).json({ error: 'locker not found' });

    const locker = lockerRows[0];
    if (locker.status === 'rented')
      return res.status(400).json({ error: 'locker already rented.' });

    // ✅ student RESERVE logic
  if (action_type === 'reserve') {
    // prevent multiple reservations by same student
    const [existing] = await connection.query(
      `SELECT COUNT(*) AS count FROM locker_rentals 
      WHERE user_id = ? AND status IN ('reserved', 'pending', 'active')`,
      [user_id]
    );

    if (existing[0].count >= 2)
      return res.status(400).json({ error: 'you reached locker limit (2)' });
    
    // mark locker as reserved for 2 days
    await connection.query(
      `UPDATE lockers 
       SET status='reserved',
           assigned_to=?,
           reserved_date=NOW(),
           reserve_expiry=DATE_ADD(NOW(), INTERVAL 2 DAY)
       WHERE locker_id=?`,
      [user_id, locker_id]
    );

    // record reservation (no months/payment yet)
    await connection.query(
      `INSERT INTO locker_rentals 
       (locker_id, user_id, months, start_date, due_date, total_amount, paid_amount, balance, payment_method, status, action_type)
       VALUES (?, ?, 0, NOW(), DATE_ADD(NOW(), INTERVAL 2 DAY), 0, 0, 0, 'cash', 'reserved', 'reserve')`,
      [locker_id, user_id]
    );

    return res.status(200).json({
      message:
        'locker reserved successfully. please visit the ssg office within 2 days to finalize your rental.',
    });
  }

    const total = months * RATE_PER_MONTH;
    const paid = (paid_months || 0) * RATE_PER_MONTH;
    const balance = total - paid;

    let rentStatus = 'pending';
    let lockerStatus = 'pending';

    await connection.query(
      `UPDATE lockers SET status=?, assigned_to=?, rented_date=NOW(), due_date=DATE_ADD(NOW(), INTERVAL ? MONTH)
       WHERE locker_id=?`,
      [lockerStatus, user_id, months, locker_id]
    );

    const [insertResult] = await connection.query(
  `INSERT INTO locker_rentals (locker_id,user_id,months,start_date,due_date,total_amount,paid_amount,balance,payment_method,status,action_type)
   VALUES (?,?,?,NOW(),DATE_ADD(NOW(),INTERVAL ? MONTH),?,?,?,?,?,?)`,
  [locker_id, user_id, months, months, total, paid, balance, payment_method, rentStatus, action_type]
);

const rentalId = insertResult.insertId; // ✅ get new rental id


    // ✅ qr generation for student if payment_method is qr
    if (payment_method === 'qr') {
      const fileName = `gcash_student_${user_id}_${Date.now()}.png`;
      const qrPath = path.join(QR_DIR, fileName);
      await QRCode.toFile(qrPath, GCASH_EMV_DATA, { width: 400 });

      return res.status(200).json({
        message: 'locker rental created. scan qr below to pay via gcash.',
        qr_download: `/uploads/qrs/${fileName}`,
        amount_due: paid,
        rental_id: rentalId,
      });
    }

    return res.status(200).json({
      message: `locker ${action_type} is pending. please complete payment soon.`,
    });
  } catch (error) {
    console.error('error during locker transaction:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

// student uploads payment receipt (auto amount = same as rental paid_amount, no manual input)
// student uploads payment receipt (store image in database as base64 blob)
const recordPayment = async (req, res) => {
  try {
    const { rental_id, receipt, amount_paid_now } = req.body;
    if (!rental_id) return res.status(400).json({ error: 'rental_id is required' });
    if (!receipt) return res.status(400).json({ error: 'receipt (base64) is required' });

    // convert base64 string to buffer for longblob
    const receiptBuffer = Buffer.from(receipt, 'base64');

    // get rental info
    const [rentalRows] = await connection.query(
      `
      SELECT lr.months, lr.total_amount, lr.paid_amount, lr.balance, lr.locker_id,
             u.user_id, u.f_name, u.m_name, u.l_name
      FROM locker_rentals lr
      JOIN users u ON u.user_id = lr.user_id
      WHERE lr.rental_id = ?
      `,
      [rental_id]
    );

    if (rentalRows.length === 0) return res.status(404).json({ error: 'rental not found' });

    const rental = rentalRows[0];

    if (rental.balance <= 0)
      return res.status(400).json({ error: 'no remaining balance to pay' });

   // ✅ determine payment amount now
    const currentPayment = parseFloat(amount_paid_now) || 0;
    if (currentPayment <= 0)
      return res.status(400).json({ error: 'invalid payment amount' });

    // insert into locker_payments with blob receipt
    const [insertResult] = await connection.query(
      `
      INSERT INTO locker_payments
        (rental_id, user_id, amount_paid, confirmed_amount, payment_method,
         payment_date, remarks, receipt_path, verified, verified_at)
      VALUES (?, ?, ?, 0.00, 'qr', NOW(), 'receipt uploaded - pending verification', ?, 0, NOW())
      `,
      [rental_id, rental.user_id, currentPayment, receiptBuffer]
    );

    res.status(200).json({
      message: `payment receipt uploaded successfully for ₱${currentPayment.toFixed(2)}, awaiting admin verification`,
      payment_id: insertResult.insertId,
      expected_amount: currentPayment,
      student_name: `${rental.f_name} ${rental.m_name ? rental.m_name + ' ' : ''}${rental.l_name}`,
    });
  } catch (error) {
    console.error('error recording payment:', error);
    res.status(500).json({ error: 'internal server error' });
  }
};

// verify payment (admin route)
// admin verifies payment (no manual amount for QR)
const verifyPayment = async (req, res) => {
  const { approve, confirmed_amount } = req.body;
  const { payment_id } = req.params;
  const adminId = req.user.user_id;
  const adminName = req.user.username;

  try {
    const [rows] = await connection.query(
      `SELECT lp.*, lr.total_amount, lr.paid_amount, lr.balance, lr.rental_id, lr.locker_id,
              u.f_name, u.m_name, u.l_name
       FROM locker_payments lp
       JOIN locker_rentals lr ON lp.rental_id = lr.rental_id
       JOIN users u ON lr.user_id = u.user_id
       WHERE lp.payment_id = ?`,
      [payment_id]
    );

    if (rows.length === 0) return res.status(404).json({ error: 'payment not found' });
    const payment = rows[0];
    const studentName = `${payment.f_name} ${payment.m_name ? payment.m_name + ' ' : ''}${payment.l_name}`;

    // if admin rejects
    if (!approve) {
      await connection.query(
        `UPDATE locker_payments SET verified = -1, verified_at = NOW() WHERE payment_id = ?`,
        [payment_id]
      );
      await logActivity(adminId, adminName, `rejected payment of ${studentName}`);
      return res.status(200).json({ message: `payment of ${studentName} rejected successfully` });
    }

    // choose correct confirmed amount
    let confirmed;
    if (payment.payment_method === 'qr') {
      // for qr, just confirm what's already in rental.paid_amount
      confirmed = parseFloat(payment.paid_amount);
    } else {
      // for in-person (cash/follow-up), admin must input manually
      confirmed = parseFloat(confirmed_amount || 0);
    }

    if (isNaN(confirmed) || confirmed <= 0)
      return res.status(400).json({ error: 'invalid confirmed amount' });

    // mark as verified
    await connection.query(
      `UPDATE locker_payments
       SET verified = 1,
           confirmed_amount = ?,
           verified_at = NOW()
       WHERE payment_id = ?`,
      [confirmed, payment_id]
    );

    // update rental (keep same paid_amount if qr; add only if manual)
    const newPaid =
      payment.payment_method === 'qr'
        ? parseFloat(payment.paid_amount)
        : parseFloat(payment.paid_amount) + confirmed;

    const newBalance = Math.max(0, parseFloat(payment.total_amount) - newPaid);

    await connection.query(
      `UPDATE locker_rentals 
       SET paid_amount = ?, 
           balance = ?, 
           status = 'active'
       WHERE rental_id = ?`,
      [newPaid, newBalance, payment.rental_id]
    );

    // mark locker as rented
    await connection.query(
      `UPDATE lockers SET status = 'rented' WHERE locker_id = ?`,
      [payment.locker_id]
    );

    await logActivity(
      adminId,
      adminName,
      `verified ${payment.payment_method} payment of ${studentName} (₱${confirmed}), locker ${payment.locker_id} active`
    );

    res.status(200).json({
      message: `payment of ${studentName} verified successfully`,
      confirmed_amount: confirmed,
      new_paid_amount: newPaid,
      new_balance: newBalance,
    });
  } catch (error) {
    console.error('error verifying payment:', error);
    res.status(500).json({ error: 'internal server error' });
  }
};

// ---- helper: list payments for a rental ----
const getPaymentsForRental = async (req, res) => {
  const rental_id = req.params.rental_id;
  try {
    const [rows] = await connection.query('SELECT * FROM locker_payments WHERE rental_id = ? ORDER BY payment_date DESC', [rental_id]);
    return res.status(200).json(rows);
  } catch (error) {
    console.error('error fetching payments:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

module.exports = { 
  lockerTransaction,
  recordPayment,
  verifyPayment,
  getPaymentsForRental,
  upload
};
