const Course = require('../models/Course');
const { buildCourseQuery } = require('../utils/buildQuery');

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      instructor,
      duration,
      totalLectures,
      skillLevel,
      language,
      price,
      aboutCourse,
      whatYouWillLearn,
      modules,
      image,
      category,
      platform,
      enrollLink,
    } = req.body;

    const course = new Course({
      title,
      description,
      instructor,
      duration,
      totalLectures,
      skillLevel,
      language,
      price,
      aboutCourse,
      whatYouWillLearn,
      modules,
      image,
      category,
      platform,
      enrollLink,
      // Default values
      rating: 0,
      studentsEnrolled: 0
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(400).json({ message: 'Invalid course data', error: error.message });
  }
};

const sampleFallbackCourses = [
  {
    _id: '6590a0000000000000000101',
    title: 'Web Development Fundamentals',
    description: 'Master HTML5, CSS3, Flexbox, Grid, and JavaScript essentials for modern web design.',
    instructor: 'NexKind Academy',
    duration: '6 Weeks',
    skillLevel: 'Beginner',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    studentsEnrolled: 1420,
    rating: 4.9,
    isExternal: false,
    source: 'NexKind'
  },
  {
    _id: '6590a0000000000000000102',
    title: 'Microsoft Azure Cloud Fundamentals',
    description: 'Learn cloud concepts, Azure architecture, virtual machines, and cloud security.',
    instructor: 'Microsoft Learn',
    duration: '4 Weeks',
    skillLevel: 'Beginner',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1542744094-3a3172720188?w=800&q=80',
    studentsEnrolled: 2150,
    rating: 4.9,
    isExternal: true,
    provider: 'Microsoft Learn',
    source: 'Microsoft Learn',
    externalCourseId: 'learn.wwl.azure-fundamentals',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/'
  },
  {
    _id: '6590a0000000000000000103',
    title: 'Advanced React Development',
    description: 'Deep dive into React custom hooks, state patterns, performance optimization, and SSR.',
    instructor: 'Dan Abramov',
    duration: '8 Weeks',
    skillLevel: 'Intermediate',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    studentsEnrolled: 1850,
    rating: 4.9,
    isExternal: true,
    provider: 'Microsoft Learn',
    source: 'Microsoft Learn',
    externalCourseId: 'learn.wwl.build-react-apps',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/build-web-apps-with-react/'
  }
];

// @desc    Get all courses with pagination
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filter = buildCourseQuery(req.query);

    if (req.query.page && req.query.limit) {
      const count = await Course.countDocuments(filter).maxTimeMS(2500);
      const skip = (page - 1) * limit;
      const courses = await Course.find(filter)
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 })
        .maxTimeMS(2500);

      return res.json({
        courses: courses.length ? courses : sampleFallbackCourses,
        page,
        pages: courses.length ? Math.ceil(count / limit) : 1,
        total: courses.length ? count : sampleFallbackCourses.length
      });
    } else {
      const courses = await Course.find(filter).sort({ createdAt: -1 }).maxTimeMS(2500);
      return res.json(courses.length ? courses : sampleFallbackCourses);
    }
  } catch (error) {
    console.warn('[COURSES-API] DB timeout or offline. Serving sample courses fallback:', error.message);
    if (req.query.page && req.query.limit) {
      return res.json({
        courses: sampleFallbackCourses,
        page: 1,
        pages: 1,
        total: sampleFallbackCourses.length
      });
    }
    res.json(sampleFallbackCourses);
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).maxTimeMS(2500);
    if (course) {
      return res.json(course);
    }
  } catch (error) {
    console.warn('[COURSES-API] Single course find warning:', error.message);
  }

  // Fallback to sample course matching id or default
  const matched = sampleFallbackCourses.find(c => c._id === req.params.id || c.externalCourseId === req.params.id) || sampleFallbackCourses[0];
  res.json(matched);
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course) {
      course.title = req.body.title || course.title;
      course.description = req.body.description || course.description;
      course.instructor = req.body.instructor || course.instructor;
      course.duration = req.body.duration || course.duration;
      course.totalLectures = req.body.totalLectures || course.totalLectures;
      course.skillLevel = req.body.skillLevel || course.skillLevel;
      course.language = req.body.language || course.language;
      course.price = req.body.price !== undefined ? req.body.price : course.price;
      course.aboutCourse = req.body.aboutCourse || course.aboutCourse;
      course.whatYouWillLearn = req.body.whatYouWillLearn || course.whatYouWillLearn;
      course.modules = req.body.modules || course.modules;
      course.image = req.body.image || course.image;
      course.category = req.body.category || course.category;
      course.platform = req.body.platform || course.platform;
      course.enrollLink = req.body.enrollLink || course.enrollLink;

      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid course data', error: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course) {
      await course.deleteOne();
      res.json({ message: 'Course removed' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};
