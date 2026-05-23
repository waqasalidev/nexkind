const express = require('express');
const router = express.Router();
const { getDashboardStats, syncDatabaseCounts } = require('../controllers/dashboardController');

router.get('/stats', getDashboardStats);
router.post('/sync', syncDatabaseCounts);

module.exports = router;
