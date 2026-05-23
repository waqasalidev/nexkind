const mongoose = require('mongoose');

const scholarshipSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  provider: { type: String, required: true },
  country: { type: String, default: 'International' },
  university: { type: String },
  category: { type: String },
  degreeLevel: {
    type: String,
    enum: ['High School', 'Undergraduate', 'Masters', 'PhD', 'Any'],
    default: 'Any',
  },
  fundingType: {
    type: String,
    enum: ['Fully Funded', 'Partially Funded', 'Merit Award', 'Grant'],
    default: 'Merit Award',
  },
  amount: { type: String, required: true },
  deadline: { type: String, required: true },
  eligibilityCriteria: [{ type: String }],
  requiredDocuments: [{ type: String }],
  providerLink: { type: String },
  applyLink: { type: String },
  image: { type: String },
  applicantsCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Scholarship', scholarshipSchema);
