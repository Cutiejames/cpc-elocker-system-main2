const connection = require('../database/connection');

// ================= USER SIDE =================

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

        const [rentals] = await connection.query(
            'SELECT * FROM locker_rentals WHERE rental_id = ? AND user_id = ? AND status IN ("reserved", "pending")',
            [rental_id, userId]
        );

        if (rentals.length === 0) {
            return res.status(403).json({ error: 'not allowed to cancel this reservation' });
        }

        const rental = rentals[0];

        await connection.query(
            'UPDATE locker_rentals SET status = ? WHERE rental_id = ?',
            ['cancelled', rental_id]
        );

        await connection.query(
            'UPDATE lockers SET status = ? WHERE locker_id = ?',
            ['available', rental.locker_id]
        );

        await connection.query(
            'INSERT INTO cancellation_reasons (rental_id, user_id, reason) VALUES (?, ?, ?)',
            [rental_id, userId, reason]
        );

        res.json({ message: 'reservation cancelled successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'server error' });
    }
};

// get payment history (user only their own)
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


// ================= ADMIN SIDE =================

// get all active rentals (admin) with pagination + search + sorting
const getAllActiveRentals = async (req, res) => {
    try {
        const role = req.user.role;
        if (role !== 'admin') {
            return res.status(403).json({ error: 'access denied: admin only' });
        }

        // query params
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search ? `%${req.query.search}%` : null;
        const sortBy = req.query.sortBy || 'start_date'; // default sort
        const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC'; // default DESC

        const offset = (page - 1) * limit;

        let baseQuery = `
            FROM locker_rentals lr
            JOIN lockers l ON lr.locker_id = l.locker_id
            JOIN users u ON lr.user_id = u.user_id
            JOIN courses c ON u.course_id = c.course_id
            WHERE lr.status = 'active'
        `;

        if (search) {
            baseQuery += `
                AND (
                    u.stud_id LIKE ? OR
                    u.f_name LIKE ? OR
                    u.l_name LIKE ? OR
                    u.email LIKE ? OR
                    l.locker_number LIKE ?
                )
            `;
        }

        // count total
        const countQuery = `SELECT COUNT(*) as total ${baseQuery}`;
        const [countRows] = await connection.query(
            countQuery,
            search ? [search, search, search, search, search] : []
        );
        const totalRecords = countRows[0].total;
        const totalPages = Math.ceil(totalRecords / limit);

        // sort mapping (only allow due_date or locker_number)
        let sortColumn = 'lr.start_date'; // fallback default
        if (sortBy === 'due_date') {
            sortColumn = 'lr.due_date';
        } else if (sortBy === 'locker_number') {
            sortColumn = "LEFT(l.locker_number, 1), CAST(SUBSTRING(l.locker_number, 2) AS UNSIGNED)";
        }

        // fetch rentals
        const dataQuery = `
            SELECT 
                lr.rental_id,
                lr.locker_id,
                l.locker_number,
                l.location,
                l.status AS locker_status,
                lr.start_date,
                lr.due_date,
                lr.status AS rental_status,
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
            ${baseQuery}
            ORDER BY ${sortColumn} ${sortOrder}
            LIMIT ? OFFSET ?
        `;

        const [rows] = await connection.query(
            dataQuery,
            search
                ? [search, search, search, search, search, limit, offset]
                : [limit, offset]
        );

        res.json({
            page,
            limit,
            totalRecords,
            totalPages,
            records: rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'server error' });
    }
};

// get payment history (admin can view any rental)
const getPaymentHistoryAdmin = async (req, res) => {
    try {
        const role = req.user.role;
        if (role !== 'admin') {
            return res.status(403).json({ error: 'access denied: admin only' });
        }

        const { rentalId } = req.params;

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
            WHERE rental_id = ?
        `;

        const [rows] = await connection.query(query, [rentalId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'payment history not found' });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'server error' });
    }
};

module.exports = {
    // user side
    getLockerStatus,
    cancelReservation,
    getPaymentHistory,

    // admin side
    getAllActiveRentals,
    getPaymentHistoryAdmin
};