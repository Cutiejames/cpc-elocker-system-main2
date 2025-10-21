const connection = require('../database/connection');

const lockerTransaction = async (req, res) => {
  const { locker_id, months, paid_months, payment_method, action_type } = req.body;
  const user_id = req.user.user_id;

  if (!locker_id || !payment_method || !action_type) {
    return res.status(400).json({ error: 'Locker ID, payment method, and action type are required' });
  }

  if (action_type === 'rent' && (!months || !paid_months)) {
    return res.status(400).json({ error: 'Months and paid months are required for rental' })
  }

  // qr is not allowed for reserve
  if (action_type === 'reserve' && payment_method === 'qr') {
    return res.status(400).json({ error: 'QR payment is not supported for reservations.' });
  }

  if (!['rent', 'reserve'].includes(action_type)) {
    return res.status(400).json({ error: 'Invalid action type. Must be rent or reserve' });
  }

  let monthsValue = null;
  let total = null;
  let paid = null;
  let balance = null;

  if (action_type === 'rent') {
    const ratePerMonth = 60;
    monthsValue = months;
    total = months * ratePerMonth;
    paid = paid_months * ratePerMonth;
    balance = total - paid;
  }

  // const rentStatus = payment_method === 'qr' ? 'active' : 'pending';
  // const lockerStatus = payment_method === 'qr' ? 'rented' : 'pending';

  // decide rental and locker status
  let rentStatus;
  let lockerStatus;

  if (action_type === 'reserve') {
    rentStatus = 'reserved'; // changed here
    lockerStatus = 'reserved';
  } else if (action_type === 'rent') {
    if (payment_method === 'qr') {
      rentStatus = 'active';
      lockerStatus = 'rented';
    } else {
      rentStatus = 'pending';
      lockerStatus = 'pending';
    }
  }

  try {
    //check if the user has 2 rented/pending lockers
    const [userLockers] = await connection.query(
      'SELECT COUNT(*) AS count FROM lockers WHERE assigned_to = ? AND status IN ("rented", "pending")',
      [user_id]
    );

    if (userLockers[0].count >= 2) {
      return res.status(400).json({ error: 'You have reached the maximum locker limit (2)' });
    }

    //check is the locker exists
    const [lockerRows] = await connection.query(
      'SELECT * FROM lockers WHERE locker_id = ?',
      [locker_id]
    );

    if (lockerRows.length === 0) {
      return res.status(404).json({ error: 'Locker not found' });
    }

    const locker = lockerRows[0];

    //check if already rented
    if (locker.status === 'rented') {
      return res.status(400).json({ error: 'Locker is already rented for another user.' });
    }

    // prevent renting if the locker is reserved
    if (['reserved', 'pending'].includes(locker.status) && locker.assigned_to !== user_id) {
      return res.status(400).json({ error: 'Locker is already reserved for another user.' });
    }

    // check if user already has a reservation/rental for this locker
    const [existingRental] = await connection.query(
      `SELECT * FROM locker_rentals
      WHERE locker_id = ? 
      AND user_id = ? 
      AND status IN ('active', 'pending', 'reserved')`,
      [locker_id, user_id]
    );

    if (existingRental.length > 0) {
      return res.status(400).json({
        error: 'You already have an active or pending reservation for this locker.'
      });
    }

    //determine expiry
    const startDate = new Date();
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + months);

    // update locker status to rented
    if (action_type === 'reserve') {
      await connection.query(
        `UPDATE lockers
        SET status = 'reserved',
        assigned_to = ?,
        reserved_date = NOW(),
        reserve_expiry = DATE_ADD(NOW(), INTERVAL 2 DAY)
        WHERE locker_id = ?`,
        [user_id, locker_id]
      );
    } else {
      await connection.query(
        `UPDATE lockers
      SET status = ?,
      assigned_to = ?,
      rented_date = NOW(),
      due_date = DATE_ADD(NOW(), INTERVAL ? MONTH)
      WHERE locker_id = ?`,
        [lockerStatus, user_id, months, locker_id]
      );
    }


    //insert into rental lockers
    await connection.query(
      `INSERT INTO locker_rentals
      (locker_id,
      user_id,
      months,
      start_date,
      due_date,
      total_amount,
      paid_amount,
      balance,
      payment_method,
      status,
      action_type)
      VALUES (?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ? MONTH), ?, ?, ?, ?, ?, ?)`,
      [locker_id, user_id, monthsValue, monthsValue, total, paid, balance, payment_method, rentStatus, action_type]
    );

    return res.status(200).json({
      message: rentStatus === "active"
        ? `Locker ${action_type} successful and active.`
        : `Locker ${action_type} is pending. Please pay before expiry date.`
    });

  } catch (error) {
    console.error('Error during locker transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = lockerTransaction;