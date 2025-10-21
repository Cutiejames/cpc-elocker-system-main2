const connection = require('../database/connection');
const { logActivity } = require('./auditlog');

// ========== record monthly follow-up payment ==========
const recordMonthlyPayment = async (req, res) => {
  try {
      const { rental_id, amount, payment_method } = req.body;
      const user_id = req.user.user_id;
      const username = req.user.username;
      const role = req.user.role;

    if (!rental_id || !amount) {
      return res.status(400).json({ error: 'rental_id and amount required' });
    }

    // find rental
    const [rentalRows] = await connection.query(
      'SELECT * FROM locker_rentals WHERE rental_id = ?',
      [rental_id]
    );

    if (rentalRows.length === 0)
      return res.status(404).json({ error: 'rental not found' });

    const rental = rentalRows[0];

    if (rental.status === 'expired')
      return res.status(400).json({ error: 'locker already expired' });

    if (rental.balance <= 0)
      return res.status(400).json({ error: 'locker already fully paid' });

    // calculate new values
    const newPaid = rental.paid_amount + parseFloat(amount);
    const newBalance = rental.total_amount - newPaid;

    let newStatus = rental.status;
    if (newBalance <= 0) {
      newStatus = 'active'; // or maybe "fully_paid"
    } else if (newBalance < rental.total_amount) {
      newStatus = 'partially_paid';
    }

    // update main locker_rentals record
    await connection.query(
      `UPDATE locker_rentals 
       SET paid_amount = ?, balance = ?, status = ?
       WHERE rental_id = ?`,
      [newPaid, newBalance, newStatus, rental_id]
    );

    // add to payment history
    await connection.query(
      `INSERT INTO locker_payments (rental_id, user_id, amount_paid, payment_method, payment_date)
       VALUES (?, ?, ?, ?, NOW())`,
      [rental_id, user_id, amount, payment_method]
    );

    // audit log
    await logActivity(
      user_id,
      username,
      `${role === 'admin' ? 'Admin' : 'User'} recorded payment ₱${amount_paid} for rental ID ${rental_id}`
    );

    // if locker fully paid, set expiration after rental months
    if (newBalance <= 0) {
      await connection.query(
        `UPDATE lockers 
         SET status = 'active'
         WHERE locker_id = ?`,
        [rental.locker_id]
      );
    }

    res.json({
      message: `payment recorded successfully (${newStatus})`,
      new_balance: newBalance,
      new_status: newStatus,
    });
  } catch (error) {
    console.error('Error recording monthly payment:', error);
    res.status(500).json({ error: 'internal server error' });
  }
};

module.exports = { recordMonthlyPayment };