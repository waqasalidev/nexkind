const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  department: { type: String, default: 'General Education' },
  specialization: [{ type: String }],
  bio: { type: String, default: 'Mentor at NexKind' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
