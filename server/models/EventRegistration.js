const mongoose = require('mongoose');

const eventRegistrationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    },
    // Denormalized fields so records survive event deletion
    eventTitle: { type: String, required: true },
    eventDate: { type: String, default: '' },
    eventType: { type: String, default: 'Community Event' },
    location: { type: String, default: '' },
    eventMode: { type: String, default: 'offline' },
    externalEventId: { type: String, default: '' },
    source: { type: String, default: 'NexKind' },
    status: {
      type: String,
      enum: ['Registered', 'Attended', 'Cancelled', 'Waitlisted'],
      default: 'Registered'
    },
    registeredAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Unique per user+event pair (prevents duplicate registrations)
eventRegistrationSchema.index({ user: 1, event: 1 }, { sparse: true, unique: true });
eventRegistrationSchema.index({ user: 1, externalEventId: 1 }, { sparse: true });
// Efficient per-user lookups
eventRegistrationSchema.index({ user: 1, registeredAt: -1 });

module.exports = mongoose.model('EventRegistration', eventRegistrationSchema);
