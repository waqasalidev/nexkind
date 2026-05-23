const Course = require('../models/Course');
const Event = require('../models/Event');
const Scholarship = require('../models/Scholarship');
const Job = require('../models/Job');
const User = require('../models/User');
const Donation = require('../models/Donation');

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

module.exports = { getDashboardStats, syncDatabaseCounts };
