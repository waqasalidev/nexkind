const Donation = require('../models/Donation');

// @desc    Create a new donation (Public)
// @route   POST /api/donations
// @access  Public
const createDonation = async (req, res) => {
  try {
    const { donorName, email, amount, message, paymentMethod } = req.body;

    const donation = new Donation({
      donorName,
      email,
      amount,
      message,
      paymentMethod,
    });

    const createdDonation = await donation.save();
    res.status(201).json(createdDonation);
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

    if (req.query.page && req.query.limit) {
      const skip = (page - 1) * limit;
      const count = await Donation.countDocuments();
      const donations = await Donation.find({})
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
        const donations = await Donation.find({}).sort({ createdAt: -1 });
        return res.json(donations);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get total donations amount (Admin) -- Optional but good for dashboard
// @route   GET /api/donations/total
// @access  Private/Admin
const getDonationStats = async (req, res) => {
    try {
        const donations = await Donation.find({});
        const totalAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);
        res.json({ totalAmount, count: donations.length });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}


// @desc    Delete a donation
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

module.exports = {
  createDonation,
  getDonations,
  getDonationStats,
  deleteDonation
};
