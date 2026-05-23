const express = require('express');
const router = express.Router();
const {
  createScholarship,
  getScholarships,
  getScholarshipById,
  updateScholarship,
  deleteScholarship
} = require('../controllers/scholarshipController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getScholarships)
  .post(protect, admin, createScholarship);

router.route('/:id')
  .get(getScholarshipById)
  .put(protect, admin, updateScholarship)
  .delete(protect, admin, deleteScholarship);

module.exports = router;
