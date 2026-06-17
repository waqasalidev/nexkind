const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Event = require('../models/Event');
const Scholarship = require('../models/Scholarship');
const Job = require('../models/Job');
const ChatSettings = require('../models/ChatSettings');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const StudentRecord = require('../models/StudentRecord');
const MentorNote = require('../models/MentorNote');
const Announcement = require('../models/Announcement');
const AIHistory = require('../models/AIHistory');
const scholarshipsData = require('./scholarshipsData');
const jobsData = require('./jobsData');
const { SYSTEM_FALLBACK } = require('../services/aiService');

const seedData = async () => {
  try {
    // 1. Seed Default Accounts (Admin, Teacher, Student)
    const defaultAdmin = await User.findOne({ email: 'admin@nexkind.com' });
    if (!defaultAdmin) {
      await User.create({
        firstName: 'System',
        lastName: 'Admin',
        email: 'admin@nexkind.com',
        password: 'Admin@123',
        role: 'admin',
        status: 'Active'
      });
      console.log('Default Admin Account Created: admin@nexkind.com / Admin@123');
    } else {
      defaultAdmin.password = 'Admin@123';
      await defaultAdmin.save();
      console.log('Default Admin Password Reset: admin@nexkind.com / Admin@123');
    }

    const defaultTeacher = await User.findOne({ email: 'teacher@nexkind.com' });
    let teacherUser;
    if (!defaultTeacher) {
      teacherUser = await User.create({
        firstName: 'Default',
        lastName: 'Teacher',
        email: 'teacher@nexkind.com',
        password: 'Teacher@123',
        role: 'teacher',
        status: 'Active'
      });
      // Create teacher profile
      await Teacher.create({
        user: teacherUser._id,
        department: 'Computer Science',
        specialization: ['MERN Stack', 'AI Engineering']
      });
      console.log('Default Teacher Account Created: teacher@nexkind.com / Teacher@123');
    } else {
      teacherUser = defaultTeacher;
      defaultTeacher.password = 'Teacher@123';
      await defaultTeacher.save();
      console.log('Default Teacher Password Reset: teacher@nexkind.com / Teacher@123');
    }

    const defaultStudent = await User.findOne({ email: 'student@nexkind.com' });
    if (!defaultStudent) {
      const studentUser = await User.create({
        firstName: 'Waqas',
        lastName: 'Ali',
        email: 'student@nexkind.com',
        password: 'Student@123',
        role: 'student',
        status: 'Active'
      });
      // Create student profile
      await Student.create({
        user: studentUser._id,
        educationLevel: 'Undergraduate',
        university: 'NED University',
        skills: ['JavaScript', 'HTML', 'CSS'],
        interests: ['Web Development', 'AI/ML'],
        mentor: teacherUser._id
      });

      // Create a default studentRecord
      await StudentRecord.create({
        student: studentUser._id,
        educationLevel: 'Undergraduate',
        university: 'NED University',
        skills: ['JavaScript', 'HTML', 'CSS'],
        interests: ['Web Development', 'AI/ML']
      });

      // Create a default goal/note for student
      await MentorNote.create({
        student: studentUser._id,
        teacher: teacherUser._id,
        goal: 'Learn MERN Stack',
        progress: 70,
        feedback: 'Focus on backend APIs and deployment.'
      });

      console.log('Default Student Account Created: student@nexkind.com / Student@123');
    } else {
      defaultStudent.password = 'Student@123';
      await defaultStudent.save();
      console.log('Default Student Password Reset: student@nexkind.com / Student@123');
    }

    // 2. Seed Courses
    const coursesCount = await Course.countDocuments();
    if (coursesCount === 0) {
      const dummyCourses = [
        {
          title: 'Full Stack Web Development Bootcamp',
          description: 'Become a full-stack developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!',
          instructor: 'Colt Steele',
          rating: 4.8,
          duration: '12 Weeks',
          totalLectures: 450,
          skillLevel: 'Beginner',
          language: 'English',
          price: 0,
          studentsEnrolled: 1540,
          aboutCourse: 'This comprehensive bootcamp covers everything you need to know to become a professional web developer. From the basics of HTML & CSS to advanced concepts in React and Node.js, this course has it all.',
          whatYouWillLearn: [
            'Build full-stack web applications from scratch',
            'Master HTML5, CSS3, and JavaScript ES6+',
            'Create responsive layouts with Bootstrap and Tailwind',
            'Develop RESTful APIs with Node.js and Express',
          ],
          modules: [
            { title: 'Introduction to HTML', description: 'Basic tags, attributes, and semantic HTML', duration: '2 hours' },
            { title: 'CSS Styling', description: 'Selectors, Box Model, and Flexbox', duration: '3 hours' },
            { title: 'JavaScript Basics', description: 'Variables, loops, functions, and DOM manipulation', duration: '5 hours' },
          ],
          category: 'Programming',
          platform: 'NexKind Academy',
          image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          title: 'Data Science with Python',
          description: 'Master Data Science concepts using Python. Learn libraries like Pandas, NumPy, Matplotlib, and Scikit-learn.',
          instructor: 'Jose Portilla',
          rating: 4.7,
          duration: '10 Weeks',
          totalLectures: 300,
          skillLevel: 'Intermediate',
          language: 'English',
          price: 0,
          studentsEnrolled: 980,
          aboutCourse: 'Dive deep into the world of Data Science. This course will teach you how to analyze data, create beautiful visualizations, and build powerful machine learning models using Python.',
          whatYouWillLearn: [
            'Analyze data using Pandas and NumPy',
            'Create impressive data visualizations with Matplotlib',
            'Implement Machine Learning algorithms',
            'Scrape data from web pages',
          ],
          modules: [
            { title: 'Python Crash Course', description: 'Python basics for data science', duration: '4 hours' },
            { title: 'Data Analysis with Pandas', description: 'Working with DataFrames and Series', duration: '6 hours' },
          ],
          category: 'Data Science',
          platform: 'NexKind Academy',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          title: 'UX/UI Design Masterclass',
          description: 'Learn to design beautiful user interfaces and user experiences that users love. Covers Figma, Adobe XD, and design principles.',
          instructor: 'Gary Simon',
          rating: 4.9,
          duration: '8 Weeks',
          totalLectures: 200,
          skillLevel: 'Beginner',
          language: 'English',
          price: 0,
          studentsEnrolled: 2100,
          aboutCourse: 'Design is not just about making things look good. It is about solving problems. In this course, you will learn the complete design process from research to prototyping.',
          whatYouWillLearn: [
             'Master Figma for UI Design',
             'Understand UX Research methods',
             'Create interactive prototypes',
             'Build a complete design portfolio',
          ],
          modules: [
            { title: 'Design Theory', description: 'Color, Typography, and Layout', duration: '3 hours' },
            { title: 'Figma Basics', description: 'Tools, frames, and components', duration: '4 hours' },
          ],
          category: 'Design',
          platform: 'NexKind Academy',
          image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          title: 'Digital Marketing Fundamentals',
          description: 'Learn the core strategies of digital marketing including SEO, Social Media, Email Marketing, and PPC.',
          instructor: 'Daragh Walsh',
          rating: 4.6,
          duration: '6 Weeks',
          totalLectures: 150,
          skillLevel: 'Beginner',
          language: 'English',
          price: 0,
          studentsEnrolled: 3500,
          aboutCourse: 'Grow your business or career with digital marketing. This course provides a practical guide to the most effective digital marketing channels available today.',
          whatYouWillLearn: [
            'Define your target audience and buyer persona',
            'Conduct keyword research for SEO',
            'Run effective Facebook and Instagram ads',
            'Track performance with Google Analytics',
          ],
          modules: [
            { title: 'Market Research', description: 'Identifying opportunities', duration: '2 hours' },
            { title: 'SEO Basics', description: 'On-page and Off-page optimization', duration: '5 hours' },
          ],
          category: 'Business',
          platform: 'NexKind Academy',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        }
      ];
      await Course.insertMany(dummyCourses);
      console.log('Dummy Courses Added');
    }

    // 3. Seed Events
    const eventsCount = await Event.countDocuments();
    if (eventsCount === 0) {
      const dummyEvents = [
        {
          title: 'Global Tech Summit 2026',
          description: 'Join thousands of tech enthusiasts for the biggest tech conference of the year. Keynote speakers from Google, Apple, and Microsoft.',
          date: 'March 15, 2026',
          time: '09:00 AM - 05:00 PM',
          location: 'Grand Convention Center, NY',
          organizer: 'TechWorld Inc.',
          category: 'Conference',
          image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          agenda: [
            { time: '09:00 AM', activity: 'Opening Ceremony' },
            { time: '10:30 AM', activity: 'Keynote Speech: The Future of AI' },
            { time: '01:00 PM', activity: 'Networking Lunch' },
          ],
          speakers: [
            { name: 'Sundar Pichai', role: 'CEO', institution: 'Google', image: 'https://logo.clearbit.com/google.com' },
            { name: 'Satya Nadella', role: 'CEO', institution: 'Microsoft', image: 'https://logo.clearbit.com/microsoft.com' },
          ]
        },
        {
          title: 'Startup Career Fair',
          description: 'Connect with over 50 fast-growing startups looking for talent. Bring your resume and get hired!',
          date: 'April 22, 2026',
          time: '10:00 AM - 04:00 PM',
          location: 'Innovation Hub, London',
          organizer: 'StartupGrind',
          category: 'Career Fair',
          image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          agenda: [
            { time: '10:00 AM', activity: 'Registration Opens' },
            { time: '11:00 AM', activity: 'Panel: How to Ace Your Interview' },
          ],
          speakers: []
        },
        {
          title: 'Charity Coding Marathon',
          description: 'Code for a cause! Participate in our 24-hour hackathon to build solutions for local non-profits.',
          date: 'May 05, 2026',
          time: '12:00 PM - 12:00 PM',
          location: 'Community Center, Toronto',
          organizer: 'CodeForGood',
          category: 'Hackathon',
          image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          agenda: [
            { time: '12:00 PM', activity: 'Kickoff & Team Formation' },
            { time: '06:00 PM', activity: 'Mentorship Sessions' },
          ],
          speakers: []
        }
      ];
      await Event.insertMany(dummyEvents);
       console.log('Dummy Events Added');
    }

    // 4. Seed Scholarships (ensure at least 50 entries)
    const scholarshipsCount = await Scholarship.countDocuments();
    if (scholarshipsCount < 50) {
      await Scholarship.deleteMany({});
      await Scholarship.insertMany(scholarshipsData);
      console.log('Seeded 50+ Scholarships');
    }

    // 5. Seed Jobs (ensure at least 50 entries)
    const jobsCount = await Job.countDocuments();
    if (jobsCount < 50) {
      await Job.deleteMany({});
      await Job.insertMany(jobsData);
      console.log('Seeded 50+ Jobs');
    }

    // 6. Seed/Update ChatSettings
    let settings = await ChatSettings.findOne();
    if (!settings) {
      await ChatSettings.create({
        systemPrompt: SYSTEM_FALLBACK,
        isEnabled: true,
        modelProvider: 'auto'
      });
      console.log('Default ChatSettings Created');
    } else {
      settings.systemPrompt = SYSTEM_FALLBACK;
      settings.isEnabled = true;
      await settings.save();
      console.log('ChatSettings System Prompt Updated');
    }

  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;
