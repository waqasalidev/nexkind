const express = require('express');
const router = express.Router();
const {
  createDonation,
  getDonations,
  getDonationStats,
  deleteDonation
} = require('../controllers/donationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(createDonation)
  .get(protect, admin, getDonations);

router.get('/stats', protect, admin, getDonationStats);

router.route('/:id')
  .delete(protect, admin, deleteDonation);

module.exports = router;
