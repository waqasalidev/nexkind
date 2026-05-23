const mongoose = require('mongoose');

const chatSettingsSchema = mongoose.Schema({
  welcomeMessage: {
    type: String,
    default: "Hello! I'm NexKind AI, your personal academic and career assistant. How can I help you today?",
  },
  systemPrompt: {
    type: String,
    default: `You are NexKind AI, an expert student career counselor and academic assistant for the NexKind platform.
Help students with: career counseling, course guidance, scholarship suggestions, study advice, skill roadmaps,
programming help, resume guidance, university recommendations, freelancing guidance, and tech career advice.
Be friendly, concise, and actionable. Use bullet points when listing steps. If unsure, say so honestly.`,
  },
  modelProvider: {
    type: String,
    enum: ['openai', 'gemini', 'auto'],
    default: 'auto',
  },
  maxTokens: { type: Number, default: 1024 },
  temperature: { type: Number, default: 0.7 },
  isEnabled: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('ChatSettings', chatSettingsSchema);
