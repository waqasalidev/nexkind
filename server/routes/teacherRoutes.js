const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getStudents,
  getStudentRecord,
  assignGoal,
  updateGoal,
  deleteGoal,
  createAnnouncement,
  getAnnouncements,
  assignStudentToSelf
} = require('../controllers/teacherController');

// All routes here are protected and require a teacher role/authentication
router.get('/students', protect, getStudents);
router.get('/students/:id', protect, getStudentRecord);
router.post('/goals', protect, assignGoal);
router.put('/goals/:id', protect, updateGoal);
router.delete('/goals/:id', protect, deleteGoal);
router.post('/announcements', protect, createAnnouncement);
router.get('/announcements', protect, getAnnouncements);
router.post('/assign-student', protect, assignStudentToSelf);

module.exports = router;
