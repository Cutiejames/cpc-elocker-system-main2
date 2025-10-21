// const connection = require('../database/connection');

// const getAdminDashboard = async (req, res) => {
//   try {
//     const [rows] = await connection.query(`
//       SELECT users.*, accounts.username, accounts.role,
//       CONCAT('/uploads/profile_pics/', users.user_id, '.jpg') AS profile_pic
//       FROM users
//       JOIN accounts ON users.account_id = accounts.account_id
//       WHERE accounts.role = "admin"`);

//     if (rows.length === 0) {
//       return res.status(404).json({ error: 'No admin users found' });
//     }

//     res.status(200).json({ admins: rows });
//   } catch (error) {
//     console.error('Error fetching admin dashboard:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = getAdminDashboard;