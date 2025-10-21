const connection = require('../database/connection');
const getDateRange = require('../utils/dateFilter');

// Get rental statistics by course
const getRentByCourse = async (req, res) => {
  try {
    const { start_date, end_date } = getDateRange(
      req.query.start_date,
      req.query.end_date
    );

    const [rows] = await connection.query(
      `
      SELECT c.course_name,
             SUM(CASE WHEN lr.action_type='rent' THEN 1 ELSE 0 END) AS total_rent,
             SUM(CASE WHEN lr.action_type='reserve' THEN 1 ELSE 0 END) AS total_reserve
      FROM locker_rentals lr
      JOIN users u ON lr.user_id = u.user_id
      JOIN courses c ON u.course_id = c.course_id
      WHERE lr.start_date >= ? AND lr.start_date <= ?
      GROUP BY c.course_name
      `,
      [start_date, end_date]
    );

    res.json({ start_date, end_date, data: rows });
  } catch (err) {
    console.error("error fetching course distribution:", err);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = getRentByCourse;