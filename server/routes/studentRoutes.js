const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getStudentDashboard,
  toggleSaveJob,
  applyJob,
  registerEvent,
  enrollCourse,
  applyScholarship,
  getStudentCourse,
  updateCourseProgress
} = require('../controllers/studentController');

router.get('/dashboard', protect, getStudentDashboard);
router.post('/jobs/save/:id', protect, toggleSaveJob);
router.post('/jobs/apply/:id', protect, applyJob);
router.post('/events/register/:id', protect, registerEvent);
router.post('/courses/enroll/:id', protect, enrollCourse);
router.get('/courses/:id', protect, getStudentCourse);
router.post('/courses/:id/progress', protect, updateCourseProgress);
router.post('/scholarships/apply/:id', protect, applyScholarship);

module.exports = router;
