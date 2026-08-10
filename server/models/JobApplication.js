const mongoose = require('mongoose');

const jobApplicationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    },
    // Denormalized fields so records survive job deletion
    jobTitle: { type: String, required: true },
    company: { type: String, default: 'Unknown Company' },
    location: { type: String, default: '' },
    jobType: { type: String, default: 'Full-time' },
    applicationUrl: { type: String, default: '' },
    externalJobId: { type: String, default: '' },
    source: { type: String, default: 'NexKind' },
    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Rejected', 'Hired', 'Withdrawn'],
      default: 'Applied'
    },
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Unique per user+job pair (prevents duplicate applications)
jobApplicationSchema.index({ user: 1, job: 1 }, { sparse: true, unique: true });
jobApplicationSchema.index({ user: 1, externalJobId: 1 }, { sparse: true });
// Efficient per-user lookups
jobApplicationSchema.index({ user: 1, appliedAt: -1 });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
