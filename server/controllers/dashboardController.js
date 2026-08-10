const Course = require('../models/Course');
const Event = require('../models/Event');
const Scholarship = require('../models/Scholarship');
const Job = require('../models/Job');
const User = require('../models/User');
const Donation = require('../models/Donation');
const Enrollment = require('../models/Enrollment');
const JobApplication = require('../models/JobApplication');
const EventRegistration = require('../models/EventRegistration');
const ScholarshipApplication = require('../models/ScholarshipApplication');
const { memoryEnrollments, memJobApplications, memEventRegistrations } = require('../utils/memoryStore');


// ─────────────────────────────────────────────────────────────
// @desc    Get per-user dashboard summary (real counts + recent activity)
// @route   GET /api/dashboard/summary
// @access  Private
// ─────────────────────────────────────────────────────────────
const getDashboardSummary = async (req, res) => {
  const userId = req.user._id ? req.user._id.toString() : '6590a0000000000000000001';

  let coursesEnrolled = 0;
  let jobsApplied = 0;
  let eventsRegistered = 0;
  let scholarshipsApplied = 0;
  let recentActivity = [];
  let dbOnline = true;

  try {
    // ── Efficient count queries (never downloads all records) ──
    const [enrollCount, jobAppCount, eventRegCount, scholAppCount] = await Promise.all([
      Enrollment.countDocuments({ user: userId }).maxTimeMS(2000),
      JobApplication.countDocuments({ user: userId }).maxTimeMS(2000),
      EventRegistration.countDocuments({ user: userId }).maxTimeMS(2000),
      ScholarshipApplication.countDocuments({ user: userId }).maxTimeMS(2000)
    ]);

    coursesEnrolled = enrollCount;
    jobsApplied = jobAppCount;
    eventsRegistered = eventRegCount;
    scholarshipsApplied = scholAppCount;

    // ── Recent Activity (last 10 items, newest first) ──
    const [recentEnrollments, recentJobs, recentEvents, recentScholarships] = await Promise.all([
      Enrollment.find({ user: userId }).sort({ enrolledAt: -1 }).limit(5).select('courseTitle enrolledAt status').maxTimeMS(2000),
      JobApplication.find({ user: userId }).sort({ appliedAt: -1 }).limit(5).select('jobTitle company status appliedAt').maxTimeMS(2000),
      EventRegistration.find({ user: userId }).sort({ registeredAt: -1 }).limit(5).select('eventTitle eventDate status registeredAt').maxTimeMS(2000),
      ScholarshipApplication.find({ user: userId }).sort({ appliedAt: -1 }).limit(3).select('scholarshipTitle provider status appliedAt').maxTimeMS(2000)
    ]);

    recentActivity = [
      ...recentEnrollments.map(e => ({
        type: 'enrollment',
        icon: '📚',
        title: `Enrolled in ${e.courseTitle}`,
        status: e.status,
        at: e.enrolledAt || e.createdAt
      })),
      ...recentJobs.map(j => ({
        type: 'job_application',
        icon: '💼',
        title: `Applied for ${j.jobTitle}${j.company ? ` at ${j.company}` : ''}`,
        status: j.status,
        at: j.appliedAt || j.createdAt
      })),
      ...recentEvents.map(e => ({
        type: 'event_registration',
        icon: '📅',
        title: `Registered for ${e.eventTitle}`,
        status: e.status,
        at: e.registeredAt || e.createdAt
      })),
      ...recentScholarships.map(s => ({
        type: 'scholarship_application',
        icon: '🎓',
        title: `Applied for ${s.scholarshipTitle}`,
        status: s.status,
        at: s.appliedAt || s.createdAt
      }))
    ].sort((a, b) => new Date(b.at) - new Date(a.at)).slice(0, 10);

  } catch (error) {
    console.warn('[DASHBOARD-SUMMARY] DB timeout, falling back to User document + in-memory:', error.message);
    dbOnline = false;

    // ── Fallback: count from User embedded arrays + in-memory stores ──
    try {
      const user = await User.findById(userId).select('enrolledCourses appliedJobs registeredEvents scholarshipApplications').maxTimeMS(2000);
      if (user) {
        coursesEnrolled = user.enrolledCourses.length;
        jobsApplied = user.appliedJobs.length;
        eventsRegistered = user.registeredEvents.length;
        scholarshipsApplied = user.scholarshipApplications.length;
      }
    } catch (userErr) {
      console.warn('[DASHBOARD-SUMMARY] User doc fallback also timed out:', userErr.message);
    }

    // Layer in-memory counts on top
    const memEnrollCount = memoryEnrollments.filter(e => e.userId === userId).length;
    const memJobCount = memJobApplications.filter(a => a.userId === userId).length;
    const memEventCount = memEventRegistrations.filter(r => r.userId === userId).length;

    coursesEnrolled += memEnrollCount;
    jobsApplied += memJobCount;
    eventsRegistered += memEventCount;

    // Build in-memory recent activity
    const memActivity = [
      ...memoryEnrollments.filter(e => e.userId === userId).map(e => ({
        type: 'enrollment', icon: '📚',
        title: `Enrolled in ${e.courseTitle}`,
        status: e.status, at: e.enrolledAt
      })),
      ...memJobApplications.filter(a => a.userId === userId).map(a => ({
        type: 'job_application', icon: '💼',
        title: `Applied for ${a.jobTitle}${a.company ? ` at ${a.company}` : ''}`,
        status: a.status, at: a.appliedAt
      })),
      ...memEventRegistrations.filter(r => r.userId === userId).map(r => ({
        type: 'event_registration', icon: '📅',
        title: `Registered for ${r.eventTitle}`,
        status: r.status, at: r.registeredAt
      }))
    ].sort((a, b) => new Date(b.at) - new Date(a.at)).slice(0, 10);
    recentActivity = memActivity;
  }

  res.json({
    success: true,
    dbOnline,
    coursesEnrolled,
    jobsApplied,
    eventsRegistered,
    scholarshipsApplied,
    recentActivity
  });
};

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Public/Private (depending on need, keeping public for easier integration for now)
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const students = await User.countDocuments({ role: 'student' });
    const activeCourses = await Course.countDocuments();
    const totalEvents = await Event.countDocuments();
    const scholarships = await Scholarship.countDocuments();
    const activeJobs = await Job.countDocuments();

    const totalDonationAmount = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRaised = totalDonationAmount.length > 0 ? totalDonationAmount[0].total : 0;

    // Aggregated stats from collections
    const courseStats = await Course.aggregate([{ $group: { _id: null, totalEnrolled: { $sum: "$studentsEnrolled" } } }]);
    const totalEnrolled = courseStats.length > 0 ? courseStats[0].totalEnrolled : 0;

    const eventStats = await Event.aggregate([{ $group: { _id: null, totalAttendees: { $sum: "$attendeesCount" } } }]);
    const totalAttendees = eventStats.length > 0 ? eventStats[0].totalAttendees : 0;

    const jobStats = await Job.aggregate([{ $group: { _id: null, totalApplicants: { $sum: "$applicantsCount" } } }]);
    const totalJobApplicants = jobStats.length > 0 ? jobStats[0].totalApplicants : 0;

    const scholarshipStats = await Scholarship.aggregate([{ $group: { _id: null, totalApplicants: { $sum: "$applicantsCount" } } }]);
    const totalScholarshipApplicants = scholarshipStats.length > 0 ? scholarshipStats[0].totalApplicants : 0;

    res.json({
      totalUsers,
      students,
      activeCourses,
      totalEvents,
      scholarships,
      activeJobs,
      totalRaised,
      totalEnrolled,
      totalAttendees,
      totalJobApplicants,
      totalScholarshipApplicants
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const syncDatabaseCounts = async (req, res) => {
  try {
    // 1. Reset counts to 0
    await Job.updateMany({}, { applicantsCount: 0 });
    await Event.updateMany({}, { attendeesCount: 0 });
    await Scholarship.updateMany({}, { applicantsCount: 0 });
    // Note: We might want to be careful resetting course enrollment if it came from elsewhere, 
    // but assuming User.enrolledCourses is the source of truth:
    await Course.updateMany({}, { studentsEnrolled: 0 });

    // 2. Aggregate from Users
    const users = await User.find({ role: 'student' })
      .select('appliedJobs registeredEvents scholarshipApplications enrolledCourses');

    const jobCounts = {};
    const eventCounts = {};
    const scholarshipCounts = {};
    const courseCounts = {};

    users.forEach(user => {
      user.appliedJobs.forEach(app => {
        const id = app.job.toString();
        jobCounts[id] = (jobCounts[id] || 0) + 1;
      });
      user.registeredEvents.forEach(reg => {
        const id = reg.event.toString();
        eventCounts[id] = (eventCounts[id] || 0) + 1;
      });
      user.scholarshipApplications.forEach(app => {
        const id = app.scholarship.toString();
        scholarshipCounts[id] = (scholarshipCounts[id] || 0) + 1;
      });
      user.enrolledCourses.forEach(enroll => {
        const id = enroll.course.toString();
        courseCounts[id] = (courseCounts[id] || 0) + 1;
      });
    });

    // 3. Update Documents
    const updatePromises = [];

    for (const [id, count] of Object.entries(jobCounts)) {
      updatePromises.push(Job.findByIdAndUpdate(id, { applicantsCount: count }));
    }
    for (const [id, count] of Object.entries(eventCounts)) {
      updatePromises.push(Event.findByIdAndUpdate(id, { attendeesCount: count }));
    }
    for (const [id, count] of Object.entries(scholarshipCounts)) {
      updatePromises.push(Scholarship.findByIdAndUpdate(id, { applicantsCount: count }));
    }
    for (const [id, count] of Object.entries(courseCounts)) {
      updatePromises.push(Course.findByIdAndUpdate(id, { studentsEnrolled: count }));
    }

    await Promise.all(updatePromises);

    res.json({ message: 'Database counts synced successfully' });
  } catch (error) {
    console.error('Sync Error:', error);
    res.status(500).json({ message: 'Failed to sync counts' });
  }
};

module.exports = { getDashboardStats, syncDatabaseCounts, getDashboardSummary };
