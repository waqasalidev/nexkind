const User = require('../models/User');
const Course = require('../models/Course');
const Scholarship = require('../models/Scholarship');
const Job = require('../models/Job');
const Donation = require('../models/Donation');
const Conversation = require('../models/Conversation');

// @desc    Get detailed admin analytics including statistics and charts data
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAdminAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const students = await User.countDocuments({ role: 'student' });
    const totalCourses = await Course.countDocuments();
    const totalScholarships = await Scholarship.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalDonations = await Donation.countDocuments();
    const totalAiConversations = await Conversation.countDocuments();

    // Sum of donations
    const donationStats = await Donation.aggregate([
      { $group: { _id: null, totalRaised: { $sum: "$amount" } } }
    ]);
    const totalRaised = donationStats.length > 0 ? donationStats[0].totalRaised : 0;

    // New registrations in last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const newRegistrations = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // 1. Chart Data: User Growth (Last 6 Months)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const userGrowth = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthIndex = d.getMonth();
      const year = d.getFullYear();
      const startOfMonth = new Date(year, monthIndex, 1);
      const endOfMonth = new Date(year, monthIndex + 1, 0, 23, 59, 59);

      const count = await User.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth }
      });

      userGrowth.push({
        name: monthNames[monthIndex],
        users: count
      });
    }

    // 2. Chart Data: Course Enrollment Trends
    const courses = await Course.find({}).sort({ studentsEnrolled: -1 }).limit(5);
    const courseEnrollmentTrends = courses.map(c => ({
      name: c.title.length > 20 ? c.title.slice(0, 20) + '...' : c.title,
      enrolled: c.studentsEnrolled || 0
    }));

    // 3. Chart Data: Scholarship Applications
    const scholarshipsList = await Scholarship.find({}).sort({ applicantsCount: -1 }).limit(5);
    const scholarshipApplications = scholarshipsList.map(s => ({
      name: s.title.length > 20 ? s.title.slice(0, 20) + '...' : s.title,
      applied: s.applicantsCount || 0
    }));

    // 4. Chart Data: Job Applications
    const jobsList = await Job.find({}).sort({ applicantsCount: -1 }).limit(5);
    const jobApplications = jobsList.map(j => ({
      name: j.title.length > 20 ? j.title.slice(0, 20) + '...' : j.title,
      applicants: j.applicantsCount || 0
    }));

    res.json({
      stats: {
        totalUsers,
        totalTeachers,
        totalCourses,
        totalScholarships,
        totalJobs,
        totalDonations,
        totalRaised,
        totalAiConversations,
        newRegistrations
      },
      charts: {
        userGrowth,
        courseEnrollmentTrends,
        scholarshipApplications,
        jobApplications
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAdminAnalytics };
