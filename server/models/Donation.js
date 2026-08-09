const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
  donorName: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  message: { type: String },
  paymentProvider: {
    type: String,
    enum: ['Stripe', 'PayPal', 'Google Pay', 'Bank Transfer', 'Payoneer'],
    default: 'Stripe'
  },
  transactionId: { type: String },
  bankReference: { type: String },
  payoneerReference: { type: String },
  receiptUrl: { type: String },
  verificationNotes: { type: String },
  verifiedBy: { type: String },
  verifiedAt: { type: Date },
  status: {
    type: String,
    enum: ['Completed', 'Pending', 'Processing', 'Failed', 'Cancelled', 'Verification Required'],
    default: 'Completed',
  },
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
