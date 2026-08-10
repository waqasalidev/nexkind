const EventRegistration = require('../models/EventRegistration');
const Event = require('../models/Event');
const User = require('../models/User');
const mongoose = require('mongoose');
const { memEventRegistrations } = require('../utils/memoryStore');


// ─────────────────────────────────────────────────────────────
// @desc    Register for an event
// @route   POST /api/events/:eventId/register
// @access  Private
// ─────────────────────────────────────────────────────────────
const registerForEvent = async (req, res) => {
  const userId = req.user._id ? req.user._id.toString() : '6590a0000000000000000001';
  const { eventId } = req.params;

  let fetchedEvent = null;
  try {
    if (mongoose.Types.ObjectId.isValid(eventId)) {
      fetchedEvent = await Event.findById(eventId).maxTimeMS(2000);
    }
  } catch (err) {
    console.warn('[EVENT-REG] Event fetch timeout:', err.message);
  }

  const resolvedTitle = fetchedEvent ? fetchedEvent.title : (req.body.eventTitle || 'Event');
  const resolvedDate = fetchedEvent ? fetchedEvent.date : (req.body.eventDate || '');
  const resolvedType = fetchedEvent ? (fetchedEvent.category || 'Community Event') : (req.body.eventType || 'Community Event');
  const resolvedLocation = fetchedEvent ? fetchedEvent.location : (req.body.location || '');
  const resolvedMode = fetchedEvent ? fetchedEvent.eventMode : (req.body.eventMode || 'offline');
  const resolvedExtId = fetchedEvent ? (fetchedEvent.externalEventId || eventId) : eventId;

  try {
    // Check for existing registration
    const existingQuery = { user: userId };
    if (mongoose.Types.ObjectId.isValid(eventId) && fetchedEvent) {
      existingQuery.event = eventId;
    } else {
      existingQuery.externalEventId = resolvedExtId;
    }

    const existing = await EventRegistration.findOne(existingQuery).maxTimeMS(2000);
    if (existing) {
      return res.status(200).json({
        alreadyRegistered: true,
        message: 'You are already registered for this event.',
        registration: existing
      });
    }

    const registration = await EventRegistration.create({
      user: userId,
      event: mongoose.Types.ObjectId.isValid(eventId) ? eventId : undefined,
      eventTitle: resolvedTitle,
      eventDate: resolvedDate,
      eventType: resolvedType,
      location: resolvedLocation,
      eventMode: resolvedMode,
      externalEventId: resolvedExtId,
      status: 'Registered',
      registeredAt: new Date()
    });

    // Also sync to User embedded array (backward compat)
    try {
      const user = await User.findById(userId).maxTimeMS(2000);
      if (user && mongoose.Types.ObjectId.isValid(eventId)) {
        const alreadyInUser = user.registeredEvents.some(e => e.event && e.event.toString() === eventId);
        if (!alreadyInUser) {
          user.registeredEvents.push({ event: eventId, registeredAt: new Date() });
          await user.save();
        }
      }
      // Increment attendees count
      if (fetchedEvent) {
        await Event.findByIdAndUpdate(eventId, { $inc: { attendeesCount: 1 } });
      }
    } catch (syncErr) {
      console.warn('[EVENT-REG] User sync timeout (non-fatal):', syncErr.message);
    }

    return res.status(201).json({
      success: true,
      alreadyRegistered: false,
      message: 'Successfully registered for event',
      registration
    });
  } catch (error) {
    console.warn('[EVENT-REG] DB error, using in-memory fallback:', error.message);
  }

  // ── In-memory fallback ──
  const memExisting = memEventRegistrations.find(
    r => r.userId === userId && (r.eventId === eventId || r.externalEventId === resolvedExtId)
  );
  if (memExisting) {
    return res.status(200).json({
      alreadyRegistered: true,
      message: 'You are already registered for this event.',
      registration: memExisting
    });
  }

  const memReg = {
    _id: `mem-event-reg-${Date.now()}`,
    userId,
    eventId,
    eventTitle: resolvedTitle,
    eventDate: resolvedDate,
    eventType: resolvedType,
    location: resolvedLocation,
    eventMode: resolvedMode,
    externalEventId: resolvedExtId,
    status: 'Registered',
    registeredAt: new Date()
  };
  memEventRegistrations.push(memReg);

  res.status(201).json({
    success: true,
    alreadyRegistered: false,
    message: 'Successfully registered for event',
    registration: memReg
  });
};

// ─────────────────────────────────────────────────────────────
// @desc    Get all event registrations for the logged-in user
// @route   GET /api/events/registrations/my
// @access  Private
// ─────────────────────────────────────────────────────────────
const getMyEventRegistrations = async (req, res) => {
  const userId = req.user._id ? req.user._id.toString() : '6590a0000000000000000001';

  try {
    const registrations = await EventRegistration.find({ user: userId })
      .sort({ registeredAt: -1 })
      .maxTimeMS(2500);

    const memRegs = memEventRegistrations.filter(r => r.userId === userId);

    return res.json({
      success: true,
      count: registrations.length + memRegs.length,
      registrations: [...registrations, ...memRegs]
    });
  } catch (error) {
    console.warn('[EVENT-REG] getMyEventRegistrations timeout, serving in-memory fallback:', error.message);
    const memRegs = memEventRegistrations.filter(r => r.userId === userId);
    return res.json({
      success: true,
      count: memRegs.length,
      registrations: memRegs
    });
  }
};

// ─────────────────────────────────────────────────────────────
// @desc    Check if user is registered for a specific event
// @route   GET /api/events/:eventId/registration
// @access  Private
// ─────────────────────────────────────────────────────────────
const checkEventRegistration = async (req, res) => {
  const userId = req.user._id ? req.user._id.toString() : '6590a0000000000000000001';
  const { eventId } = req.params;

  try {
    const query = { user: userId };
    if (mongoose.Types.ObjectId.isValid(eventId)) {
      query.$or = [{ event: eventId }, { externalEventId: eventId }];
    } else {
      query.externalEventId = eventId;
    }
    const registration = await EventRegistration.findOne(query).maxTimeMS(2000);
    if (registration) {
      return res.json({ isRegistered: true, registration });
    }
  } catch (error) {
    console.warn('[EVENT-REG] checkEventRegistration timeout:', error.message);
  }

  // Check in-memory
  const memFound = memEventRegistrations.find(
    r => r.userId === userId && (r.eventId === eventId || r.externalEventId === eventId)
  );
  if (memFound) {
    return res.json({ isRegistered: true, registration: memFound });
  }

  res.json({ isRegistered: false, registration: null });
};

module.exports = { registerForEvent, getMyEventRegistrations, checkEventRegistration };

