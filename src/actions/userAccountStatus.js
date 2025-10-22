const connection = require('../database/connection');
const { logActivity } = require('./auditlog');
const bcrypt = require('bcrypt');

// ========== Disable user account ==========
const disableUserAccount = async (req, res) => {
  try {
    const { user_id } = req.params;
    const adminId = req.user.user_id;
    const adminName = req.user.username;

    const [rows] = await connection.query(
      `SELECT users.stud_id, users.f_name, users.m_name, users.l_name, accounts.status, accounts.account_id 
       FROM accounts 
       JOIN users ON accounts.account_id = users.account_id 
       WHERE users.user_id = ?`,
      [user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (rows[0].status === 'disabled') {
      return res.status(400).json({ error: 'Account is already disabled' });
    }

    const { stud_id, f_name, m_name, l_name, account_id } = rows[0];
    const studentName = `${f_name} ${m_name} ${l_name}`;

    await connection.query(
      `UPDATE accounts SET status = 'disabled' WHERE account_id = ?`,
      [account_id]
    );

    await logActivity(
      adminId,
      adminName,
      `Disabled account of student: ${studentName} (Student ID: ${stud_id})`
    );

    res.json({ message: 'Account disabled successfully' });
  } catch (error) {
    console.error('Error disabling account:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ========== Enable user account ==========
const enableUserAccount = async (req, res) => {
  try {
    const { user_id } = req.params;
    const adminId = req.user.user_id;
    const adminName = req.user.username;

    const [rows] = await connection.query(
      `SELECT users.stud_id, users.f_name, users.m_name, users.l_name, accounts.status, accounts.account_id 
       FROM accounts 
       JOIN users ON accounts.account_id = users.account_id 
       WHERE users.user_id = ?`,
      [user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (rows[0].status === 'active') {
      return res.status(400).json({ error: 'Account is already active' });
    }

    const { stud_id, f_name, m_name, l_name, account_id } = rows[0];
    const studentName = `${f_name} ${m_name} ${l_name}`;

    await connection.query(
      `UPDATE accounts SET status = 'active' WHERE account_id = ?`,
      [account_id]
    );

    await logActivity(
      adminId,
      adminName,
      `Enabled account of student: ${studentName} (Student ID: ${stud_id})`
    );

    res.json({ message: 'Account enabled successfully' });
  } catch (error) {
    console.error('Error enabling account:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ========== Reset user password ==========

const resetUserPassword = async (req, res) => {
  // Ensure req.user exists (from authentication middleware)
  const adminId = req.user?.user_id;
  const adminName = req.user?.username;

  if (!adminId || !adminName) {
    return res.status(401).json({ error: "Unauthorized: Admin not logged in" });
  }

  const { user_id, new_password } = req.body;

  // Validation
  if (!user_id || !new_password) {
    return res.status(400).json({ error: "Student ID and new password are required!" });
  }
  if (new_password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long" });
  }

  try {
    // Fetch account info
    const [rows] = await connection.query(
      `SELECT accounts.account_id, users.f_name, users.m_name, users.l_name
       FROM users
       JOIN accounts ON users.account_id = accounts.account_id
       WHERE users.user_id = ?`,
      [user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const { account_id, f_name, m_name, l_name } = rows[0];

    // Hash the new password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update password in database
    await connection.query(
      `UPDATE accounts SET password = ? WHERE account_id = ?`,
      [hashedPassword, account_id]
    );

    // Log the admin action
    await logActivity(
      adminId,
      adminName,
      `Reset password for student: ${f_name} ${m_name} ${l_name} (user_id: ${user_id})`
    );

    res.json({ message: "Password reset successfully!" });

  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { disableUserAccount, enableUserAccount, resetUserPassword };
