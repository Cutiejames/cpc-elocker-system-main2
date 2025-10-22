const connection = require('../database/connection');
const { logActivity } = require('./auditlog');

// ========== get all course ==========
const getAllCourses = async (req, res) => {
    try {
        const [rows] = await connection.query(`
            SELECT course_id, course_name, acronym, logo
            FROM courses
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ========== add new course ==========
const addCourse = async (req, res) => {
  const { course_name, acronym } = req.body;
  const logo = req.file ? req.file.filename : null;

  const adminId = req.user.user_id;
  const adminName = req.user.username;

  try {
    const [result] = await connection.query(
      `INSERT INTO courses (course_name, acronym, logo)
       VALUES (?, ?, ?)`,
      [course_name, acronym, logo]
    );

    // log activity
    await logActivity(
      adminId,
      adminName,
      `Added new course: ${course_name} (${acronym})`
    );

    return res
      .status(201)
      .json({ message: 'Course added', course_id: result.insertId });
  } catch (error) {
    console.error('Error adding course:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      return res
        .status(400)
        .json({ error: 'Course name or acronym already exists' });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
};

// ========== get all students in a course ==========
const getStudentsByCourse = async (req, res) => {
  const { course_id } = req.query;

  if (!course_id) return res.status(400).json({ error: "Course ID is required" });

  try {
    const [rows] = await connection.query(
      `SELECT u.*, a.username, a.role, a.status
       FROM users u
       JOIN accounts a ON u.account_id = a.account_id
       WHERE u.course_id = ?`,
      [course_id]
    );

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllCourses, addCourse, getStudentsByCourse };