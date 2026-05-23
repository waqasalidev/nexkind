const Job = require('../models/Job');
const { buildJobQuery } = require('../utils/buildQuery');
const { getCompanyLogoUrl, getCompanyLogoCandidates } = require('../utils/companyLogo');

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private/Admin
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      type,
      salary,
      experience,
      responsibilities,
      requirements,
      benefits,
      companyLink,
      applyLink,
      image,
      category,
      workMode,
    } = req.body;

    const job = new Job({
      title,
      description,
      company,
      location,
      type,
      salary,
      experience,
      responsibilities,
      requirements,
      benefits,
      companyLink,
      applyLink,
      image: image || getCompanyLogoUrl(company),
      category,
      workMode,
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(400).json({ message: 'Invalid job data', error: error.message });
  }
};

// @desc    Get all jobs with pagination
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filter = buildJobQuery(req.query);

    if (req.query.page && req.query.limit) {
      const skip = (page - 1) * limit;
      const count = await Job.countDocuments(filter);
      const jobs = await Job.find(filter)
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });

      return res.json({
        jobs: jobs.map(enrichJobLogo),
        page,
        pages: Math.ceil(count / limit),
        total: count
      });
    } else {
       const jobs = await Job.find(filter).sort({ createdAt: -1 });
       return res.json(jobs.map(enrichJobLogo));
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job) {
      res.json(enrichJobLogo(job));
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Job not found' });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private/Admin
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job) {
      job.title = req.body.title || job.title;
      job.description = req.body.description || job.description;
      job.company = req.body.company || job.company;
      job.location = req.body.location || job.location;
      job.type = req.body.type || job.type;
      job.salary = req.body.salary || job.salary;
      job.experience = req.body.experience || job.experience;
      job.responsibilities = req.body.responsibilities || job.responsibilities;
      job.requirements = req.body.requirements || job.requirements;
      job.benefits = req.body.benefits || job.benefits;
      job.companyLink = req.body.companyLink || job.companyLink;
      job.applyLink = req.body.applyLink || job.applyLink;
      job.image = req.body.image || job.image || getCompanyLogoUrl(job.company);
      job.category = req.body.category || job.category;
      job.workMode = req.body.workMode || job.workMode;

      const updatedJob = await job.save();
      res.json(updatedJob);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid job data', error: error.message });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job) {
      await job.deleteOne();
      res.json({ message: 'Job removed' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const enrichJobLogo = (job) => {
  const doc = job.toObject ? job.toObject() : { ...job };
  doc.logoCandidates = getCompanyLogoCandidates(doc.company, doc.image);
  doc.logoUrl = doc.logoCandidates[0] || getCompanyLogoUrl(doc.company, doc.image);
  if (!doc.image && doc.logoUrl) doc.image = doc.logoUrl;
  return doc;
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
};
