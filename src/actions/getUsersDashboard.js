const connection = require('../database/connection');

//tenant / student dashboard
const getTenantDashboard = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const [row] = await connection.query(`
      SELECT users.*, accounts.username, accounts.role, courses.course_name
      CONCAT('/uploads/profile_pics/', users.user_id, '.jpg') AS profile_pic
      FROM users
      JOIN accounts ON users.account_id = accounts.account_id
      JOIN courses ON users.course_id = courses.course_id
      WHERE users.user_id = ?`, [user_id]);

    if (row.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    // const user = row[0];

    res.status(200).json({ user: row[0] });
  } catch (error) {
    console.error('Error fetching user dashboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//admin dashboard
const getAdminDashboard = async (req, res) => {
  try {
    const [rows] = await connection.query(`
      SELECT users.*, accounts.username, accounts.role,
      CONCAT('/uploads/profile_pics/', users.user_id, '.jpg') AS profile_pic
      FROM users
      JOIN accounts ON users.account_id = accounts.account_id
      WHERE accounts.role = "admin"`);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No admin users found' });
    }

    res.status(200).json({ admins: rows });
  } catch (error) {
    console.error('Error fetching admin dashboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getTenantDashboard, getAdminDashboard };