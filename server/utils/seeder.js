const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Event = require('../models/Event');
const Scholarship = require('../models/Scholarship');
const Job = require('../models/Job');
const Donation = require('../models/Donation');
const ChatSettings = require('../models/ChatSettings');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const StudentRecord = require('../models/StudentRecord');
const MentorNote = require('../models/MentorNote');
const Announcement = require('../models/Announcement');
const AIHistory = require('../models/AIHistory');
const scholarshipsData = require('./scholarshipsData');
const jobsData = require('./jobsData');
const { getEventsData } = require('./eventsData');
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
      await Student.create({
        user: studentUser._id,
        educationLevel: 'Undergraduate',
        university: 'NED University',
        skills: ['JavaScript', 'HTML', 'CSS', 'React'],
        interests: ['Web Development', 'AI/ML'],
        mentor: teacherUser._id
      });
      await StudentRecord.create({
        student: studentUser._id,
        educationLevel: 'Undergraduate',
        university: 'NED University',
        skills: ['JavaScript', 'HTML', 'CSS', 'React'],
        interests: ['Web Development', 'AI/ML']
      });
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
    }

    // 2. Seed Rich Dynamic Courses with Syllabus & Lessons
    const coursesCount = await Course.countDocuments();
    if (coursesCount === 0) {
      const dummyCourses = [
        {
          title: 'Full Stack Web Development Bootcamp',
          shortDescription: 'Master modern full-stack web development with React, Node.js, Express, and MongoDB.',
          description: 'Become a job-ready full-stack developer with hands-on projects, REST API design, state management, and production cloud deployment.',
          instructor: 'Colt Steele',
          platform: 'NexKind Academy',
          rating: 4.9,
          duration: '12 Weeks',
          totalLectures: 36,
          skillLevel: 'Beginner',
          language: 'English',
          price: 0,
          studentsEnrolled: 1540,
          category: 'Programming',
          aboutCourse: 'This comprehensive bootcamp covers full-stack web engineering from basic HTML5/CSS3 to advanced React pattern architecture, Node.js REST services, JWT security, database indexing, and automated deployment pipelines.',
          whatYouWillLearn: [
            'Build production full-stack web applications from scratch',
            'Master JavaScript ES6+, React Hooks, and Context API',
            'Develop secure RESTful microservices with Express and MongoDB',
            'Implement JWT Authentication, Role Management, and Web Security',
            'Deploy applications smoothly using Docker, Vercel, and Cloud Hosting'
          ],
          skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'TailwindCSS'],
          prerequisites: ['Basic computer usage', 'High enthusiasm to learn coding'],
          certificateEligible: true,
          status: 'published',
          image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          modules: [
            {
              title: 'Module 1 — Web Fundamentals & Modern HTML5/CSS3',
              description: 'Semantic markup, modern layout design, responsive flexbox and CSS grid.',
              duration: '2 Weeks',
              lessons: [
                {
                  title: 'Lesson 1.1: Semantic HTML & Document Architecture',
                  description: 'Learn the proper structure of web documents, ARIA roles, and accessible tags.',
                  duration: '25 mins',
                  videoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc',
                  preparationMaterial: 'Review HTML5 semantic elements guide and clean coding guidelines.',
                  resources: [{ title: 'MDN HTML Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' }],
                  practiceQuestions: [
                    {
                      question: 'Which HTML tag should be used for the main navigation menu?',
                      options: ['<menu>', '<nav>', '<header>', '<navbar>'],
                      correctAnswer: 1,
                      explanation: '<nav> represents a section of a page whose purpose is to provide navigation links.'
                    }
                  ],
                  quiz: [
                    {
                      question: 'What is the purpose of the alt attribute in <img> tags?',
                      options: ['To style the image', 'To provide alternative text for screen readers & broken links', 'To set image width', 'To link to another page'],
                      correctAnswer: 1
                    }
                  ]
                },
                {
                  title: 'Lesson 1.2: Modern Flexbox & CSS Grid Masterclass',
                  description: 'Build flexible dynamic card layouts and complex dashboard grids.',
                  duration: '35 mins',
                  videoUrl: 'https://www.youtube.com/embed/1Rs2ND1ryYc',
                  preparationMaterial: 'Download layout starter files and practice CSS Flexbox properties.',
                  resources: [{ title: 'CSS Tricks Flexbox Guide', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }],
                  practiceQuestions: [
                    {
                      question: 'Which property aligns flex items along the cross axis?',
                      options: ['justify-content', 'align-items', 'flex-direction', 'grid-gap'],
                      correctAnswer: 1,
                      explanation: 'align-items defines the default behavior for how flex items are laid out along the cross axis.'
                    }
                  ]
                }
              ]
            },
            {
              title: 'Module 2 — JavaScript ES6+ Core & Async Programming',
              description: 'Promises, Async/Await, Closures, Prototypes, and DOM manipulation.',
              duration: '3 Weeks',
              lessons: [
                {
                  title: 'Lesson 2.1: JavaScript Async/Await & Fetch API',
                  description: 'Handle asynchronous network requests cleanly without callback hell.',
                  duration: '30 mins',
                  videoUrl: 'https://www.youtube.com/embed/V_Kr9OSfDeU',
                  preparationMaterial: 'Understand JS Event Loop, Microtask Queue, and Call Stack execution.',
                  resources: [{ title: 'JS Async/Await Docs', url: 'https://javascript.info/async-await' }],
                  practiceQuestions: [
                    {
                      question: 'What does async function return implicitly?',
                      options: ['A boolean', 'A Promise', 'An Array', 'Undefined'],
                      correctAnswer: 1,
                      explanation: 'An async function always returns a Promise resolved with its return value.'
                    }
                  ]
                }
              ]
            },
            {
              title: 'Module 3 — React Component Architecture & State Management',
              description: 'Functional components, custom hooks, context API, and routing.',
              duration: '4 Weeks',
              lessons: [
                {
                  title: 'Lesson 3.1: React 19 Hooks & State Flow',
                  description: 'Manage component lifecycle, state updates, and side effects using useState & useEffect.',
                  duration: '40 mins',
                  videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
                  preparationMaterial: 'Review immutable state update patterns in React.',
                  resources: [{ title: 'React Official Documentation', url: 'https://react.dev' }],
                  practiceQuestions: [
                    {
                      question: 'When does useEffect dependency array [] trigger execution?',
                      options: ['On every render', 'Only once when the component mounts', 'Never', 'On component unmount only'],
                      correctAnswer: 1,
                      explanation: 'An empty dependency array ensures the effect runs only once after initial mount.'
                    }
                  ]
                }
              ]
            },
            {
              title: 'Module 4 — Backend Node.js & Database Persistence',
              description: 'Express REST architecture, Mongoose schemas, JWT Auth, and Deployment.',
              duration: '3 Weeks',
              lessons: [
                {
                  title: 'Lesson 4.1: Building Secure REST APIs with Express & JWT',
                  description: 'Design robust JSON endpoints with middleware authorization and encrypted passwords.',
                  duration: '45 mins',
                  videoUrl: 'https://www.youtube.com/embed/7H_b1W4Zk40',
                  preparationMaterial: 'Install Postman or HTTP Client for API testing.',
                  resources: [{ title: 'Express API Guide', url: 'https://expressjs.com' }],
                  practiceQuestions: [
                    {
                      question: 'Which HTTP header is standard for sending JWT bearer tokens?',
                      options: ['Cookie', 'Authorization', 'X-Auth-Key', 'Content-Type'],
                      correctAnswer: 1,
                      explanation: 'Authorization header with "Bearer <token>" is standard for API JWT transmission.'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          title: 'AI & Data Science Engineering with Python',
          shortDescription: 'Master Data Analysis, Machine Learning algorithms, and Neural Networks using Python.',
          description: 'Comprehensive data science pipeline: Data Wrangling with Pandas, Visualization with Seaborn, ML Models with Scikit-Learn, and Deep Learning basics.',
          instructor: 'Jose Portilla',
          platform: 'NexKind Academy',
          rating: 4.8,
          duration: '10 Weeks',
          totalLectures: 28,
          skillLevel: 'Intermediate',
          language: 'English',
          price: 0,
          studentsEnrolled: 980,
          category: 'Data Science',
          aboutCourse: 'Learn how data scientists uncover insights from massive datasets and build predictive machine learning models.',
          whatYouWillLearn: [
            'Wrangle and clean complex tabular data with Pandas & NumPy',
            'Perform Exploratory Data Analysis (EDA) and data visualization',
            'Train Classification, Regression, and Clustering ML models',
            'Evaluate models using Precision, Recall, ROC-AUC curves',
            'Deploy ML models as web REST services using FastAPI'
          ],
          skills: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib', 'Machine Learning', 'Data Cleaning'],
          prerequisites: ['Basic Python programming knowledge'],
          certificateEligible: true,
          status: 'published',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          modules: [
            {
              title: 'Module 1 — Python Data Analysis Foundations',
              description: 'NumPy arrays, Pandas DataFrames, and statistical data cleaning.',
              duration: '3 Weeks',
              lessons: [
                {
                  title: 'Lesson 1.1: Pandas DataFrame Operations & Data Cleaning',
                  description: 'Handle missing values, filter datasets, and perform groupby aggregations.',
                  duration: '30 mins',
                  videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg',
                  preparationMaterial: 'Setup Jupyter Notebook or Google Colab environment.',
                  resources: [{ title: 'Pandas Documentation', url: 'https://pandas.pydata.org' }],
                  practiceQuestions: [
                    {
                      question: 'Which Pandas function is used to read CSV files?',
                      options: ['pd.open_csv()', 'pd.read_csv()', 'pd.parse_csv()', 'pd.load()'],
                      correctAnswer: 1,
                      explanation: 'pd.read_csv() imports comma-separated values into a DataFrame.'
                    }
                  ]
                }
              ]
            },
            {
              title: 'Module 2 — Machine Learning & Supervised Models',
              description: 'Linear Regression, Decision Trees, Random Forests, and SVMs.',
              duration: '4 Weeks',
              lessons: [
                {
                  title: 'Lesson 2.1: Scikit-Learn Model Training & Train/Test Split',
                  description: 'Train regression and classification algorithms and prevent overfitting.',
                  duration: '35 mins',
                  videoUrl: 'https://www.youtube.com/embed/pqNCD_5r0IU',
                  preparationMaterial: 'Review basic linear algebra and statistical regression formulas.',
                  resources: [{ title: 'Scikit-Learn User Guide', url: 'https://scikit-learn.org' }],
                  practiceQuestions: [
                    {
                      question: 'Why do we split datasets into training and testing sets?',
                      options: ['To speed up computation', 'To evaluate model generalization on unseen data', 'To make data larger', 'It is optional'],
                      correctAnswer: 1,
                      explanation: 'Train/test split ensures we can benchmark performance on data the model has not seen during training.'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          title: 'UI/UX Design Systems & Figma Masterclass',
          shortDescription: 'Design beautiful, accessible user interfaces and interactive prototypes in Figma.',
          description: 'Learn end-to-end digital product design: user research, wireframing, component design systems, micro-interactions, and design-to-code handoff.',
          instructor: 'Gary Simon',
          platform: 'NexKind Academy',
          rating: 4.9,
          duration: '8 Weeks',
          totalLectures: 24,
          skillLevel: 'Beginner',
          language: 'English',
          price: 0,
          studentsEnrolled: 2100,
          category: 'Design',
          aboutCourse: 'Master Figma visual design rules, typography hierarchy, responsive layout auto-layout grids, design tokens, and user testing methodologies.',
          whatYouWillLearn: [
            'Create interactive high-fidelity wireframes and design systems',
            'Master Figma Auto Layout 5.0, Variants, and Design Tokens',
            'Conduct UX user testing and empathy mapping',
            'Design accessible interfaces adhering to WCAG standards'
          ],
          skills: ['Figma', 'UI Design', 'UX Research', 'Wireframing', 'Prototyping', 'Design Systems'],
          prerequisites: ['No prior experience required'],
          certificateEligible: true,
          status: 'published',
          image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          modules: [
            {
              title: 'Module 1 — UI Fundamentals & Typography Hierarchy',
              description: 'Color theory, spatial grids, contrast, and font selection rules.',
              duration: '2 Weeks',
              lessons: [
                {
                  title: 'Lesson 1.1: Figma Auto Layout & Component Variants',
                  description: 'Build flexible UI elements that adjust automatically to dynamic text content.',
                  duration: '28 mins',
                  videoUrl: 'https://www.youtube.com/embed/FTFaQWZBqQ8',
                  preparationMaterial: 'Install Figma desktop app or web editor.',
                  resources: [{ title: 'Figma Auto-Layout Guide', url: 'https://help.figma.com' }],
                  practiceQuestions: [
                    {
                      question: 'What is the primary benefit of Auto Layout in Figma?',
                      options: ['Renders code automatically', 'Creates responsive containers that grow with content', 'Compresses images', 'Changes colors randomly'],
                      correctAnswer: 1,
                      explanation: 'Auto Layout turns Figma frames into dynamic flex containers that respond to content padding.'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ];
      await Course.insertMany(dummyCourses);
      console.log('Dynamic Courses with Full Modules & Lessons Seeded');
    }

    // 3. Seed Events (Upcoming & Past with Pakistan, India, Bangladesh, and Global coverage)
    const eventsCount = await Event.countDocuments();
    if (eventsCount < 10) {
      await Event.deleteMany({});
      const eventsList = getEventsData().map(ev => {
        const { _id, ...rest } = ev;
        return rest;
      });
      await Event.insertMany(eventsList);
      console.log('Upcoming Events Seeded (Pakistan, India, Bangladesh, Global)');
    }

    // 4. Seed Scholarships (ensure 50+ entries)
    const scholarshipsCount = await Scholarship.countDocuments();
    if (scholarshipsCount < 50) {
      await Scholarship.deleteMany({});
      await Scholarship.insertMany(scholarshipsData);
      console.log('Seeded 50+ Scholarships');
    }

    // 5. Seed Jobs (ensure 50+ entries)
    const jobsCount = await Job.countDocuments();
    if (jobsCount < 50) {
      await Job.deleteMany({});
      // Add active deadlines and skills to seeded jobs
      const enrichedJobs = jobsData.map((job, idx) => ({
        ...job,
        skills: job.requirements ? job.requirements.slice(0, 4) : ['Communication', 'Problem Solving'],
        deadline: new Date(Date.now() + (idx % 2 === 0 ? 30 : 60) * 24 * 60 * 60 * 1000), // Active deadlines 30-60 days in future
        status: 'active'
      }));
      await Job.insertMany(enrichedJobs);
      console.log('Seeded 50+ Jobs with Deadlines and Skills');
    }

    // 6. Seed Sample Donations across 5 Payment Providers
    const donationsCount = await Donation.countDocuments();
    if (donationsCount < 5) {
      await Donation.deleteMany({});
      const dummyDonations = [
        {
          donorName: 'Alexander Hamilton',
          email: 'alexander@example.com',
          amount: 250,
          currency: 'USD',
          message: 'Happy to support underprivileged students in technology!',
          paymentProvider: 'Stripe',
          transactionId: 'txn_1001_stripe_demo',
          status: 'Completed',
        },
        {
          donorName: 'Sophia Lin',
          email: 'sophia.lin@techcorp.org',
          amount: 500,
          currency: 'USD',
          message: 'Sponsoring coding scholarships for women in engineering.',
          paymentProvider: 'PayPal',
          transactionId: 'paypal_ord_998120_demo',
          status: 'Completed',
        },
        {
          donorName: 'Tariq Al-Mansoor',
          email: 'tariq.mansoor@gmail.com',
          amount: 1000,
          currency: 'USD',
          message: 'Bank wire transfer for Asian student laptops fund.',
          paymentProvider: 'Bank Transfer',
          bankReference: 'HBL-PAK-984120',
          transactionId: 'bt_HBL-PAK-984120',
          status: 'Verification Required',
        },
        {
          donorName: 'Elena Rostova',
          email: 'elena.rostova@global-aid.org',
          amount: 750,
          currency: 'USD',
          message: 'Payoneer transfer for scholarship database maintenance.',
          paymentProvider: 'Payoneer',
          payoneerReference: 'PAY-REF-741952',
          transactionId: 'payoneer_PAY-REF-741952',
          status: 'Verification Required',
        },
        {
          donorName: 'David K. Miller',
          email: 'dmiller@gmail.com',
          amount: 100,
          currency: 'USD',
          message: 'Google Pay quick donation!',
          paymentProvider: 'Google Pay',
          transactionId: 'gpay_txn_884120_demo',
          status: 'Completed',
        }
      ];
      await Donation.insertMany(dummyDonations);
      console.log('Sample Donations across 5 Payment Providers Seeded');
    }

    // 7. Seed/Update ChatSettings
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
    }

  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;
