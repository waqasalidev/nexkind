const Donation = require('../models/Donation');

// Initialize Stripe if key is provided
let stripe;
if (process.env.STRIPE_SECRET_KEY) {
  try {
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  } catch (err) {
    console.warn('[DONATION] Stripe SDK initialization warning:', err.message);
  }
}

// @desc    Create Stripe Payment Intent or Session
// @route   POST /api/donations/create-payment-intent
// @access  Public
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd', donorName, email, message } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Valid donation amount is required' });
    }

    const amountInCents = Math.round(amount * 100);
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    if (stripe && process.env.STRIPE_SECRET_KEY) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: currency.toLowerCase(),
        metadata: { donorName, email, message: message || '', transactionId },
        receipt_email: email,
      });

      return res.json({
        clientSecret: paymentIntent.client_secret,
        transactionId,
        paymentProvider: 'Stripe',
        isLiveStripe: true,
      });
    }

    // Fallback payment workflow when STRIPE_SECRET_KEY is not configured yet
    res.json({
      clientSecret: `mock_secret_${transactionId}`,
      transactionId,
      paymentProvider: 'Stripe (Simulated)',
      isLiveStripe: false,
    });
  } catch (error) {
    console.error('[DONATION] Create Payment Intent Error:', error.message);
    res.status(500).json({ message: 'Failed to initialize payment session', error: error.message });
  }
};

// @desc    Create / Confirm a new donation record
// @route   POST /api/donations
// @access  Public
const createDonation = async (req, res) => {
  try {
    const { donorName, email, amount, currency = 'USD', message, paymentProvider = 'Stripe', transactionId, status = 'Completed' } = req.body;

    if (!donorName || !email || !amount) {
      return res.status(400).json({ message: 'Donor name, email, and amount are required' });
    }

    const finalTxnId = transactionId || `txn_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const donation = new Donation({
      donorName,
      email,
      amount: Number(amount),
      currency: currency.toUpperCase(),
      message,
      paymentProvider,
      transactionId: finalTxnId,
      status,
    });

    const createdDonation = await donation.save();
    res.status(201).json({
      success: true,
      message: 'Donation recorded successfully',
      donation: createdDonation,
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid donation data', error: error.message });
  }
};

// @desc    Get all donations (Admin)
// @route   GET /api/donations
// @access  Private/Admin
const getDonations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const statusFilter = req.query.status;

    const filter = {};
    if (statusFilter && statusFilter !== 'all') {
      filter.status = statusFilter;
    }

    const count = await Donation.countDocuments(filter);

    if (req.query.page && req.query.limit) {
      const skip = (page - 1) * limit;
      const donations = await Donation.find(filter)
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });

      return res.json({
        donations,
        page,
        pages: Math.ceil(count / limit),
        total: count
      });
    } else {
      const donations = await Donation.find(filter).sort({ createdAt: -1 });
      return res.json(donations);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get donation statistics (Admin)
// @route   GET /api/donations/stats
// @access  Private/Admin
const getDonationStats = async (req, res) => {
  try {
    const donations = await Donation.find({});
    
    const totalAmount = donations
      .filter(d => d.status === 'Completed')
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);

    const successfulCount = donations.filter(d => d.status === 'Completed').length;
    const pendingCount = donations.filter(d => d.status === 'Pending').length;
    const failedCount = donations.filter(d => d.status === 'Failed').length;

    const recentDonations = donations
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    res.json({
      totalAmount,
      count: donations.length,
      successfulCount,
      pendingCount,
      failedCount,
      recentDonations
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a donation record
// @route   DELETE /api/donations/:id
// @access  Private/Admin
const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (donation) {
      await donation.deleteOne();
      res.json({ message: 'Donation removed' });
    } else {
      res.status(404).json({ message: 'Donation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Process PayPal Donation
// @route   POST /api/donations/paypal
// @access  Public
const createPayPalDonation = async (req, res) => {
  try {
    const { donorName, email, amount, currency = 'USD', message, paypalOrderId } = req.body;

    if (!donorName || !email || !amount) {
      return res.status(400).json({ message: 'Donor name, email, and amount are required' });
    }

    const transactionId = paypalOrderId || `paypal_ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const donation = new Donation({
      donorName,
      email,
      amount: Number(amount),
      currency: currency.toUpperCase(),
      message,
      paymentProvider: 'PayPal',
      transactionId,
      status: 'Completed'
    });

    const saved = await donation.save();
    res.status(201).json({ success: true, message: 'PayPal donation processed', donation: saved });
  } catch (error) {
    res.status(400).json({ message: 'PayPal processing error', error: error.message });
  }
};

// @desc    Process Bank Transfer Donation (Requires Admin Verification)
// @route   POST /api/donations/bank-transfer
// @access  Public
const createBankTransferDonation = async (req, res) => {
  try {
    const { donorName, email, amount, currency = 'USD', message, bankReference } = req.body;

    if (!donorName || !email || !amount || !bankReference) {
      return res.status(400).json({ message: 'Donor name, email, amount, and bank reference number are required' });
    }

    const donation = new Donation({
      donorName,
      email,
      amount: Number(amount),
      currency: currency.toUpperCase(),
      message,
      paymentProvider: 'Bank Transfer',
      bankReference,
      transactionId: `bt_${bankReference.trim()}`,
      status: 'Verification Required'
    });

    const saved = await donation.save();
    res.status(201).json({
      success: true,
      message: 'Bank transfer submitted for admin verification',
      donation: saved
    });
  } catch (error) {
    res.status(400).json({ message: 'Bank transfer submission failed', error: error.message });
  }
};

// @desc    Process Payoneer Manual Donation (Requires Admin Verification)
// @route   POST /api/donations/payoneer
// @access  Public
const createPayoneerDonation = async (req, res) => {
  try {
    const { donorName, email, amount, currency = 'USD', message, payoneerReference } = req.body;

    if (!donorName || !email || !amount || !payoneerReference) {
      return res.status(400).json({ message: 'Donor name, email, amount, and Payoneer transaction ID are required' });
    }

    const donation = new Donation({
      donorName,
      email,
      amount: Number(amount),
      currency: currency.toUpperCase(),
      message,
      paymentProvider: 'Payoneer',
      payoneerReference,
      transactionId: `payoneer_${payoneerReference.trim()}`,
      status: 'Verification Required'
    });

    const saved = await donation.save();
    res.status(201).json({
      success: true,
      message: 'Payoneer reference submitted for verification',
      donation: saved
    });
  } catch (error) {
    res.status(400).json({ message: 'Payoneer reference submission failed', error: error.message });
  }
};

// @desc    Verify / Update Donation Status (Admin)
// @route   PUT /api/donations/:id/verify
// @access  Private/Admin
const verifyDonation = async (req, res) => {
  try {
    const { status, verificationNotes } = req.body;
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    donation.status = status || 'Completed';
    if (verificationNotes) donation.verificationNotes = verificationNotes;
    donation.verifiedBy = req.user ? req.user.email : 'Admin';
    donation.verifiedAt = new Date();

    const updated = await donation.save();
    res.json({ success: true, message: 'Donation status updated', donation: updated });
  } catch (error) {
    res.status(400).json({ message: 'Failed to verify donation', error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
  createDonation,
  createPayPalDonation,
  createBankTransferDonation,
  createPayoneerDonation,
  verifyDonation,
  getDonations,
  getDonationStats,
  deleteDonation
};
