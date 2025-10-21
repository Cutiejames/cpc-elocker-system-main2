// const express = require('express');
// const router = express.Router();

// const createAccount = require('../actions/createAccount');
// const loginUser = require('../actions/login');
// // const forgotPassword = require('../users/forgotPassword');
// const changePassword = require('../actions/changePassword');
// const getUserDashboard = require('../actions/getUserDashboard');
// const authenticateToken = require('../middleware/authentication');
// const lockerTransaction = require('../actions/lockerTransaction');

// const upload = require('../middleware/upload');
// const uploadProfilePic = require('../actions/uploadProfilePic');

// router.post('/create-account', async(req, res) => 
//     {
//     const { username, password, stud_id, f_name, m_name, l_name, gender, course, email } = req.body;
//     const result = await createAccount(username, password, stud_id, f_name, m_name, l_name, gender, course, email);

//     if (result) {
//         if(!result.error) {
//             res.status(201).json({ message: 'Account created successfully', user: result });
//         }else {
//             res.status(400).json({error: result.error});
//         }
//     } else {
//         res.status(400).json({ error: 'Account creation failed' });
//     }
// });

// router.post('/login', async(req, res) => {

//     await loginUser(req, res);

//     // if (result) {
//     //     res.status(200).json({ message: 'Login successful', user: result });
//     // } else {
//     //     res.status(401).json({ error: 'Login failed' });
//     // }
// });

// // router.post('/forgot-password', async(req, res) => 
// //     {
// //     await forgotPassword(req, res);
// //     });

// router.post('/change-password', authenticateToken, changePassword);

// // router.get('/dashboard', authenticateToken, getUserDashboard);

// router.post('/transaction', authenticateToken, lockerTransaction);

// router.post('/upload-profile-pic', authenticateToken, upload.single('profile_pic'), uploadProfilePic);

// module.exports = router;