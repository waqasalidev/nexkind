const User = require('../models/User');
const Job = require('../models/Job');
const Event = require('../models/Event');
const Course = require('../models/Course');
const Scholarship = require('../models/Scholarship');
const Student = require('../models/Student');
const MentorNote = require('../models/MentorNote');
const Announcement = require('../models/Announcement');

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

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const alreadyEnrolled = user.enrolledCourses.find(
      (enroll) => enroll.course.toString() === courseId
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    // Default current lesson ID to first lesson if available
    let initialLessonId = '';
    if (course.modules && course.modules.length > 0 && course.modules[0].lessons && course.modules[0].lessons.length > 0) {
      initialLessonId = course.modules[0].lessons[0]._id ? course.modules[0].lessons[0]._id.toString() : 'mod-0-les-0';
    }

    user.enrolledCourses.push({
      course: courseId,
      progress: 0,
      enrolledAt: Date.now(),
      currentLessonId: initialLessonId,
      lastAccessedAt: Date.now(),
      completedLessons: [],
      certificateIssued: false
    });

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
      (enroll) => enroll.course && enroll.course._id.toString() === courseId
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
    const { lessonId, completed, currentLessonId } = req.body;

    const enrolledCourseIndex = user.enrolledCourses.findIndex(
      (enroll) => enroll.course.toString() === courseId
    );

    if (enrolledCourseIndex === -1) {
      return res.status(404).json({ message: 'Course not found in your enrollment' });
    }

    const enrollment = user.enrolledCourses[enrolledCourseIndex];
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Update active current lesson
    if (currentLessonId) {
      enrollment.currentLessonId = currentLessonId;
    } else if (lessonId) {
      enrollment.currentLessonId = lessonId;
    }
    enrollment.lastAccessedAt = Date.now();

    // Toggle or set lesson completion state if lessonId provided
    if (lessonId) {
      const lessonStr = lessonId.toString();
      const existingIdx = enrollment.completedLessons.findIndex(id => id.toString() === lessonStr);

      if (completed === true && existingIdx === -1) {
        enrollment.completedLessons.push(lessonStr);
      } else if (completed === false && existingIdx !== -1) {
        enrollment.completedLessons.splice(existingIdx, 1);
      } else if (completed === undefined) {
        // Toggle if not explicitly specified
        if (existingIdx !== -1) {
          enrollment.completedLessons.splice(existingIdx, 1);
        } else {
          enrollment.completedLessons.push(lessonStr);
        }
      }
    }

    // Calculate total lessons in course
    let totalLessonsCount = 0;
    if (course.modules && Array.isArray(course.modules)) {
      course.modules.forEach(mod => {
        if (mod.lessons && Array.isArray(mod.lessons)) {
          totalLessonsCount += mod.lessons.length;
        }
      });
    }

    if (totalLessonsCount > 0) {
      const percentage = Math.round((enrollment.completedLessons.length / totalLessonsCount) * 100);
      enrollment.progress = Math.min(100, Math.max(0, percentage));
    } else if (req.body.progress !== undefined) {
      enrollment.progress = req.body.progress;
    }

    if (enrollment.progress === 100) {
      if (!enrollment.completedAt) enrollment.completedAt = Date.now();
      enrollment.certificateIssued = true;
    }

    await user.save();

    res.json({
      message: 'Progress updated successfully',
      progress: enrollment.progress,
      currentLessonId: enrollment.currentLessonId,
      completedLessons: enrollment.completedLessons,
      certificateIssued: enrollment.certificateIssued,
      completedAt: enrollment.completedAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student profile info (university, skills, interests)
// @route   GET /api/student/profile
// @access  Private
const getStudentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    let profile = await Student.findOne({ user: req.user._id }).populate('mentor', 'firstName lastName email');
    if (!profile) {
      profile = await Student.create({
        user: req.user._id
      });
    }
    res.json({
      user,
      profile
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update student profile and academic details
// @route   PUT /api/student/profile
// @access  Private
const updateStudentProfile = async (req, res) => {
  try {
    const { firstName, lastName, educationLevel, university, skills, interests } = req.body;
    
    // Update User Name
    const user = await User.findById(req.user._id);
    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      await user.save();
    }

    // Update or Create Student Profile
    let studentProfile = await Student.findOne({ user: req.user._id });
    if (!studentProfile) {
      studentProfile = await Student.create({
        user: req.user._id,
        educationLevel,
        university,
        skills: skills || [],
        interests: interests || []
      });
    } else {
      if (educationLevel !== undefined) studentProfile.educationLevel = educationLevel;
      if (university !== undefined) studentProfile.university = university;
      if (skills !== undefined) studentProfile.skills = skills;
      if (interests !== undefined) studentProfile.interests = interests;
      await studentProfile.save();
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      profile: studentProfile
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student's mentoring feedback, goals, and announcements
// @route   GET /api/student/mentoring
// @access  Private
const getStudentMentorInfo = async (req, res) => {
  try {
    const mentorNotes = await MentorNote.find({ student: req.user._id })
      .populate('teacher', 'firstName lastName email')
      .sort({ createdAt: -1 });

    const studentProfile = await Student.findOne({ user: req.user._id }).populate('mentor', 'firstName lastName email');
    const announcements = await Announcement.find({})
      .populate('teacher', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json({
      mentorNotes,
      mentor: studentProfile ? studentProfile.mentor : null,
      announcements
    });
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
  updateCourseProgress,
  getStudentProfile,
  updateStudentProfile,
  getStudentMentorInfo
};
