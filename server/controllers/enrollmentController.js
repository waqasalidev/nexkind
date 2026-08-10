const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const mongoose = require('mongoose');
const { memoryEnrollments } = require('../utils/memoryStore');

// @desc    Enroll in a course (internal or external)
// @route   POST /api/enrollments
// @access  Private
const createEnrollment = async (req, res) => {
  const userId = req.user._id ? req.user._id.toString() : '6590a0000000000000000001';
  const {
    courseId,
    courseType = 'internal',
    externalProvider = 'Microsoft Learn',
    externalCourseId = '',
    courseTitle,
    sourceUrl = '',
    image = '',
    skillLevel = 'Beginner',
    category = 'Technology'
  } = req.body;

  let targetCourseObjId = null;
  let fetchedCourse = null;

  try {
    if (courseId && mongoose.Types.ObjectId.isValid(courseId)) {
      fetchedCourse = await Course.findById(courseId).maxTimeMS(2000);
      if (fetchedCourse) {
        targetCourseObjId = fetchedCourse._id;
      }
    }
  } catch (err) {
    console.warn('[ENROLL] Course find timeout:', err.message);
  }

  const isExternalCourse = courseType === 'external' || (fetchedCourse && fetchedCourse.isExternal);
  const resolvedTitle = courseTitle || (fetchedCourse ? fetchedCourse.title : 'Course');
  const resolvedUrl = sourceUrl || (fetchedCourse ? (fetchedCourse.sourceUrl || fetchedCourse.enrollLink) : '');
  const resolvedExtId = externalCourseId || (fetchedCourse ? (fetchedCourse.externalCourseId || fetchedCourse._id.toString()) : courseId || 'ext-1');

  try {
    let existingQuery = { user: userId };
    if (targetCourseObjId) {
      existingQuery.$or = [{ course: targetCourseObjId }, { externalCourseId: resolvedExtId }];
    } else if (resolvedExtId) {
      existingQuery.externalCourseId = resolvedExtId;
    }

    const existingEnrollment = await Enrollment.findOne(existingQuery).maxTimeMS(2000);
    if (existingEnrollment) {
      return res.status(200).json({
        alreadyEnrolled: true,
        message: "You're already enrolled in this course.",
        enrollment: existingEnrollment
      });
    }

    const enrollment = await Enrollment.create({
      user: userId,
      course: targetCourseObjId,
      courseType: isExternalCourse ? 'external' : 'internal',
      externalProvider: isExternalCourse ? externalProvider : 'NexKind Academy',
      externalCourseId: resolvedExtId,
      courseTitle: resolvedTitle,
      sourceUrl: resolvedUrl,
      image: image || (fetchedCourse ? fetchedCourse.image : ''),
      skillLevel: skillLevel || (fetchedCourse ? fetchedCourse.skillLevel : 'Beginner'),
      category: category || (fetchedCourse ? fetchedCourse.category : 'Technology'),
      status: 'enrolled',
      progress: 0,
      enrolledAt: new Date(),
      lastAccessedAt: new Date()
    });

    return res.status(201).json({
      success: true,
      alreadyEnrolled: false,
      message: 'Successfully enrolled in course',
      enrollment
    });
  } catch (error) {
    console.warn('[ENROLL] Database timeout or unavailable. Saving in-memory enrollment fallback:', error.message);
  }

  // Memory Fallback
  const memExisting = memoryEnrollments.find(e => e.userId === userId && (e.externalCourseId === resolvedExtId || e.courseId === courseId));
  if (memExisting) {
    return res.status(200).json({
      alreadyEnrolled: true,
      message: "You're already enrolled in this course.",
      enrollment: memExisting
    });
  }

  const memEnrollment = {
    _id: `mem-enroll-${Date.now()}`,
    userId,
    courseId,
    courseType: isExternalCourse ? 'external' : 'internal',
    externalProvider: isExternalCourse ? externalProvider : 'NexKind Academy',
    externalCourseId: resolvedExtId,
    courseTitle: resolvedTitle,
    sourceUrl: resolvedUrl,
    image,
    skillLevel,
    category,
    status: 'enrolled',
    progress: 0,
    enrolledAt: new Date(),
    lastAccessedAt: new Date()
  };

  memoryEnrollments.push(memEnrollment);

  res.status(201).json({
    success: true,
    alreadyEnrolled: false,
    message: 'Successfully enrolled in course',
    enrollment: memEnrollment
  });
};

// @desc    Get all enrollments for logged-in user
// @route   GET /api/enrollments/my
// @access  Private
const getMyEnrollments = async (req, res) => {
  const userId = req.user._id ? req.user._id.toString() : '6590a0000000000000000001';

  try {
    let enrollments = await Enrollment.find({ user: userId })
      .populate('course')
      .sort({ lastAccessedAt: -1, createdAt: -1 })
      .maxTimeMS(2000);

    const userMems = memoryEnrollments.filter(e => e.userId === userId);

    return res.json({
      success: true,
      count: enrollments.length + userMems.length,
      enrollments: [...enrollments, ...userMems]
    });
  } catch (error) {
    console.warn('[ENROLL] getMyEnrollments timeout/error. Serving in-memory enrollments fallback:', error.message);
    const userMems = memoryEnrollments.filter(e => e.userId === userId);
    return res.json({
      success: true,
      count: userMems.length,
      enrollments: userMems
    });
  }
};

// @desc    Check single course enrollment status
// @route   GET /api/enrollments/check/:courseId
// @access  Private
const checkCourseEnrollment = async (req, res) => {
  const userId = req.user._id ? req.user._id.toString() : '6590a0000000000000000001';
  const { courseId } = req.params;

  try {
    let query = { user: userId };
    if (mongoose.Types.ObjectId.isValid(courseId)) {
      query.$or = [
        { course: courseId },
        { externalCourseId: courseId },
        { _id: courseId }
      ];
    } else {
      query.externalCourseId = courseId;
    }

    const enrollment = await Enrollment.findOne(query).populate('course').maxTimeMS(2000);

    if (enrollment) {
      return res.json({
        isEnrolled: true,
        enrollment
      });
    }
  } catch (error) {
    console.warn('[ENROLL] checkCourseEnrollment timeout/error:', error.message);
  }

  const memFound = memoryEnrollments.find(e => e.userId === userId && (e.externalCourseId === courseId || e.courseId === courseId || e._id === courseId));
  if (memFound) {
    return res.json({
      isEnrolled: true,
      enrollment: memFound
    });
  }

  res.json({
    isEnrolled: false,
    enrollment: null
  });
};

// @desc    Update enrollment progress / access timestamp / mark completed
// @route   PATCH /api/enrollments/:courseId/progress
// @access  Private
const updateEnrollmentProgress = async (req, res) => {
  const userId = req.user._id ? req.user._id.toString() : '6590a0000000000000000001';
  const { courseId } = req.params;
  const { progress, status, completed } = req.body;

  try {
    let query = { user: userId };
    if (mongoose.Types.ObjectId.isValid(courseId)) {
      query.$or = [
        { course: courseId },
        { externalCourseId: courseId },
        { _id: courseId }
      ];
    } else {
      query.externalCourseId = courseId;
    }

    let enrollment = await Enrollment.findOne(query).maxTimeMS(2000);

    if (enrollment) {
      enrollment.lastAccessedAt = new Date();

      if (progress !== undefined) {
        enrollment.progress = Math.min(100, Math.max(0, Number(progress)));
      }

      if (completed === true || enrollment.progress === 100 || status === 'completed') {
        enrollment.status = 'completed';
        enrollment.progress = 100;
        if (!enrollment.completedAt) enrollment.completedAt = new Date();
      } else if (status) {
        enrollment.status = status;
      }

      await enrollment.save();

      return res.json({
        success: true,
        message: 'Enrollment updated',
        enrollment
      });
    }
  } catch (error) {
    console.warn('[ENROLL] updateEnrollmentProgress DB timeout/warning:', error.message);
  }

  // Memory Fallback
  let mem = memoryEnrollments.find(e => e.userId === userId && (e.externalCourseId === courseId || e.courseId === courseId || e._id === courseId));
  if (mem) {
    mem.lastAccessedAt = new Date();
    if (progress !== undefined) mem.progress = Math.min(100, Math.max(0, Number(progress)));
    if (completed === true || mem.progress === 100 || status === 'completed') {
      mem.status = 'completed';
      mem.progress = 100;
      if (!mem.completedAt) mem.completedAt = new Date();
    } else if (status) {
      mem.status = status;
    }
    return res.json({
      success: true,
      message: 'Enrollment updated (in-memory)',
      enrollment: mem
    });
  }

  res.status(404).json({ message: 'Enrollment not found' });
};

// @desc    Delete / unenroll course
// @route   DELETE /api/enrollments/:courseId
// @access  Private
const deleteEnrollment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    let query = { user: userId };
    if (mongoose.Types.ObjectId.isValid(courseId)) {
      query.$or = [{ course: courseId }, { externalCourseId: courseId }, { _id: courseId }];
    } else {
      query.externalCourseId = courseId;
    }

    const enrollment = await Enrollment.findOne(query);
    if (enrollment) {
      await enrollment.deleteOne();
      return res.json({ success: true, message: 'Unenrolled successfully' });
    }

    res.status(404).json({ message: 'Enrollment not found' });
  } catch (error) {
    res.status(500).json({ message: 'Delete enrollment error', error: error.message });
  }
};

module.exports = {
  createEnrollment,
  getMyEnrollments,
  checkCourseEnrollment,
  updateEnrollmentProgress,
  deleteEnrollment
};
