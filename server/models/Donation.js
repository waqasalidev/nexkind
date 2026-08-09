const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
  donorName: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  message: { type: String },
  paymentProvider: { type: String, default: 'Stripe' },
  transactionId: { type: String },
  status: {
    type: String,
    enum: ['Completed', 'Pending', 'Failed'],
    default: 'Completed',
  },
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
