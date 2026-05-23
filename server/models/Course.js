const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
});

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  platform: { type: String, default: 'NexKind' },
  rating: { type: Number, default: 0 },
  duration: { type: String, required: true },
  totalLectures: { type: Number, default: 0 },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  language: { type: String, default: 'English' },
  price: { type: Number, default: 0 },
  studentsEnrolled: { type: Number, default: 0 },
  category: { type: String, required: true },
  aboutCourse: { type: String },
  whatYouWillLearn: [{ type: String }],
  modules: [moduleSchema],
  image: { type: String },
  enrollLink: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
