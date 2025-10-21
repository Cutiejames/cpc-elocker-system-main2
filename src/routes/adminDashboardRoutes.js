const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authentication');
const authorizeAdmin = require('../middleware/authorizeAdmin');

// controllers

const getDashboardSummary = require('../actions/getDashboardSummary');
const getIncomeStats = require('../actions/getIncomeStats');
const getTenantStats = require('../actions/getTenantStats');
const getReservationStats = require('../actions/getReservationStats');
const getRentByCourse = require('../actions/getRentByCourse');

// all dashboard endpoints
router.get('/summary', authenticateToken, authorizeAdmin, getDashboardSummary);
router.get('/income-stats', authenticateToken, authorizeAdmin, getIncomeStats);
router.get('/tenant-stats', authenticateToken, authorizeAdmin, getTenantStats);
router.get('/reservation-stats', authenticateToken, authorizeAdmin, getReservationStats);
router.get('/rent-by-course', authenticateToken, authorizeAdmin, getRentByCourse);

module.exports = router;