const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin', 'teacher'], default: 'student' },
    status: { type: String, default: 'Active' },
    avatar: { type: String, default: '' },
    // User Activity Tracking
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    appliedJobs: [{ 
      job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }, 
      status: { type: String, default: 'Applied' }, 
      appliedAt: { type: Date, default: Date.now } 
    }],
    scholarshipApplications: [{ 
      scholarship: { type: mongoose.Schema.Types.ObjectId, ref: 'Scholarship' }, 
      status: { type: String, default: 'Pending' }, 
      appliedAt: { type: Date, default: Date.now } 
    }],
    registeredEvents: [{ 
      event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, 
      registeredAt: { type: Date, default: Date.now } 
    }],
    enrolledCourses: [{ 
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, 
      progress: { type: Number, default: 0 }, 
      enrolledAt: { type: Date, default: Date.now } 
    }],
  },
  { timestamps: true }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
