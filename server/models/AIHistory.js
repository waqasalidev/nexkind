const mongoose = require('mongoose');

const aiHistorySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  messageCount: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }]
}, { timestamps: true });

module.exports = mongoose.model('AIHistory', aiHistorySchema);
