const express = require('express');
const router = express.Router();
const { getDashboardStats, syncDatabaseCounts, getDashboardSummary } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', getDashboardStats);
router.get('/summary', protect, getDashboardSummary);
router.post('/sync', syncDatabaseCounts);

module.exports = router;
