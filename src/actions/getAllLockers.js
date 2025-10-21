const connection = require('../database/connection');

const getAllLockers = async (req, res) => {
  try {
    const { status, page = 1, limit = 24 } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    let query = 'SELECT * FROM lockers';
    let countQuery = 'SELECT COUNT(*) AS total FROM lockers';
    const params = [];
    const countParams = [];

    if (status) {
      query += ' WHERE status = ?';
      countQuery += ' WHERE status = ?';
      params.push(status);
      countParams.push(status);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    // get lockers
    const [rows] = await connection.query(query, params);

    // get total count
    const [[{ total }]] = await connection.query(countQuery, countParams);

    res.json({
      data: rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('error fetching lockers:', error);
    res.status(500).json({ error: 'server error' });
  }
};

module.exports = getAllLockers;