import { Search, BookOpen, Clock, User, Star, Award, Sparkles } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { getCourses } from '../../api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [skillLevel, setSkillLevel] = useState('');

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      if (skillLevel) params.skillLevel = skillLevel;
      const { data } = await getCourses(params);
      setCourses(Array.isArray(data) ? data : data.courses || []);
    } catch (error) {
      console.error('Failed to fetch courses', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchCourses, 300);
    return () => clearTimeout(timer);
  }, [search, category, skillLevel]);

  const categories = useMemo(() => {
    const cats = [...new Set(courses.map((c) => c.category).filter(Boolean))];
    return cats.length ? cats : ['Programming', 'Data Science', 'Design', 'Business'];
  }, [courses]);

  const fadeInUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

  return (
    <div className="min-h-[80vh] bg-slate-50">
      <div className="bg-primary py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5 }}
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
            alt="Students learning"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-primary/90" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/30">
              <Sparkles size={14} /> Interactive Learning Platform
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Our Dynamic Course Syllabus</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Master job-ready technical skills with structured modules, hands-on practice, quizzes, and certificates.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="py-12 container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-white p-4 rounded-xl shadow-lg border border-slate-100 -mt-20 relative z-20"
        >
          <div className="relative md:col-span-1">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What do you want to learn?"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-primary bg-white w-full text-sm font-medium min-h-[44px]"
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology & Software</option>
            <option value="Design">Design & Media</option>
            <option value="Business & Career">Business & Career</option>
            <option value="Academic & General">Academic & General</option>
            {categories.filter(c => !['Technology', 'Design', 'Business & Career', 'Academic & General'].includes(c)).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className="flex bg-slate-100 p-1 rounded-lg gap-1">
            {['', 'Beginner', 'Intermediate', 'Expert'].map((lvl) => (
              <button
                key={lvl || 'All'}
                type="button"
                onClick={() => setSkillLevel(lvl)}
                className={`flex-1 py-2 px-2 rounded text-xs font-bold transition-all min-h-[38px] ${
                  skillLevel === lvl ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lvl || 'All Levels'}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <LoadingSpinner text="Loading courses..." />
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <BookOpen className="text-slate-400 mx-auto mb-4" size={40} />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Courses Found</h2>
            <p className="text-slate-500">Try a different search or filter criteria.</p>
          </div>
        ) : (
          <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {courses.map((course) => (
              <motion.div
                key={course._id}
                variants={fadeInUp}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'; }}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase shadow-sm">
                    {course.category || 'Education'}
                  </div>
                  {course.certificateEligible !== false && (
                    <div className="absolute top-4 right-4 bg-emerald-600/90 text-white backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                      <Award size={12} /> Certificate
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-3 line-clamp-2">{course.shortDescription || course.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 flex-wrap">
                    <span className="flex items-center gap-1 font-medium"><User size={14} className="text-primary" /> {course.instructor}</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-primary" /> {course.duration}</span>
                    <span className="flex items-center gap-1 text-yellow-600 font-bold"><Star size={14} className="fill-yellow-400 text-yellow-400" /> {course.rating || 4.8}</span>
                  </div>

                  {course.skills && course.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {course.skills.slice(0, 3).map((skill, sIdx) => (
                        <span key={sIdx} className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2 py-0.5 rounded-md">
                          {skill}
                        </span>
                      ))}
                      {course.skills.length > 3 && (
                        <span className="text-[11px] text-slate-400 font-medium py-0.5">+{course.skills.length - 3} more</span>
                      )}
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">{course.skillLevel || 'Beginner'}</span>
                    <div className="flex gap-2">
                      <Link to={`/courses/${course._id}`} className="btn btn-secondary text-sm py-2 px-4">View Syllabus</Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;
