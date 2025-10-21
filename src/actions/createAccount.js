const connection = require('../database/connection');
const bcrypt = require('bcrypt');

const createAccount = async (
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
) => {
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
      return { error: 'Invalid course selected' };
    }

    // insert user profile
    const [userResult] = await conn.query(
      'INSERT INTO users (account_id, course_id, stud_id, f_name, m_name, l_name, gender, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [account_id, course_id, stud_id, f_name, m_name, l_name, gender, email]
    );

    await conn.commit();
    conn.release();

    return {
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
    };
  } catch (error) {
    await conn.rollback();
    conn.release();
    console.error('Error creating account:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      let duplicateField = 'a unique field';
      if (error.message.includes('username')) duplicateField = 'username';
      else if (error.message.includes('email')) duplicateField = 'email';
      else if (error.message.includes('stud_id')) duplicateField = 'student ID';

      return { error: `${duplicateField} already exists` };
    }

    return null;
  }
};

module.exports = createAccount;