// const express = require('express');
// const router = express.Router();

// const createUser = require('../actions/createUserByAdmin');
// const getUserByStudId = require('../actions/getUserByStudId');
// const forgotPassword = require('../actions/forgotPassword');
// const getAdminDashboard = require('../actions/getAdminDashboard');
// const authenticateToken = require('../middleware/authentication');
// const authorizeAdmin = require('../middleware/authorizeAdmin');
// const addLocker = require('../actions/addLocker');
// const approveRental = require('../actions/approveRental');

// router.post('/create-user', authenticateToken, authorizeAdmin, async (req, res) => {
//     const {username, password, stud_id, f_name, m_name, l_name, gender, course, email, role} = req.body;

//     if(!['student', 'admin'].includes(role)) {
//         return res.status(400).json({error: 'Invalid role. Must be "student" or "admin".'});
//     }

//     const result = await createUser(username, password, stud_id, f_name, m_name, l_name, gender, course, email, role);

//     if(result && !result.error) {
//         res.status(201).json({message: 'Account created successfully', user: result});  
//     }else {
//         res.status(400).json({error: result?.error || 'Account creation failed'});
//     }
// });

// router.get('/user/:stud_id', authenticateToken, authorizeAdmin, getUserByStudId);

// router.post('/reset-password', authenticateToken, authorizeAdmin, forgotPassword);

// // router.get('/dashboard', authenticateToken, authorizeAdmin, async (req, res) => {
// //     await getAdminDashboard(req, res);
// // })

// router.post('/add-locker', authenticateToken, authorizeAdmin, addLocker);

// router.post('/approve-rental', authenticateToken, authorizeAdmin, approveRental);

// // const bcrypt = require('bcrypt');
// // bcrypt.hash('admin123', 10).then(console.log);

// module.exports = router;