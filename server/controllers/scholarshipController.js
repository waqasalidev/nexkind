const Scholarship = require('../models/Scholarship');
const { buildScholarshipQuery } = require('../utils/buildQuery');

// @desc    Create a new scholarship
// @route   POST /api/scholarships
// @access  Private/Admin
const createScholarship = async (req, res) => {
  try {
    const {
      title,
      description,
      provider,
      category,
      amount,
      deadline,
      eligibilityCriteria,
      requiredDocuments,
      providerLink,
      applyLink,
      image,
      country,
      university,
      degreeLevel,
      fundingType,
    } = req.body;

    const scholarship = new Scholarship({
      title,
      description,
      provider,
      category,
      amount,
      deadline,
      eligibilityCriteria,
      requiredDocuments,
      providerLink,
      applyLink,
      image,
      country,
      university,
      degreeLevel,
      fundingType,
    });

    const createdScholarship = await scholarship.save();
    res.status(201).json(createdScholarship);
  } catch (error) {
    res.status(400).json({ message: 'Invalid scholarship data', error: error.message });
  }
};

// @desc    Get all scholarships with pagination
// @route   GET /api/scholarships
// @access  Public
const getScholarships = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filter = buildScholarshipQuery(req.query);

    if (req.query.page && req.query.limit) {
      const skip = (page - 1) * limit;
      const count = await Scholarship.countDocuments(filter);
      const scholarships = await Scholarship.find(filter)
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });

      return res.json({
        scholarships,
        page,
        pages: Math.ceil(count / limit),
        total: count
      });
    } else {
        const scholarships = await Scholarship.find(filter).sort({ createdAt: -1 });
        return res.json(scholarships);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single scholarship
// @route   GET /api/scholarships/:id
// @access  Public
const getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (scholarship) {
      res.json(scholarship);
    } else {
      res.status(404).json({ message: 'Scholarship not found' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Scholarship not found' });
  }
};

// @desc    Update a scholarship
// @route   PUT /api/scholarships/:id
// @access  Private/Admin
const updateScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);

    if (scholarship) {
      scholarship.title = req.body.title || scholarship.title;
      scholarship.description = req.body.description || scholarship.description;
      scholarship.provider = req.body.provider || scholarship.provider;
      scholarship.category = req.body.category || scholarship.category;
      scholarship.amount = req.body.amount || scholarship.amount;
      scholarship.deadline = req.body.deadline || scholarship.deadline;
      scholarship.eligibilityCriteria = req.body.eligibilityCriteria || scholarship.eligibilityCriteria;
      scholarship.requiredDocuments = req.body.requiredDocuments || scholarship.requiredDocuments;
      scholarship.providerLink = req.body.providerLink || scholarship.providerLink;
      scholarship.applyLink = req.body.applyLink || scholarship.applyLink;
      scholarship.image = req.body.image || scholarship.image;
      scholarship.country = req.body.country || scholarship.country;
      scholarship.university = req.body.university || scholarship.university;
      scholarship.degreeLevel = req.body.degreeLevel || scholarship.degreeLevel;
      scholarship.fundingType = req.body.fundingType || scholarship.fundingType;

      const updatedScholarship = await scholarship.save();
      res.json(updatedScholarship);
    } else {
      res.status(404).json({ message: 'Scholarship not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid scholarship data', error: error.message });
  }
};

// @desc    Delete a scholarship
// @route   DELETE /api/scholarships/:id
// @access  Private/Admin
const deleteScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);

    if (scholarship) {
      await scholarship.deleteOne();
      res.json({ message: 'Scholarship removed' });
    } else {
      res.status(404).json({ message: 'Scholarship not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createScholarship,
  getScholarships,
  getScholarshipById,
  updateScholarship,
  deleteScholarship
};
