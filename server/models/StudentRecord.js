const mongoose = require('mongoose');

const studentRecordSchema = mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  educationLevel: { type: String, default: 'Undergraduate' },
  university: { type: String, default: 'Global University' },
  skills: [{ type: String }],
  interests: [{ type: String }],
  savedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  savedScholarships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scholarship' }],
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  aiActivityCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('StudentRecord', studentRecordSchema);
