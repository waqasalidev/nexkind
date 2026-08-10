const express = require('express');
const router = express.Router();
const {
  createEnrollment,
  getMyEnrollments,
  checkCourseEnrollment,
  updateEnrollmentProgress,
  deleteEnrollment
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createEnrollment);

router.route('/my')
  .get(protect, getMyEnrollments);

router.route('/check/:courseId')
  .get(protect, checkCourseEnrollment);

router.route('/:courseId/progress')
  .patch(protect, updateEnrollmentProgress);

router.route('/:courseId')
  .delete(protect, deleteEnrollment);

module.exports = router;
