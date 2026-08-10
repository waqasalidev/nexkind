const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
} = require('../controllers/jobController');
const { applyToJob, getMyJobApplications, checkJobApplication } = require('../controllers/jobApplicationController');
const { protect, admin } = require('../middleware/authMiddleware');

// Job application routes (must come BEFORE /:id to avoid route conflicts)
router.get('/applications/my', protect, getMyJobApplications);

router.route('/')
  .get(getJobs)
  .post(protect, admin, createJob);

router.route('/:id')
  .get(getJobById)
  .put(protect, admin, updateJob)
  .delete(protect, admin, deleteJob);

// Per-job application routes
router.post('/:jobId/apply', protect, applyToJob);
router.get('/:jobId/application', protect, checkJobApplication);

module.exports = router;
