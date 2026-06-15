const mongoose = require('mongoose');

const mentorNoteSchema = mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goal: { type: String, required: true },
  progress: { type: Number, default: 0 }, // 0 to 100%
  feedback: { type: String, default: 'Work in progress' }
}, { timestamps: true });

module.exports = mongoose.model('MentorNote', mentorNoteSchema);
