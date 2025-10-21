const connection = require('../database/connection');
const getDateRange = require('../utils/dateFilter');
const dayjs = require('dayjs');

// dashboard summary
const getDashboardSummary = async (req, res) => {
  try {
    // current filter (default: current month)
    const { start_date, end_date } = getDateRange(
      req.query.start_date,
      req.query.end_date
    );

    // previous month range
    const prevStart = dayjs(start_date)
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
    const prevEnd = dayjs(start_date)
      .subtract(1, "month")
      .endOf("month")
      .format("YYYY-MM-DD");

    // current month query
    const [[current]] = await connection.query(
      `
      SELECT 
        (SELECT COALESCE(SUM(paid_amount),0) 
         FROM locker_rentals 
         WHERE start_date >= ? AND start_date <= ?) AS total_income,
        (SELECT COUNT(DISTINCT user_id) 
         FROM locker_rentals 
         WHERE start_date >= ? AND start_date <= ?) AS total_tenants,
        (SELECT COUNT(*) 
         FROM locker_rentals 
         WHERE action_type='rent' AND start_date >= ? AND start_date <= ?) AS total_rent,
        (SELECT COUNT(*) 
         FROM locker_rentals 
         WHERE action_type='reserve' AND start_date >= ? AND start_date <= ?) AS total_reserve,
        (SELECT COUNT(*) FROM lockers) - 
        (SELECT COUNT(*) FROM locker_rentals WHERE status='active') AS locker_availability
      `,
      [
        start_date, end_date,
        start_date, end_date,
        start_date, end_date,
        start_date, end_date
      ]
    );

    // previous month query
    const [[previous]] = await connection.query(
      `
      SELECT 
        (SELECT COALESCE(SUM(paid_amount),0) 
         FROM locker_rentals 
         WHERE start_date >= ? AND start_date <= ?) AS total_income,
        (SELECT COUNT(DISTINCT user_id) 
         FROM locker_rentals 
         WHERE start_date >= ? AND start_date <= ?) AS total_tenants,
        (SELECT COUNT(*) 
         FROM locker_rentals 
         WHERE action_type='rent' AND start_date >= ? AND start_date <= ?) AS total_rent,
        (SELECT COUNT(*) 
         FROM locker_rentals 
         WHERE action_type='reserve' AND start_date >= ? AND start_date <= ?) AS total_reserve
      `,
      [
        prevStart, prevEnd,
        prevStart, prevEnd,
        prevStart, prevEnd,
        prevStart, prevEnd
      ]
    );

    // helper → trend + percentage
    const getStats = (currentValue, prevValue) => {
      let trend = "neutral";
      let percent_change = 0;

      if (prevValue === 0 && currentValue > 0) {
        trend = "up";
        percent_change = 100;
      } else if (prevValue === 0 && currentValue === 0) {
        trend = "neutral";
        percent_change = 0;
      } else {
        const diff = ((currentValue - prevValue) / prevValue) * 100;
        percent_change = Math.round(diff * 100) / 100; // round to 2 decimals
        trend = currentValue > prevValue ? "up" : currentValue < prevValue ? "down" : "neutral";
      }

      return { value: currentValue, trend, percent_change };
    };

    res.json({
      start_date,
      end_date,
      summary: {
        total_income: getStats(current.total_income, previous.total_income),
        total_tenants: getStats(current.total_tenants, previous.total_tenants),
        total_rent: getStats(current.total_rent, previous.total_rent),
        total_reserve: getStats(current.total_reserve, previous.total_reserve),
        locker_availability: { value: current.locker_availability, trend: "neutral", percent_change: 0 }
      }
    });
  } catch (err) {
    console.error("error fetching dashboard summary:", err);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = getDashboardSummary;