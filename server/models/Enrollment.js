const mongoose = require('mongoose');

const enrollmentSchema = mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    course: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Course' 
    },
    courseType: { 
      type: String, 
      enum: ['internal', 'external'], 
      default: 'internal' 
    },
    externalProvider: { 
      type: String, 
      default: 'Microsoft Learn' 
    },
    externalCourseId: { 
      type: String, 
      default: '' 
    },
    courseTitle: { 
      type: String, 
      required: true 
    },
    sourceUrl: { 
      type: String, 
      default: '' 
    },
    image: { 
      type: String, 
      default: '' 
    },
    skillLevel: { 
      type: String, 
      default: 'Beginner' 
    },
    category: { 
      type: String, 
      default: 'Technology' 
    },
    status: { 
      type: String, 
      enum: ['enrolled', 'in-progress', 'completed'], 
      default: 'enrolled' 
    },
    progress: { 
      type: Number, 
      default: 0 
    },
    enrolledAt: { 
      type: Date, 
      default: Date.now 
    },
    lastAccessedAt: { 
      type: Date, 
      default: Date.now 
    },
    completedAt: { 
      type: Date 
    }
  },
  { timestamps: true }
);

// Indexes to ensure user cannot double-enroll in same course
enrollmentSchema.index({ user: 1, course: 1 }, { sparse: true });
enrollmentSchema.index({ user: 1, externalCourseId: 1 }, { sparse: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
