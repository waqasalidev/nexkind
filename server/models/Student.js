const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  educationLevel: { type: String, default: 'Undergraduate' },
  university: { type: String, default: 'Global University' },
  skills: [{ type: String }],
  interests: [{ type: String }],
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
