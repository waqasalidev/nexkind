const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  targetAudience: { type: String, enum: ['all', 'assigned'], default: 'all' }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);
