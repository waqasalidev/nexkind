const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Event = require('../models/Event');
const Scholarship = require('../models/Scholarship');
const Job = require('../models/Job');

const seedData = async () => {
  try {
    // 1. Seed Admin User
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        firstName: 'System',
        lastName: 'Admin',
        email: 'admin@gmail.com',
        password: 'test123',
        role: 'admin',
        status: 'Active'
      });
      console.log('Default Admin Account Created: admin@gmail.com / test123');
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

    // 4. Seed Scholarships
    const scholarshipsCount = await Scholarship.countDocuments();
    if (scholarshipsCount === 0) {
      const dummyScholarships = [
        {
          title: 'Future Leaders Scholarship',
          description: 'Awarding outstanding students who demonstrate leadership potential and academic excellence.',
          provider: 'EduFoundation Global',
          country: 'United States',
          university: 'Harvard University',
          category: 'Merit-based',
          degreeLevel: 'Undergraduate',
          fundingType: 'Partially Funded',
          amount: '$5,000',
          deadline: '2026-06-30',
          eligibilityCriteria: [
            'Must be a full-time student',
            'Minimum GPA of 3.5',
            'Demonstrated community leadership',
          ],
          requiredDocuments: [
            'Academic Transcripts',
            'Letter of Recommendation',
            'Personal Statement',
          ],
          providerLink: 'https://example.com',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          title: 'Women in Technology Grant',
          description: 'Supporting women pursuing degrees in Computer Science, Engineering, or Mathematics.',
          provider: 'TechSisters',
          country: 'United Kingdom',
          university: 'Imperial College London',
          category: 'Diversity',
          degreeLevel: 'Masters',
          fundingType: 'Fully Funded',
          amount: '$3,000',
          deadline: '2026-05-15',
          eligibilityCriteria: [
            'Female-identifying student',
            'Enrolled in STEM program',
          ],
          requiredDocuments: [
             'Proof of enrollment',
             'Essay on "Women in Tech"',
          ],
          providerLink: 'https://example.com',
          image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          title: 'Need-Based Financial Aid',
          description: 'Financial assistance for students from low-income backgrounds to help cover tuition and books.',
          provider: 'Hope Alliance',
          country: 'Canada',
          university: 'University of Toronto',
          category: 'Need-based',
          degreeLevel: 'Undergraduate',
          fundingType: 'Fully Funded',
          amount: 'Full Tuition',
          deadline: '2026-07-01',
          eligibilityCriteria: [
             'Demonstrated financial need',
             'Resident of the country',
          ],
          requiredDocuments: [
             'Tax returns or proof of income',
             'Acceptance letter',
          ],
          providerLink: 'https://example.com',
          image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        }
      ];
      await Scholarship.insertMany(dummyScholarships);
      console.log('Dummy Scholarships Added');
    }

    // 5. Seed Jobs
    const jobsCount = await Job.countDocuments();
    if (jobsCount === 0) {
      const dummyJobs = [
        {
          title: 'Frontend Developer Intern',
          description: 'We are looking for a passionate Frontend Developer Intern to assist in building modern web interfaces.',
          company: 'Google',
          location: 'Remote',
          category: 'Technology',
          workMode: 'Remote',
          type: 'Internship',
          salary: '$20 - $25 / hr',
          experience: 'Entry Level',
          responsibilities: [
            'Assist in developing web pages using React',
            'Fix bugs and improve UI performance',
            'Collaborate with the design team',
          ],
          requirements: [
            'Basic knowledge of HTML, CSS, JavaScript',
            'Familiarity with React is a plus',
            'Eagerness to learn',
          ],
          benefits: [
            'Flexible working hours',
            'Mentorship from senior devs',
          ],
          companyLink: 'https://google.com',
          image: 'https://logo.clearbit.com/google.com',
        },
        {
          title: 'Junior Marketing Associate',
          description: 'Join our dynamic marketing team and help us reach new audiences through social media and content marketing.',
          company: 'Microsoft',
          location: 'New York, NY',
          category: 'Marketing',
          workMode: 'Hybrid',
          type: 'Full-time',
          salary: '$45k - $55k / yr',
          experience: '1-2 Years',
          responsibilities: [
            'Manage social media accounts',
            'Create engaging content',
            'Analyze campaign performance',
          ],
          requirements: [
            'Degree in Marketing or related field',
            'Strong writing skills',
          ],
          benefits: [
            'Health Insurance',
            'Paid Time Off',
          ],
          companyLink: 'https://microsoft.com',
          image: 'https://logo.clearbit.com/microsoft.com',
        },
        {
          title: 'Python Developer',
          description: 'Looking for a skilled Python developer to build scalable backend systems.',
          company: 'Amazon',
          location: 'Austin, TX',
          category: 'Technology',
          workMode: 'On-site',
          type: 'Contract',
          salary: '$60 - $80 / hr',
          experience: 'Mid-Senior Level',
          responsibilities: [
            'Develop API endpoints',
            'Optimize database queries',
          ],
          requirements: [
            'Proficiency in Python and Django/Flask',
            'Experience with SQL databases',
          ],
          benefits: [
             'Remote work options',
          ],
          companyLink: 'https://amazon.com',
          image: 'https://logo.clearbit.com/amazon.com',
        }
      ];
      await Job.insertMany(dummyJobs);
      console.log('Dummy Jobs Added');
    }

  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;
