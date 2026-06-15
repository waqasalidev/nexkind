const User = require('../models/User');
const Student = require('../models/Student');
const StudentRecord = require('../models/StudentRecord');
const MentorNote = require('../models/MentorNote');
const Announcement = require('../models/Announcement');
const Conversation = require('../models/Conversation');

// @desc    Get all students (highlighting assigned ones)
// @route   GET /api/teacher/students
// @access  Private/Teacher
const getStudents = async (req, res) => {
  try {
    // Ensure all students have a Student profile document. If not, dynamically initialize it.
    const studentUsers = await User.find({ role: 'student' });
    for (const studentUser of studentUsers) {
      const exists = await Student.findOne({ user: studentUser._id });
      if (!exists) {
        // Auto-assign to current teacher if they don't have a mentor yet
        await Student.create({
          user: studentUser._id,
          mentor: req.user._id
        });
      }
    }

    const studentProfiles = await Student.find({})
      .populate('user', 'firstName lastName email')
      .populate('mentor', 'firstName lastName');

    res.json(studentProfiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get complete student record details
// @route   GET /api/teacher/students/:id
// @access  Private/Teacher/Admin
const getStudentRecord = async (req, res) => {
  try {
    const studentId = req.params.id;
    const user = await User.findById(studentId)
      .populate('savedJobs')
      .populate('appliedJobs.job')
      .populate('registeredEvents.event')
      .populate('enrolledCourses.course')
      .populate('scholarshipApplications.scholarship');

    if (!user) {
      return res.status(404).json({ message: 'Student user not found' });
    }

    // Get or initialize Student Profile
    let profile = await Student.findOne({ user: studentId }).populate('mentor', 'firstName lastName');
    if (!profile) {
      profile = await Student.create({
        user: studentId,
        mentor: req.user._id
      });
    }

    // Get Mentor Notes / Goals
    const mentorNotes = await MentorNote.find({ student: studentId })
      .populate('teacher', 'firstName lastName')
      .sort({ createdAt: -1 });

    // Get AI Activities
    const aiHistory = await Conversation.find({ userId: studentId })
      .select('title createdAt updatedAt messages')
      .sort({ updatedAt: -1 });

    res.json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        status: user.status
      },
      profile: {
        educationLevel: profile.educationLevel,
        university: profile.university,
        skills: profile.skills,
        interests: profile.interests,
        mentor: profile.mentor
      },
      enrolledCourses: user.enrolledCourses,
      scholarshipApplications: user.scholarshipApplications,
      appliedJobs: user.appliedJobs,
      savedJobs: user.savedJobs,
      mentorNotes,
      aiHistory
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign goals or add feedback notes
// @route   POST /api/teacher/goals
// @access  Private/Teacher
const assignGoal = async (req, res) => {
  try {
    const { studentId, goal, progress, feedback } = req.body;

    if (!studentId || !goal) {
      return res.status(400).json({ message: 'Student ID and goal description are required' });
    }

    const note = await MentorNote.create({
      student: studentId,
      teacher: req.user._id,
      goal,
      progress: Math.min(Math.max(parseInt(progress) || 0, 0), 100),
      feedback: feedback || 'Work in progress'
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an existing goal or feedback
// @route   PUT /api/teacher/goals/:id
// @access  Private/Teacher
const updateGoal = async (req, res) => {
  try {
    const { progress, feedback, goal } = req.body;
    const note = await MentorNote.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Goal/Note not found' });
    }

    if (progress !== undefined) note.progress = Math.min(Math.max(parseInt(progress) || 0, 0), 100);
    if (feedback !== undefined) note.feedback = feedback;
    if (goal !== undefined) note.goal = goal;

    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a mentoring note/goal
// @route   DELETE /api/teacher/goals/:id
// @access  Private/Teacher
const deleteGoal = async (req, res) => {
  try {
    const note = await MentorNote.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Goal/Note not found' });
    }
    await note.deleteOne();
    res.json({ message: 'Mentoring goal deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Post educational announcement
// @route   POST /api/teacher/announcements
// @access  Private/Teacher
const createAnnouncement = async (req, res) => {
  try {
    const { title, content, targetAudience } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const ann = await Announcement.create({
      teacher: req.user._id,
      title,
      content,
      targetAudience: targetAudience || 'all'
    });

    res.status(201).json(ann);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all announcements
// @route   GET /api/teacher/announcements
// @access  Private
const getAnnouncements = async (req, res) => {
  try {
    const list = await Announcement.find({})
      .populate('teacher', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign student to a teacher
// @route   POST /api/teacher/assign-student
// @access  Private/Teacher
const assignStudentToSelf = async (req, res) => {
  try {
    const { studentId } = req.body;
    let student = await Student.findOne({ user: studentId });
    if (!student) {
      student = await Student.create({
        user: studentId,
        mentor: req.user._id
      });
    } else {
      student.mentor = req.user._id;
      await student.save();
    }
    res.json({ message: 'Student successfully assigned to you', student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentRecord,
  assignGoal,
  updateGoal,
  deleteGoal,
  createAnnouncement,
  getAnnouncements,
  assignStudentToSelf
};
