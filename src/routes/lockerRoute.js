const express = require('express');
const router = express.Router();

const getAllLockers = require('../actions/getAllLockers');
const authenticateToken = require('../middleware/authentication');

// get all lockers with optional status filter
router.get('/lockers', authenticateToken, getAllLockers);

module.exports = router;