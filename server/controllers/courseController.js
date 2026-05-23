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

// @desc    Get all courses with pagination
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const filter = buildCourseQuery(req.query);

    if (req.query.page && req.query.limit) {
        const count = await Course.countDocuments(filter);
        const skip = (page - 1) * limit;
        const courses = await Course.find(filter)
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: -1 });

        return res.json({
          courses,
          page,
          pages: Math.ceil(count / limit),
          total: count
        });
    } else {
        const courses = await Course.find(filter).sort({ createdAt: -1 });
        return res.json(courses);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Course not found' });
  }
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
