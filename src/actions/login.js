const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../database/connection');

const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await connection.query(`
      SELECT users.*, accounts.role, accounts.username, accounts.password AS hashedPassword, accounts.status, courses.course_name FROM users
      JOIN accounts ON users.account_id = accounts.account_id
      JOIN courses ON users.course_id = courses.course_id
      WHERE accounts.username = ?`,
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
      const user = rows[0];

      // 🚨 check if account is disabled
      if (user.status === 'disable') {
        return res.status(403).json({ error: 'Your account has been disabled. Please go to admin workplace.' });
      }
      
      const isMatch = await bcrypt.compare(password, user.hashedPassword);

      if(!isMatch){
        return res.status(401).json({error: 'Invalid username or password'})
      }

      //jwt token gereration
      const token = jwt.sign(
        {
        user_id: user.user_id,
        username : user.username,
        role: user.role
        },
        jwtSecret,
        {
          expiresIn: '1h'
        }
      );
      
      //delete hashed password before sending
      delete user.hashedPassword;

      let redirectUrl = '';
      if(user.role === 'admin') {
        redirectUrl = '/admin/dashboard/summary';
      }else {
        redirectUrl = '/locker/getAllLockers';
      }

      return res.status(200).json({message: 'Login successfully', user, role: user.role, redirect: redirectUrl, token});

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = loginUser;
