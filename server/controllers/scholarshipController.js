const Scholarship = require('../models/Scholarship');
const { buildScholarshipQuery } = require('../utils/buildQuery');
const scholarshipsData = require('../utils/scholarshipsData');

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
      applyUrl,
      image,
      country,
      university,
      degreeLevel,
      fundingType,
      benefits,
      applicationInstructions,
      ageRequirements,
      academicRequirements,
      languageRequirements,
      eligibleCountries,
      financialCoverage,
      source,
      sourceName,
      sourceUrl,
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
      benefits: benefits || [],
      applicationInstructions: applicationInstructions || [],
      ageRequirements,
      academicRequirements,
      languageRequirements,
      eligibleCountries: eligibleCountries || [],
      financialCoverage,
      providerLink,
      applyLink: applyUrl || applyLink,
      applyUrl: applyUrl || applyLink,
      image,
      country,
      university,
      degreeLevel,
      fundingType,
      source: source || 'NexKind NGO Verified',
      sourceName: sourceName || source || provider || 'Official Scholarship Portal',
      sourceUrl: sourceUrl || providerLink,
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

    let scholarships = [];
    let count = 0;

    try {
      count = await Scholarship.countDocuments(filter);
      if (req.query.page && req.query.limit) {
        const skip = (page - 1) * limit;
        scholarships = await Scholarship.find(filter)
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: -1 });
      } else {
        scholarships = await Scholarship.find(filter).sort({ createdAt: -1 });
      }
    } catch (dbErr) {
      console.warn('[SCHOLARSHIPS] DB fetch warning:', dbErr.message);
      scholarships = [];
    }

    // Fallback if 0 results
    if (scholarships.length === 0) {
      let list = [...scholarshipsData];
      if (req.query.country) {
        list = list.filter(
          (s) => s.country && s.country.toLowerCase().includes(req.query.country.toLowerCase())
        );
      }
      if (req.query.degreeLevel) {
        list = list.filter(
          (s) => s.degreeLevel && s.degreeLevel.toLowerCase() === req.query.degreeLevel.toLowerCase()
        );
      }
      if (req.query.fundingType) {
        list = list.filter(
          (s) => s.fundingType && s.fundingType.toLowerCase() === req.query.fundingType.toLowerCase()
        );
      }
      if (req.query.search) {
        const q = req.query.search.toLowerCase();
        list = list.filter(
          (s) =>
            (s.title && s.title.toLowerCase().includes(q)) ||
            (s.description && s.description.toLowerCase().includes(q)) ||
            (s.provider && s.provider.toLowerCase().includes(q)) ||
            (s.university && s.university.toLowerCase().includes(q)) ||
            (s.country && s.country.toLowerCase().includes(q))
        );
      }

      if (req.query.page && req.query.limit) {
        const skip = (page - 1) * limit;
        return res.json({
          scholarships: list.slice(skip, skip + limit),
          page,
          pages: Math.ceil(list.length / limit) || 1,
          total: list.length,
        });
      } else {
        return res.json(list);
      }
    }

    if (req.query.page && req.query.limit) {
      return res.json({
        scholarships,
        page,
        pages: Math.ceil(count / limit) || 1,
        total: count,
      });
    } else {
      return res.json(scholarships);
    }
  } catch (error) {
    console.error('[SCHOLARSHIPS] getScholarships error:', error.message);
    return res.json(scholarshipsData);
  }
};

// @desc    Get single scholarship
// @route   GET /api/scholarships/:id
// @access  Public
const getScholarshipById = async (req, res) => {
  try {
    let scholarship = null;
    try {
      scholarship = await Scholarship.findById(req.params.id);
    } catch {
      scholarship = null;
    }

    if (!scholarship) {
      scholarship = scholarshipsData.find(
        (s) => String(s._id) === String(req.params.id) || String(s.id) === String(req.params.id)
      );
    }

    if (scholarship) {
      return res.json(scholarship);
    } else {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
  } catch (error) {
    return res.status(404).json({ message: 'Scholarship not found' });
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
      scholarship.applyLink = req.body.applyUrl || req.body.applyLink || scholarship.applyLink;
      scholarship.applyUrl = req.body.applyUrl || req.body.applyLink || scholarship.applyUrl || scholarship.applyLink;
      scholarship.image = req.body.image || scholarship.image;
      scholarship.country = req.body.country || scholarship.country;
      scholarship.university = req.body.university || scholarship.university;
      scholarship.degreeLevel = req.body.degreeLevel || scholarship.degreeLevel;
      scholarship.fundingType = req.body.fundingType || scholarship.fundingType;
      scholarship.benefits = req.body.benefits || scholarship.benefits;
      scholarship.applicationInstructions = req.body.applicationInstructions || scholarship.applicationInstructions;
      scholarship.ageRequirements = req.body.ageRequirements || scholarship.ageRequirements;
      scholarship.academicRequirements = req.body.academicRequirements || scholarship.academicRequirements;
      scholarship.languageRequirements = req.body.languageRequirements || scholarship.languageRequirements;
      scholarship.eligibleCountries = req.body.eligibleCountries || scholarship.eligibleCountries;
      scholarship.financialCoverage = req.body.financialCoverage || scholarship.financialCoverage;
      scholarship.source = req.body.source || scholarship.source;
      scholarship.sourceName = req.body.sourceName || scholarship.sourceName;
      scholarship.sourceUrl = req.body.sourceUrl || scholarship.sourceUrl;

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
