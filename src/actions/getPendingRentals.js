const connection = require('../database/connection');

const getPendingRentals = async (req, res) => {
  try {
    const { search = '', sort = 'latest', page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    // choose order
    const sortOrder = sort === 'earliest' ? 'ASC' : 'DESC';

    let searchQuery = '';
    let params = [];

    if (search) {
      searchQuery = `AND (
        u.stud_id LIKE ? OR 
        u.f_name LIKE ? OR
        u.m_name LIKE ? OR
        u.l_name LIKE ? OR
        c.course_name LIKE ? OR 
        u.email LIKE ? OR 
        l.locker_number LIKE ?
      )`;
      params = Array(7).fill(`%${search}%`);
    }

    const [rows] = await connection.query(
      `
      SELECT 
        r.rental_id,
        r.status,
        r.action_type,
        r.created_at,
        u.stud_id,
        u.profile_pic,
        u.f_name,
        u.m_name,
        u.l_name,
        c.course_name,
        u.email,
        l.locker_number,
        l.reserved_date,
        l.reserve_expiry,
        l.rented_date,
        l.due_date
      FROM locker_rentals r
      JOIN users u ON r.user_id = u.user_id
      JOIN courses c ON u.course_id = c.course_id
      JOIN lockers l ON r.locker_id = l.locker_id
      WHERE r.status IN ('pending', 'reserved')
      AND (
        r.action_type = 'reserve' 
        OR (r.action_type = 'rent' AND r.payment_method = 'cash')
      )
      ${searchQuery}
      ORDER BY r.created_at ${sortOrder}
      LIMIT ? OFFSET ?
      `,
      [...params, Number(limit), Number(offset)]
    );

    const [[{ total }]] = await connection.query(
      `
      SELECT COUNT(*) as total
      FROM locker_rentals r
      JOIN users u ON r.user_id = u.user_id
      JOIN courses c ON u.course_id = c.course_id
      JOIN lockers l ON r.locker_id = l.locker_id
      WHERE r.status IN ('pending', 'reserved')
      AND (
        r.action_type = 'reserve' 
        OR (r.action_type = 'rent' AND r.payment_method = 'cash')
      )
      ${searchQuery}
      `,
      params
    );

    res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
      records: rows
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getPendingRentals };