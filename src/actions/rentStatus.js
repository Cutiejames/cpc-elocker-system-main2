const connection = require('../database/connection');

// get all locker statuses for a logged-in user
const getLockerStatus = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const query = `
            SELECT 
                lr.rental_id,
                lr.locker_id,
                l.locker_number,
                l.location,
                l.status AS locker_status,
                lr.start_date,
                lr.due_date,
                lr.status AS rental_status,
                lr.cancelled_at,
                lr.payment_method,
                lr.total_amount,
                lr.paid_amount,
                lr.balance,
                u.user_id,
                u.stud_id,
                u.f_name,
                u.l_name,
                u.email,
                c.course_name,
                CONCAT('/uploads/profile_pics/', u.user_id, '.jpg') AS profile_pic
            FROM locker_rentals lr
            JOIN lockers l ON lr.locker_id = l.locker_id
            JOIN users u ON lr.user_id = u.user_id
            JOIN courses c ON u.course_id = c.course_id
            WHERE lr.user_id = ?
            ORDER BY lr.start_date DESC
        `;

        const [rows] = await connection.query(query, [userId]);
        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'server error' });
    }
};

// cancel reservation with reason
const cancelReservation = async (req, res) => {
    try {
        const { rental_id, reason } = req.body;
        const userId = req.user.user_id;

        // check if rental belongs to this user and is active/reserved
        const [rentals] = await connection.query(
            'SELECT * FROM locker_rentals WHERE rental_id = ? AND user_id = ? AND status IN ("reserved", "pending")',
            [rental_id, userId]
        );

        // console.log('cancelReservation debug', { rental_id, userId, rentals });

        if (rentals.length === 0) {
            return res.status(403).json({ error: 'not allowed to cancel this reservation' });
        }

        const rental = rentals[0];

        // update rental status to cancelled
        await connection.query(
            'UPDATE locker_rentals SET status = ?, cancelled_at = NOW() WHERE rental_id = ?',
            ['cancelled', rental_id]
        );

        // update locker back to available
        await connection.query(
            'UPDATE lockers SET status = ? WHERE locker_id = ?',
            ['available', rental.locker_id]
        );

        // insert cancellation reason
        await connection.query(
            'INSERT INTO cancellation_reasons (rental_id, user_id, reason) VALUES (?, ?, ?)',
            [rental_id, userId, reason]
        );

        // remove the cancelled reservation from locker_rentals
        // await connection.query('DELETE FROM locker_rentals WHERE rental_id = ?', [rentalId]);

        res.json({ message: 'reservation cancelled successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'server error' });
    }
};

// get payment history
const getPaymentHistory = async (req, res) => {
    try {
        const { rentalId } = req.params;
        const userId = req.user.user_id;

        const query = `
            SELECT
                status,
                DATE_FORMAT(start_date, '%Y-%m-%d') AS start_date,
                DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date,
                payment_method,
                balance,
                paid_amount,
                total_amount
            FROM locker_rentals
            WHERE rental_id = ? AND user_id = ?
        `;

        const [rows] = await connection.query(query, [rentalId, userId]);

        if (rows.length === 0) {
            return res.status(403).json({ error: 'not authorized to view this payment history' });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'server error' });
    }
};

module.exports = {
    getLockerStatus,
    cancelReservation,
    getPaymentHistory
};