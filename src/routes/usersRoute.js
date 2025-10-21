const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
// const fileType = require('file-type');
// const connection = require('../database/connection');
// const userProfile = require('../actions/userProfile');

// =================== middleware ===================
const authenticateToken = require('../middleware/authentication');

// =================== notification actions ===================
const { getNotifications, markAsRead, markAllAsRead } = require('../actions/notification');

// =================== shared actions ===================
const rentStatus = require('../actions/rentStatusV2');
const lockerCtrl = require('../actions/lockerTransactionV2');
const { getTenantDashboard, getAdminDashboard } = require('../actions/getUsersDashboard');
const {
  createTicket,
  listTickets,
  getTicketMessages,
  replyTicket,
  markAsAnswered,
  getUserTickets
} = require('../actions/ticket');
const { getUserSettings, changePassword } = require("../actions/settings");

// =================== admin ===================
const createUser = require('../actions/createUserByAdmin');
const forgotPassword = require('../actions/forgotPassword');
// const getAdminDashboard = require('../actions/getAdminDashboard');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const addLocker = require('../actions/addLocker');
const { approveRental, cancelRental } = require('../actions/approveRentalV2');
const { getPendingRentals } = require('../actions/getPendingRentals');
const getTenantStats = require('../actions/getTenantStats');
const getRentByCourse = require('../actions/getRentByCourse');
const getIncomeStats = require('../actions/getIncomeStats');
const getReservationStats = require('../actions/getReservationStats');
const getDashboardSummary  = require('../actions/getDashboardSummary');
const downloadDashboardReport = require('../actions/downloadDashboardReport');
const { getAllCourses, addCourse, getStudentsByCourse } = require('../actions/getAllUsers');
const { disableUserAccount, enableUserAccount } = require('../actions/userAccountStatus');
const { getAuditLogs } = require('../actions/auditlog');

// =================== tenant ===================
const createAccount = require('../actions/createAccount');
const loginUser = require('../actions/login');
// const getTenantDashboard = require('../actions/getUsersDashboard');
// const changePassword = require('../actions/changePassword');

// =================== upload profile pic ===================
const uploads = require('../middleware/upload');
const uploadProfilePic = require('../actions/upload');
const authentication = require('../middleware/authentication');

// =================== shared route ===================
router.post('/login', async(req, res) => {
    await loginUser(req, res);
});
router.post('/locker/transaction', authenticateToken, lockerCtrl.lockerTransaction);
router.post('/locker/payments', authenticateToken, uploads.single('receipt'), lockerCtrl.recordPayment);
router.post('/locker/payments/:payment_id/verify', authenticateToken, authorizeAdmin, lockerCtrl.verifyPayment);
router.get('/locker/rentals/:rental_id/payments', authenticateToken, lockerCtrl.getPaymentsForRental);
router.get('/tickets/:ticket_id/messages', authenticateToken, getTicketMessages);
router.post('/tickets/:ticket_id/reply', authenticateToken, replyTicket);
router.get("/settings", authentication, getUserSettings);
router.post("/settings/update-password", authentication, changePassword);

// =================== admin routes ===================
router.post('/create-user', authenticateToken, authorizeAdmin, createUser);
router.post('/reset-password', authenticateToken, authorizeAdmin, forgotPassword);
router.get('/dashboard', authenticateToken, authorizeAdmin, getAdminDashboard);
router.post('/add-locker', authenticateToken, authorizeAdmin, addLocker);
router.post('/approve-rental', authenticateToken, authorizeAdmin, approveRental);
router.post('/cancel-rental', authenticateToken, authorizeAdmin, cancelRental);
router.get('/pending-rentals', authenticateToken, authorizeAdmin, getPendingRentals);
router.get('/tickets', authenticateToken, authorizeAdmin, listTickets);
router.patch('/tickets/:ticket_id/answered', authenticateToken, authorizeAdmin, markAsAnswered);
router.get('/dashboard/tenants', authenticateToken, authorizeAdmin, getTenantStats);
router.get('/dashboard/rent-by-course', authenticateToken, authorizeAdmin, getRentByCourse);
router.get('/dashboard/income', authenticateToken, authorizeAdmin, getIncomeStats);
router.get('/dashboard/reservations', authenticateToken, authorizeAdmin, getReservationStats);
router.get('/dashboard/summary', authenticateToken, authorizeAdmin, getDashboardSummary);
router.get('/dashboard/report/pdf', authenticateToken, authorizeAdmin, downloadDashboardReport);
router.get('/active-rentals', authenticateToken, authorizeAdmin, rentStatus.getAllActiveRentals);
router.get('/payment-history-ad/:rentalId', authenticateToken, authorizeAdmin, rentStatus.getPaymentHistoryAdmin);
router.get('/courses', authenticateToken, authorizeAdmin, getAllCourses);
router.post('/courses', authenticateToken, authorizeAdmin, upload.single('logo'), addCourse);
router.get('/courses/:course_id/students', authenticateToken, authorizeAdmin, getStudentsByCourse);
router.put('/users/:user_id/disable', authenticateToken, authorizeAdmin, disableUserAccount);
router.put('/users/:user_id/enable', authenticateToken, authorizeAdmin, enableUserAccount);
router.get('/audit-logs', authenticateToken, authorizeAdmin, getAuditLogs);



// =================== tenant routes ===================
router.post('/create-account', async(req, res) => 
    {
    const { username, password, stud_id, f_name, m_name, l_name, gender, course, email } = req.body;
    const result = await createAccount(username, password, stud_id, f_name, m_name, l_name, gender, course, email);

    if (result) {
        if(!result.error) {
            res.status(201).json({ message: 'Account created successfully', user: result });
        }else {
            res.status(400).json({error: result.error});
        }
    } else {
        res.status(400).json({ error: 'Account creation failed' });
    }
});
router.get('/dashboard', authenticateToken, getTenantDashboard);
router.get('/rent-status', authenticateToken, rentStatus.getLockerStatus);
router.post('/cancel-reservation', authenticateToken, rentStatus.cancelReservation);
router.get('/payment-history/:rentalId', authenticateToken, rentStatus.getPaymentHistory);
router.post('/create-tickets', authenticateToken, createTicket);
router.get('/my-tickets', authenticateToken, getUserTickets);

// =================== notifcation routes ===================
router.get('/notifications', authenticateToken, getNotifications);
router.put('/notifications/:notif_id/read', authenticateToken, markAsRead);
router.put('/notifications/read-all', authenticateToken, markAllAsRead);

// =================== upload profile picture routes ===================
router.post(
  '/upload-profile-pic',
  authenticateToken,
  upload.single('profile_pic'),
  uploadProfilePic
);

// ✅ get profile picture (display from db)
// GET profile picture by user_id
// router.get('/profile-pic/:user_id', (req, res) => {
//   const userId = req.params.user_id;
//   const query = 'SELECT profile_pic FROM users WHERE user_id = ?';

//   connection.query(query, [userId], (err, results) => {
//     if (err) {
//       console.error('Error fetching profile picture:', err);
//       return res.status(500).json({ error: 'Database error' });
//     }

//     if (!results.length || !results[0].profile_pic) {
//       return res.status(404).json({ error: 'Profile picture not found' });
//     }

//     const img = results[0].profile_pic;
//     res.writeHead(200, { 'Content-Type': 'image/jpeg' });
//     res.end(img, 'binary');
//   });
// });

// const bcrypt = require('bcrypt');
// bcrypt.hash('admin123', 10).then(console.log);

module.exports = router;