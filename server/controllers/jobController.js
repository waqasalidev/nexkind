const Job = require('../models/Job');
const { buildJobQuery } = require('../utils/buildQuery');
const { getCompanyLogoUrl, getCompanyLogoCandidates } = require('../utils/companyLogo');
const jobsData = require('../utils/jobsData');

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
      applyUrl,
      image,
      category,
      workMode,
      country,
      city,
      skills,
      education,
      applicationInstructions,
      source,
      sourceName,
      sourceUrl,
      deadline,
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
      applyLink: applyUrl || applyLink,
      applyUrl: applyUrl || applyLink,
      image: image || getCompanyLogoUrl(company),
      category,
      workMode,
      country: country || 'Global',
      city: city || 'Remote',
      skills: skills || [],
      education,
      applicationInstructions: applicationInstructions || [],
      source: source || 'NexKind NGO Partner',
      sourceName: sourceName || source || (company ? `${company} Careers` : 'Official Company Website'),
      sourceUrl: sourceUrl || companyLink,
      deadline,
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

    let jobs = [];
    let count = 0;

    try {
      count = await Job.countDocuments(filter);
      if (req.query.page && req.query.limit) {
        const skip = (page - 1) * limit;
        jobs = await Job.find(filter)
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: -1 });
      } else {
        jobs = await Job.find(filter).sort({ createdAt: -1 });
      }
    } catch (dbErr) {
      console.warn('[JOBS] DB fetch warning:', dbErr.message);
      jobs = [];
    }

    // Fallback to jobsData if 0 jobs found
    if (jobs.length === 0) {
      let list = [...jobsData];
      if (req.query.country) {
        const c = req.query.country.toLowerCase();
        list = list.filter(
          (j) =>
            (j.country && j.country.toLowerCase().includes(c)) ||
            (j.location && j.location.toLowerCase().includes(c))
        );
      }
      if (req.query.type) {
        list = list.filter(
          (j) => j.type && j.type.toLowerCase() === req.query.type.toLowerCase()
        );
      }
      if (req.query.category) {
        list = list.filter(
          (j) => j.category && j.category.toLowerCase().includes(req.query.category.toLowerCase())
        );
      }
      if (req.query.search) {
        const q = req.query.search.toLowerCase();
        list = list.filter(
          (j) =>
            (j.title && j.title.toLowerCase().includes(q)) ||
            (j.description && j.description.toLowerCase().includes(q)) ||
            (j.company && j.company.toLowerCase().includes(q)) ||
            (j.location && j.location.toLowerCase().includes(q)) ||
            (j.country && j.country.toLowerCase().includes(q)) ||
            (j.skills && j.skills.some((s) => s.toLowerCase().includes(q)))
        );
      }

      count = list.length;
      if (req.query.page && req.query.limit) {
        const skip = (page - 1) * limit;
        jobs = list.slice(skip, skip + limit);
      } else {
        jobs = list;
      }
    }

    const enriched = jobs.map(enrichJobLogo);
    if (req.query.page && req.query.limit) {
      return res.json({
        jobs: enriched,
        page,
        pages: Math.ceil(count / limit) || 1,
        total: count,
      });
    } else {
      return res.json(enriched);
    }
  } catch (error) {
    console.error('[JOBS] getJobs error:', error.message);
    return res.json({
      jobs: jobsData.slice(0, 10).map(enrichJobLogo),
      page: 1,
      pages: Math.ceil(jobsData.length / 10) || 1,
      total: jobsData.length,
    });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    let job = null;
    try {
      job = await Job.findById(req.params.id);
    } catch {
      job = null;
    }

    if (!job) {
      job = jobsData.find(
        (j) => String(j._id) === String(req.params.id) || String(j.id) === String(req.params.id)
      );
    }

    if (job) {
      return res.json(enrichJobLogo(job));
    } else {
      return res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    return res.status(404).json({ message: 'Job not found' });
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
      job.applyLink = req.body.applyUrl || req.body.applyLink || job.applyLink;
      job.applyUrl = req.body.applyUrl || req.body.applyLink || job.applyUrl || job.applyLink;
      job.image = req.body.image || job.image || getCompanyLogoUrl(job.company);
      job.category = req.body.category || job.category;
      job.workMode = req.body.workMode || job.workMode;
      job.country = req.body.country || job.country;
      job.city = req.body.city || job.city;
      job.skills = req.body.skills || job.skills;
      job.education = req.body.education || job.education;
      job.applicationInstructions = req.body.applicationInstructions || job.applicationInstructions;
      job.source = req.body.source || job.source;
      job.sourceName = req.body.sourceName || job.sourceName;
      job.sourceUrl = req.body.sourceUrl || job.sourceUrl;
      job.deadline = req.body.deadline || job.deadline;

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
  doc.applyUrl = doc.applyUrl || doc.applyLink || doc.applicationUrl;
  doc.applyLink = doc.applyUrl;
  doc.sourceName = doc.sourceName || doc.source || (doc.company ? `${doc.company} Official Careers` : 'Official Company Website');
  doc.sourceUrl = doc.sourceUrl || doc.companyLink;
  return doc;
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
};
