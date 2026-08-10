const mongoose = require('mongoose');

const scholarshipApplicationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    scholarship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scholarship'
    },
    // Denormalized fields so records survive scholarship deletion
    scholarshipTitle: { type: String, required: true },
    provider: { type: String, default: '' },
    amount: { type: String, default: '' },
    deadline: { type: String, default: '' },
    externalScholarshipId: { type: String, default: '' },
    source: { type: String, default: 'NexKind' },
    status: {
      type: String,
      enum: ['Pending', 'Under Review', 'Shortlisted', 'Awarded', 'Rejected', 'Withdrawn'],
      default: 'Pending'
    },
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Unique per user+scholarship pair (prevents duplicate applications)
scholarshipApplicationSchema.index({ user: 1, scholarship: 1 }, { sparse: true, unique: true });
scholarshipApplicationSchema.index({ user: 1, externalScholarshipId: 1 }, { sparse: true });
scholarshipApplicationSchema.index({ user: 1, appliedAt: -1 });

module.exports = mongoose.model('ScholarshipApplication', scholarshipApplicationSchema);
