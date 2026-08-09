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
  companyLink: { type: String },
  applyLink: { type: String },
  image: { type: String },
  deadline: { type: Date },
  status: {
    type: String,
    enum: ['active', 'archived', 'unpublished'],
    default: 'active',
  },
  applicantsCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
