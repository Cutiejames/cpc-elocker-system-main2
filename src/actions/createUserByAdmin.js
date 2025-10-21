const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const { logActivity } = require('./auditlog');

const createUser = async (req, res) => {
  const {
    username,
    password,
    stud_id,
    f_name,
    m_name,
    l_name,
    gender,
    course_id,
    email,
    role = 'student'
  } = req.body;

  const adminId = req.user.user_id;
  const adminName = req.user.username;

  const conn = await connection.getConnection();
  await conn.beginTransaction();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert into accounts
    const [accountResult] = await conn.query(
      'INSERT INTO accounts (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
    );
    const account_id = accountResult.insertId;

    // validate that course_id exists
    const [courseRows] = await conn.query(
      'SELECT course_id FROM courses WHERE course_id = ?',
      [course_id]
    );

    if (courseRows.length === 0) {
      await conn.rollback();
      conn.release();
      return res.status(400).json({ error: 'Invalid course selected' });
    }

    // insert user profile
    const [userResult] = await conn.query(
      'INSERT INTO users (account_id, course_id, stud_id, f_name, m_name, l_name, gender, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [account_id, course_id, stud_id, f_name, m_name, l_name, gender, email]
    );

    await conn.commit();
    conn.release();

    const studentName = `${f_name} ${m_name} ${l_name}`;

    // log activity
    await logActivity(
      adminId,
      adminName,
      `Created new user: ${studentName} (Student ID: ${stud_id})`
    );

    // ✅ send response
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        user_id: userResult.insertId,
        username,
        stud_id,
        f_name,
        m_name,
        l_name,
        gender,
        course_id,
        email,
        role
      }
    });
  } catch (error) {
    await conn.rollback();
    conn.release();
    console.error('Error creating account:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      let duplicateField = 'a unique field';
      if (error.message.includes('username')) duplicateField = 'username';
      else if (error.message.includes('email')) duplicateField = 'email';
      else if (error.message.includes('stud_id')) duplicateField = 'student ID';

      return res.status(400).json({ error: `${duplicateField} already exists` });
    }

    // ✅ send error response
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = createUser;