const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
  donorName: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  message: { type: String },
  paymentMethod: { type: String, default: 'Credit Card' }, // Simulated
  status: { type: String, default: 'Completed' },
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
