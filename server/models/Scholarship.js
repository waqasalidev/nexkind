const mongoose = require('mongoose');

const scholarshipSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  provider: { type: String, required: true },
  country: { type: String, default: 'International' },
  eligibleCountries: [{ type: String }],
  degreeProgram: { type: String, default: 'Undergraduate & Masters' },
  fieldOfStudy: { type: String, default: 'All Fields' },
  university: { type: String },
  category: { type: String, default: 'Fully Funded' },
  degreeLevel: {
    type: String,
    enum: ['High School', 'Undergraduate', 'Masters', 'PhD', 'Diploma', 'Vocational', 'Any'],
    default: 'Any',
  },
  fundingType: {
    type: String,
    enum: ['Fully Funded', 'Partially Funded', 'Merit Award', 'Need-Based', 'Grant'],
    default: 'Fully Funded',
  },
  financialCoverage: {
    tuitionCoverage: { type: String, default: '100% Tuition Waived' },
    stipend: { type: String },
    accommodation: { type: String },
    travelAllowance: { type: String }
  },
  amount: { type: String, required: true },
  deadline: { type: String, required: true },
  eligibilityCriteria: [{ type: String }],
  requiredDocuments: [{ type: String }],
  benefits: [{ type: String }],
  applicationInstructions: [{ type: String }],
  ageRequirements: { type: String },
  academicRequirements: { type: String },
  languageRequirements: { type: String },
  providerLink: { type: String },
  applyLink: { type: String },
  applyUrl: { type: String },
  sourceReference: { type: String, default: 'NexKind NGO Verified Partner' },
  isPartnerListing: { type: Boolean, default: true },
  image: { type: String },
  applicantsCount: { type: Number, default: 0 },
  // Integration & Source Metadata
  organization: { type: String },
  source: { type: String, default: 'NexKind NGO Verified' },
  sourceName: { type: String },
  sourceUrl: { type: String },
  externalScholarshipId: { type: String },
  verificationStatus: {
    type: String,
    enum: ['Verified', 'Pending Verification', 'Expired', 'Archived'],
    default: 'Verified'
  },
  lastVerifiedAt: { type: Date, default: Date.now },
  lastSyncedAt: { type: Date, default: Date.now },
}, { timestamps: true });

scholarshipSchema.index({ source: 1, externalScholarshipId: 1 }, { sparse: true });

module.exports = mongoose.model('Scholarship', scholarshipSchema);
