const connection = require('../database/connection');
const { logActivity } = require('./auditlog');

// ========== disable user account ==========
const disableUserAccount = async (req, res) => {
  try {
    const { user_id } = req.params;
    const adminId = req.user.user_id;
    const adminName = req.user.username;

    // check current status + fetch student + account status
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

    // update status
    await connection.query(
      `UPDATE accounts 
       SET status = 'disabled' 
       WHERE account_id = ?`,
      [account_id]
    );

    await logActivity(
        adminId,
        adminName,
        `Disabled account of student: ${studentName} (Student ID: ${stud_id})`
    );
    // await logActivity(adminId, adminName, `Disabled user account (user_id: ${user_id})`);
    res.json({ message: 'Account disabled successfully' });

  } catch (error) {
    console.error('Error disabling account:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ========== enable user account ==========
const enableUserAccount = async (req, res) => {
  try {
    const { user_id } = req.params;
    const adminId = req.user.user_id;
    const adminName = req.user.username;

    // check current status + fetch student + account status
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

    // update status
    await connection.query(
      `UPDATE accounts 
       SET status = 'active' 
       WHERE account_id = ?`,
      [account_id]
    );

    await logActivity(
      adminId,
      adminName,
      `Enabled account of student: ${studentName} (Student ID: ${stud_id})`
    );

    // await logActivity(adminId, adminName, `Enabled user account (user_id: ${user_id})`);
    res.json({ message: 'Account enabled successfully' });

  } catch (error) {
    console.error('Error enabling account:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { disableUserAccount, enableUserAccount };