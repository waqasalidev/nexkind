const User = require('../models/User');
const Job = require('../models/Job');
const Event = require('../models/Event');
const Course = require('../models/Course');
const Scholarship = require('../models/Scholarship');

// @desc    Get student dashboard data (populated)
// @route   GET /api/student/dashboard
// @access  Private (Student)
const getStudentDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('savedJobs')
      .populate('appliedJobs.job')
      .populate('registeredEvents.event')
      .populate('enrolledCourses.course')
      .populate('scholarshipApplications.scholarship');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      savedJobs: user.savedJobs,
      appliedJobs: user.appliedJobs,
      registeredEvents: user.registeredEvents,
      enrolledCourses: user.enrolledCourses,
      scholarshipApplications: user.scholarshipApplications
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle save/unsave job
// @route   POST /api/student/jobs/save/:id
// @access  Private
const toggleSaveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const jobId = req.params.id;

    if (user.savedJobs.includes(jobId)) {
      user.savedJobs.pull(jobId);
      await user.save();
      res.json({ message: 'Job removed from saved list', saved: false });
    } else {
      user.savedJobs.push(jobId);
      await user.save();
      res.json({ message: 'Job saved successfully', saved: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Apply for a job
// @route   POST /api/student/jobs/apply/:id
// @access  Private
const applyJob = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const jobId = req.params.id;

    const alreadyApplied = user.appliedJobs.find(
      (app) => app.job.toString() === jobId
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    user.appliedJobs.push({ job: jobId });
    await user.save();
    
    // Increment job applicants count
    await Job.findByIdAndUpdate(jobId, { $inc: { applicantsCount: 1 } });
    
    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register for an event
// @route   POST /api/student/events/register/:id
// @access  Private
const registerEvent = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const eventId = req.params.id;

    const alreadyRegistered = user.registeredEvents.find(
      (reg) => reg.event.toString() === eventId
    );

    if (alreadyRegistered) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    user.registeredEvents.push({ event: eventId });
    await user.save();

    // Increment event attendees count
    await Event.findByIdAndUpdate(eventId, { $inc: { attendeesCount: 1 } });

    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Enroll in a course
// @route   POST /api/student/courses/enroll/:id
// @access  Private
const enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const courseId = req.params.id;

    const alreadyEnrolled = user.enrolledCourses.find(
      (enroll) => enroll.course.toString() === courseId
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    user.enrolledCourses.push({ course: courseId });
    await user.save();

    // Increment course students enrolled count
    await Course.findByIdAndUpdate(courseId, { $inc: { studentsEnrolled: 1 } });

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Apply for scholarship
// @route   POST /api/student/scholarships/apply/:id
// @access  Private
const applyScholarship = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const scholarshipId = req.params.id;

    const alreadyApplied = user.scholarshipApplications.find(
      (app) => app.scholarship.toString() === scholarshipId
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied for this scholarship' });
    }

    user.scholarshipApplications.push({ scholarship: scholarshipId });
    await user.save();

    // Increment scholarship applicants count
    await Scholarship.findByIdAndUpdate(scholarshipId, { $inc: { applicantsCount: 1 } });

    res.json({ message: 'Scholarship application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get specific enrolled course details
// @route   GET /api/student/courses/:id
// @access  Private
const getStudentCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('enrolledCourses.course');
    const courseId = req.params.id;

    const enrolledCourse = user.enrolledCourses.find(
      (enroll) => enroll.course._id.toString() === courseId
    );

    if (!enrolledCourse) {
      return res.status(404).json({ message: 'Course not found in your enrollment' });
    }

    res.json(enrolledCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update course progress
// @route   POST /api/student/courses/:id/progress
// @access  Private
const updateCourseProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const courseId = req.params.id;
    const { progress } = req.body;

    const enrolledCourseIndex = user.enrolledCourses.findIndex(
      (enroll) => enroll.course.toString() === courseId
    );

    if (enrolledCourseIndex === -1) {
      return res.status(404).json({ message: 'Course not found in your enrollment' });
    }

    user.enrolledCourses[enrolledCourseIndex].progress = progress;
    await user.save();

    res.json({ message: 'Progress updated', progress: user.enrolledCourses[enrolledCourseIndex].progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudentDashboard,
  toggleSaveJob,
  applyJob,
  registerEvent,
  enrollCourse,
  applyScholarship,
  getStudentCourse,
  updateCourseProgress
};
