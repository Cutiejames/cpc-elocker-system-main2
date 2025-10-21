const connection = require("../database/connection");
const bcrypt = require("bcrypt");

// ========== get current user settings ==========
const getUserSettings = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const [rows] = await connection.query(
      `
      SELECT
        u.user_id,
        u.stud_id AS student_id,
        u.f_name AS first_name,
        u.l_name AS last_name,
        u.profile_pic,
        c.course_name AS course,
        a.username,
        a.role
      FROM users u
      JOIN accounts a ON u.account_id = a.account_id
      JOIN courses c ON u.course_id = c.course_id
      WHERE u.user_id = ?
      `,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // build profile pic url if exists
    const user = rows[0];
    if (user.profile_pic) {
      user.profile_pic_url = `${req.protocol}://${req.get('host')}/profile-pic/${user.user_id}`;
    } else {
      user.profile_pic_url = null;
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user settings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ========== update password ==========
// const updatePassword = async (req, res) => {
//   try {
//     const userId = req.user.user_id;
//     const { currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ error: "Both current and new passwords are required" });
//     }

//     // fetch current password hash
//     const [rows] = await connection.query(
//       `
//       SELECT a.password
//       FROM accounts a
//       JOIN users u ON a.account_id = u.account_id
//       WHERE u.user_id = ?
//       `,
//       [userId]
//     );

//     if (rows.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const hashedPassword = rows[0].password;

//     const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
//     if (!isMatch) {
//       return res.status(401).json({ error: "Current password is incorrect" });
//     }

//     const newHashed = await bcrypt.hash(newPassword, 10);

//     await connection.query(
//       `
//       UPDATE accounts a
//       JOIN users u ON a.account_id = u.account_id
//       SET a.password = ?
//       WHERE u.user_id = ?
//       `,
//       [newHashed, userId]
//     );

//     return res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error("Error updating password:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const changePassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    const user_id = req.user.user_id;

    if(!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if(newPassword.length < 6) {
      return res.status(400).json({error: 'New password must be at least 6 characters long!'});
    } 

    try {
        // get the account id by user id
        const [userRows] = await connection.query(`
          SELECT accounts.account_id, accounts.password AS hashedPassword
          FROM users
          JOIN accounts ON users.account_id = accounts.account_id
          WHERE users.user_id = ?`, [user_id]);

        if (userRows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const accounts = userRows[0];

        const isMatch = await bcrypt.compare(oldPassword, accounts.hashedPassword);
        if(!isMatch){
          return res.status(400).json({error: 'Old password is incorrect!'});
        }

        // Update the user's password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await connection.query('UPDATE accounts SET password = ? WHERE account_id = ?', [hashedNewPassword, accounts.account_id]);

        res.status(200).json({ message: 'Password changed successfully' });

    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
  getUserSettings,
  changePassword
};