const connection = require('../database/connection');
const getDateRange = require('../utils/dateFilter');

// Get tenant statistics
const getTenantStats = async (req, res) => {
  try {
    const { start_date, end_date } = getDateRange(
      req.query.start_date,
      req.query.end_date
    );

    const [rows] = await connection.query(
      `
      SELECT DATE_FORMAT(start_date, '%Y-%m') AS month,
             SUM(CASE WHEN action_type='rent' THEN 1 ELSE 0 END) AS rent_count,
             SUM(CASE WHEN action_type='reserve' THEN 1 ELSE 0 END) AS reserve_count
      FROM locker_rentals
      WHERE start_date >= ? AND start_date <= ?
      GROUP BY month
      ORDER BY month
      `,
      [start_date, end_date]
    );

    res.json({ start_date, end_date, data: rows });
  } catch (err) {
    console.error("error fetching monthly rent/reserve:", err);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = getTenantStats;