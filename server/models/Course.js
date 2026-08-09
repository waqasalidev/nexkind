const mongoose = require('mongoose');

const practiceQuestionSchema = mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // Index 0-3
  explanation: { type: String },
});

const quizQuestionSchema = mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
});

const resourceSchema = mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

const lessonSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: String, default: '15 mins' },
  videoUrl: { type: String },
  resources: [resourceSchema],
  preparationMaterial: { type: String },
  practiceQuestions: [practiceQuestionSchema],
  quiz: [quizQuestionSchema],
});

const moduleSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  lessons: [lessonSchema],
});

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  platform: { type: String, default: 'NexKind' },
  rating: { type: Number, default: 4.8 },
  duration: { type: String, required: true },
  totalLectures: { type: Number, default: 0 },
  language: { type: String, default: 'English' },
  price: { type: Number, default: 0 },
  studentsEnrolled: { type: Number, default: 0 },
  category: {
    type: String,
    enum: ['Technology', 'Design', 'Business & Career', 'Academic & General', 'Web Development', 'Mobile Development', 'Data Science', 'AI & ML', 'Cybersecurity', 'UI/UX Design', 'General'],
    default: 'Technology'
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Expert', 'All Levels'],
    default: 'Beginner'
  },
  aboutCourse: { type: String },
  whatYouWillLearn: [{ type: String }],
  skills: [{ type: String }],
  prerequisites: [{ type: String }],
  certificateEligible: { type: Boolean, default: true },
  status: {
    type: String,
    enum: ['published', 'draft', 'archived'],
    default: 'published',
  },
  modules: [moduleSchema],
  image: { type: String },
  enrollLink: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);

