const mongoose = require('mongoose');

const agendaItemSchema = mongoose.Schema({
  time: { type: String, required: true },
  activity: { type: String, required: true },
});

const speakerSchema = mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  institution: { type: String }, // optional, for things like "Dean, Tech University"
  image: { type: String }, // URL
});

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // About the Event
  date: { type: String, required: true }, // e.g. "March 15, 2026" or ISO
  time: { type: String, required: true }, // e.g. "09:00 AM - 05:00 PM"
  location: { type: String, required: true },
  organizer: { type: String }, // Optional
  category: { type: String },
  image: { type: String }, // Main event card image
  attendeesCount: { type: Number, default: 0 }, // Real-time counter stored in DB

  // Detailed Info
  agenda: [agendaItemSchema],
  speakers: [speakerSchema],

  // Meta
  registrationLink: { type: String }, // optional
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
