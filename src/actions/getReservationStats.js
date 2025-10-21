const connection = require('../database/connection');
const getDateRange = require('../utils/dateFilter');

// Get reservation statistics
const getReservationStats = async (req, res) => {
  try {
    const { start_date, end_date } = getDateRange(
      req.query.start_date,
      req.query.end_date
    );

    const [rows] = await connection.query(
      `
      SELECT DATE(start_date) AS date,
             COUNT(*) AS total_reservations
      FROM locker_rentals
      WHERE start_date >= ? AND start_date <= ? AND action_type='reserve'
      GROUP BY date
      ORDER BY date
      `,
      [start_date, end_date]
    );

    res.json({ start_date, end_date, data: rows });
  } catch (err) {
    console.error("error fetching reservation trend:", err);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = getReservationStats;