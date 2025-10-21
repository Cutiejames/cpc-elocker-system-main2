const connection = require('../database/connection');
const bcrypt = require('bcrypt');

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

module.exports = changePassword;