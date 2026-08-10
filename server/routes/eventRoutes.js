const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const { registerForEvent, getMyEventRegistrations, checkEventRegistration } = require('../controllers/eventRegistrationController');
const { protect, admin } = require('../middleware/authMiddleware');

// Event registration routes (must come BEFORE /:id to avoid route conflicts)
router.get('/registrations/my', protect, getMyEventRegistrations);

router.route('/')
  .get(getEvents)
  .post(protect, admin, createEvent);

router.route('/:id')
  .get(getEventById)
  .put(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);

// Per-event registration routes
router.post('/:eventId/register', protect, registerForEvent);
router.get('/:eventId/registration', protect, checkEventRegistration);

module.exports = router;
