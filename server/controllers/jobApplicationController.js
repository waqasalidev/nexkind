const JobApplication = require('../models/JobApplication');
const Job = require('../models/Job');
const User = require('../models/User');
const mongoose = require('mongoose');
const { memJobApplications } = require('../utils/memoryStore');


// ─────────────────────────────────────────────────────────────
// @desc    Apply to a job
// @route   POST /api/jobs/:jobId/apply
// @access  Private
// ─────────────────────────────────────────────────────────────
const applyToJob = async (req, res) => {
  const userId = req.user._id ? req.user._id.toString() : '6590a0000000000000000001';
  const { jobId } = req.params;

  let fetchedJob = null;
  try {
    if (mongoose.Types.ObjectId.isValid(jobId)) {
      fetchedJob = await Job.findById(jobId).maxTimeMS(2000);
    }
  } catch (err) {
    console.warn('[JOB-APPLY] Job fetch timeout:', err.message);
  }

  const resolvedTitle = fetchedJob ? fetchedJob.title : (req.body.jobTitle || 'Job Position');
  const resolvedCompany = fetchedJob ? fetchedJob.company : (req.body.company || 'Company');
  const resolvedLocation = fetchedJob ? fetchedJob.location : (req.body.location || '');
  const resolvedJobType = fetchedJob ? fetchedJob.type : (req.body.jobType || 'Full-time');
  const resolvedApplyUrl = fetchedJob ? (fetchedJob.applyLink || fetchedJob.applicationUrl || '') : (req.body.applicationUrl || '');
  const resolvedExtId = fetchedJob ? (fetchedJob.externalJobId || jobId) : jobId;

  try {
    // Check for existing application
    const existingQuery = { user: userId };
    if (mongoose.Types.ObjectId.isValid(jobId) && fetchedJob) {
      existingQuery.job = jobId;
    } else {
      existingQuery.externalJobId = resolvedExtId;
    }

    const existing = await JobApplication.findOne(existingQuery).maxTimeMS(2000);
    if (existing) {
      return res.status(200).json({
        alreadyApplied: true,
        message: 'You have already applied for this job.',
        application: existing
      });
    }

    const application = await JobApplication.create({
      user: userId,
      job: mongoose.Types.ObjectId.isValid(jobId) ? jobId : undefined,
      jobTitle: resolvedTitle,
      company: resolvedCompany,
      location: resolvedLocation,
      jobType: resolvedJobType,
      applicationUrl: resolvedApplyUrl,
      externalJobId: resolvedExtId,
      status: 'Applied',
      appliedAt: new Date()
    });

    // Also sync to User embedded array (backward compat)
    try {
      const user = await User.findById(userId).maxTimeMS(2000);
      if (user && mongoose.Types.ObjectId.isValid(jobId)) {
        const alreadyInUser = user.appliedJobs.some(j => j.job && j.job.toString() === jobId);
        if (!alreadyInUser) {
          user.appliedJobs.push({ job: jobId, status: 'Applied', appliedAt: new Date() });
          await user.save();
        }
      }
      // Increment applicants count
      if (fetchedJob) {
        await Job.findByIdAndUpdate(jobId, { $inc: { applicantsCount: 1 } });
      }
    } catch (syncErr) {
      console.warn('[JOB-APPLY] User sync timeout (non-fatal):', syncErr.message);
    }

    return res.status(201).json({
      success: true,
      alreadyApplied: false,
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.warn('[JOB-APPLY] DB error, using in-memory fallback:', error.message);
  }

  // ── In-memory fallback ──
  const memExisting = memJobApplications.find(
    a => a.userId === userId && (a.jobId === jobId || a.externalJobId === resolvedExtId)
  );
  if (memExisting) {
    return res.status(200).json({
      alreadyApplied: true,
      message: 'You have already applied for this job.',
      application: memExisting
    });
  }

  const memApp = {
    _id: `mem-job-app-${Date.now()}`,
    userId,
    jobId,
    jobTitle: resolvedTitle,
    company: resolvedCompany,
    location: resolvedLocation,
    jobType: resolvedJobType,
    applicationUrl: resolvedApplyUrl,
    externalJobId: resolvedExtId,
    status: 'Applied',
    appliedAt: new Date()
  };
  memJobApplications.push(memApp);

  res.status(201).json({
    success: true,
    alreadyApplied: false,
    message: 'Application submitted successfully',
    application: memApp
  });
};

// ─────────────────────────────────────────────────────────────
// @desc    Get all job applications for the logged-in user
// @route   GET /api/jobs/applications/my
// @access  Private
// ─────────────────────────────────────────────────────────────
const getMyJobApplications = async (req, res) => {
  const userId = req.user._id ? req.user._id.toString() : '6590a0000000000000000001';

  try {
    const applications = await JobApplication.find({ user: userId })
      .sort({ appliedAt: -1 })
      .maxTimeMS(2500);

    const memApps = memJobApplications.filter(a => a.userId === userId);

    return res.json({
      success: true,
      count: applications.length + memApps.length,
      applications: [...applications, ...memApps]
    });
  } catch (error) {
    console.warn('[JOB-APPLY] getMyJobApplications timeout, serving in-memory fallback:', error.message);
    const memApps = memJobApplications.filter(a => a.userId === userId);
    return res.json({
      success: true,
      count: memApps.length,
      applications: memApps
    });
  }
};

// ─────────────────────────────────────────────────────────────
// @desc    Check if user has applied to a specific job
// @route   GET /api/jobs/:jobId/application
// @access  Private
// ─────────────────────────────────────────────────────────────
const checkJobApplication = async (req, res) => {
  const userId = req.user._id ? req.user._id.toString() : '6590a0000000000000000001';
  const { jobId } = req.params;

  try {
    const query = { user: userId };
    if (mongoose.Types.ObjectId.isValid(jobId)) {
      query.$or = [{ job: jobId }, { externalJobId: jobId }];
    } else {
      query.externalJobId = jobId;
    }
    const application = await JobApplication.findOne(query).maxTimeMS(2000);
    if (application) {
      return res.json({ hasApplied: true, application });
    }
  } catch (error) {
    console.warn('[JOB-APPLY] checkJobApplication timeout:', error.message);
  }

  // Check in-memory
  const memFound = memJobApplications.find(
    a => a.userId === userId && (a.jobId === jobId || a.externalJobId === jobId)
  );
  if (memFound) {
    return res.json({ hasApplied: true, application: memFound });
  }

  res.json({ hasApplied: false, application: null });
};

module.exports = { applyToJob, getMyJobApplications, checkJobApplication };
