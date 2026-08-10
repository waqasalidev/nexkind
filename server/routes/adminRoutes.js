const express = require('express');
const router = express.Router();
const {
  getAdminAnalytics,
  triggerDataSync,
  getDataSyncStatus,
  verifyScholarship
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/analytics', protect, admin, getAdminAnalytics);
router.post('/sync', protect, admin, triggerDataSync);
router.get('/sync/status', protect, admin, getDataSyncStatus);
router.put('/scholarships/:id/verify', protect, admin, verifyScholarship);

module.exports = router;
