const connection = require('../database/connection');
const getDateRange = require('../utils/dateFilter');

// Get income statistics
const getIncomeStats = async (req, res) => {
  try {
    const { start_date, end_date } = getDateRange(
      req.query.start_date,
      req.query.end_date
    );

    const [rows] = await connection.query(
      `
      SELECT DATE(start_date) AS date,
             SUM(paid_amount) AS daily_income
      FROM locker_rentals
      WHERE start_date >= ? AND start_date <= ?
      GROUP BY date
      ORDER BY date
      `,
      [start_date, end_date]
    );

    res.json({ start_date, end_date, data: rows });
  } catch (err) {
    console.error("error fetching income stats:", err);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = getIncomeStats;