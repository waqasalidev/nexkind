const Event = require('../models/Event');
const { buildEventQuery } = require('../utils/buildQuery');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      startTime,
      endTime,
      location,
      eventMode,
      meetingUrl,
      organizer,
      category,
      image,
      capacity,
      agenda,
      speakers,
      status
    } = req.body;

    const event = new Event({
      title,
      description,
      date,
      time,
      startTime,
      endTime,
      location,
      eventMode: eventMode || 'offline',
      meetingUrl,
      organizer,
      category,
      image,
      capacity: capacity || 100,
      agenda,
      speakers,
      status: status || 'published'
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ message: 'Invalid event data', error: error.message });
  }
};

// @desc    Get all events with pagination & filtering
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filter = buildEventQuery(req.query);
    const count = await Event.countDocuments(filter);

    let events = await Event.find(filter).sort({ createdAt: -1 });

    // Client-side / filter parameter for upcoming vs past if requested
    const now = new Date();
    if (req.query.timeframe === 'upcoming') {
      events = events.filter(e => {
        const eventDate = new Date(e.date);
        return isNaN(eventDate.getTime()) || eventDate >= new Date(now.setHours(0,0,0,0));
      });
    } else if (req.query.timeframe === 'past') {
      events = events.filter(e => {
        const eventDate = new Date(e.date);
        return !isNaN(eventDate.getTime()) && eventDate < new Date(now.setHours(0,0,0,0));
      });
    }

    if (req.query.page && req.query.limit) {
      const skip = (page - 1) * limit;
      const paginatedEvents = events.slice(skip, skip + limit);
      return res.json({
        events: paginatedEvents,
        page,
        pages: Math.ceil(events.length / limit),
        total: events.length
      });
    } else {
      return res.json(events);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Event not found' });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      event.title = req.body.title || event.title;
      event.description = req.body.description || event.description;
      event.date = req.body.date || event.date;
      event.time = req.body.time || event.time;
      event.location = req.body.location || event.location;
      event.organizer = req.body.organizer || event.organizer;
      event.category = req.body.category || event.category;
      event.image = req.body.image || event.image;
      event.agenda = req.body.agenda || event.agenda;
      event.speakers = req.body.speakers || event.speakers;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid event data', error: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      await event.deleteOne();
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
};
