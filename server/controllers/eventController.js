const Event = require('../models/Event');

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
      location,
      organizer,
      category,
      image,
      agenda,
      speakers
    } = req.body;

    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      organizer,
      category,
      image,
      agenda,
      speakers
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ message: 'Invalid event data', error: error.message });
  }
};

// @desc    Get all events with pagination
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const count = await Event.countDocuments();
    
    // If limit is 0, return all events (useful for frontend cards if needed, though pagination preferred)
    // But for admin table consistency, let's keep standard pagination logic.
    // If not paging, frontend might not send page/limit, defaulting to 1/10.
    // Wait, public pages might use this too without pagination. 
    // Let's support "no params = all" OR "defaults".
    // Actually, usually it's better to default to pagination.
    // Let's check how frontend uses it currently. It just calls getEvents().
    // If I default to 10, existing frontend pages might break if they expect all.
    // Let's see... usually admin tables need pagination, public lists might need it too or "Load More".
    // Safest approach: if page/limit NOT provided, return all?
    // Or just default to a large limit?
    // The prompt asked for "server side pagination on all admin pages".
    // I'll implement proper pagination. If public pages break, I'll fix them to either request all or handle pages.
    // But to be safe for public pages that might expect an array:
    // I should check if pagination params are present.
    // Implementation:
    
    if (req.query.page && req.query.limit) {
       const skip = (page - 1) * limit;
       const events = await Event.find({})
         .limit(limit)
         .skip(skip)
         .sort({ createdAt: -1 });

       return res.json({
         events,
         page,
         pages: Math.ceil(count / limit),
         total: count
       });
    } else {
       // Return all if no pagination params (backward compatibility for public pages?)
       // User asked specifically to "implement server side pagination on all admin pages".
       // Admin pages WILL send params. Public pages WON'T (yet).
       // So this conditional return prevents breaking public pages which expect an array `[]` vs `{ events: [] }`.
       const events = await Event.find({}).sort({ createdAt: -1 });
       return res.json(events); 
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
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
