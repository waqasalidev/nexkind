const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  country: { type: String, default: 'Global' },
  city: { type: String, default: 'Remote' },
  location: { type: String, required: true },
  category: { type: String, default: 'Technology' },
  experienceLevel: {
    type: String,
    enum: ['Entry-level', 'Mid-level', 'Senior', 'Internship', 'Apprenticeship', 'Any'],
    default: 'Entry-level'
  },
  isPartnerListing: { type: Boolean, default: true },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote'],
    default: 'Full-time',
  },
  workMode: {
    type: String,
    enum: ['Remote', 'On-site', 'Hybrid'],
    default: 'On-site',
  },
  companyLogo: { type: String },
  salary: { type: String },
  experience: { type: String },
  responsibilities: [{ type: String }],
  requirements: [{ type: String }],
  skills: [{ type: String }],
  benefits: [{ type: String }],
  education: { type: String },
  applicationInstructions: [{ type: String }],
  companyLink: { type: String },
  applyLink: { type: String },
  applyUrl: { type: String },
  image: { type: String },
  deadline: { type: Date },
  status: {
    type: String,
    enum: ['active', 'archived', 'unpublished'],
    default: 'active',
  },
  applicantsCount: { type: Number, default: 0 },
  // Integration & Source Metadata
  source: { type: String, default: 'NexKind NGO Partner' },
  sourceName: { type: String },
  sourceUrl: { type: String },
  externalJobId: { type: String },
  applicationUrl: { type: String },
  currency: { type: String, default: 'USD' },
  fetchedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  lastSyncedAt: { type: Date, default: Date.now },
}, { timestamps: true });

jobSchema.index({ source: 1, externalJobId: 1 }, { sparse: true });

module.exports = mongoose.model('Job', jobSchema);
