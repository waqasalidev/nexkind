const express = require('express');
const router = express.Router();
const {
  createPaymentIntent,
  createDonation,
  createPayPalDonation,
  createBankTransferDonation,
  createPayoneerDonation,
  verifyDonation,
  getDonations,
  getDonationStats,
  deleteDonation
} = require('../controllers/donationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/create-payment-intent', createPaymentIntent);
router.post('/paypal', createPayPalDonation);
router.post('/bank-transfer', createBankTransferDonation);
router.post('/payoneer', createPayoneerDonation);

router.route('/')
  .post(createDonation)
  .get(protect, admin, getDonations);

router.get('/stats', protect, admin, getDonationStats);
router.put('/:id/verify', protect, admin, verifyDonation);

router.route('/:id')
  .delete(protect, admin, deleteDonation);

module.exports = router;
