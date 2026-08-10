import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, BookOpen, CheckCircle, ArrowLeft, PlayCircle, ChevronDown, ChevronUp, Award, Layers, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getCourse, getStudentDashboard } from '../../api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await getCourse(id);
        setCourse(data);
        // Expand first module by default
        if (data.modules && data.modules.length > 0) {
          setExpandedModules({ 0: true });
        }
      } catch (error) {
        console.error("Failed to fetch course details", error);
      } finally {
        setLoading(false);
      }
    };

    const checkStatus = async () => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          const { data } = await getStudentDashboard();
          const enrolled = data.enrolledCourses.some(enr => enr.course && enr.course._id === id);
          if (enrolled) setIsEnrolled(true);
        } catch (error) {
          console.error("Failed to check status", error);
        }
      }
    };

    fetchCourse();
    checkStatus();
  }, [id]);

  const toggleModule = (idx) => {
    setExpandedModules(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (loading) {
    return <LoadingSpinner fullPage={true} text="Loading course syllabus..." />;
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Course Not Found</h2>
        <Link to="/courses" className="btn btn-primary">Back to Courses</Link>
      </div>
    );
  }

  const handleEnroll = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      toast.error('Please login to enroll in this course');
      navigate('/student/login');
      return;
    }
    navigate(`/courses/${id}/enroll`);
  };

  // Count total lessons
  let totalLessonsCount = 0;
  if (course.modules && Array.isArray(course.modules)) {
    course.modules.forEach(mod => {
      if (mod.lessons && Array.isArray(mod.lessons)) {
        totalLessonsCount += mod.lessons.length;
      }
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white relative">
        <div className="absolute inset-0 opacity-25">
          <img src={course.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} alt={course.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/85 to-transparent"></div>

        <div className="container-custom relative z-10 py-12">
          <Link to="/courses" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors font-medium text-sm">
            <ArrowLeft size={16} className="mr-2" /> Back to Course Catalog
          </Link>
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{course.category || 'Education'}</span>
              <span className="bg-indigo-600/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Source: {course.source || 'NexKind Academy'}
              </span>
              {course.certificateEligible !== false && (
                <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                  <Award size={12} /> Certificate Eligible
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{course.title}</h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">{course.shortDescription || course.description}</p>

            <div className="flex flex-wrap gap-6 text-sm mb-8 bg-slate-800/60 backdrop-blur p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-secondary" />
                <span>{course.studentsEnrolled || 0} Students Enrolled</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
                <span>{course.rating || 4.8} Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-secondary" />
                <span>{course.duration || 'Self-paced'}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-secondary" />
                <span>{totalLessonsCount || course.totalLectures || 0} Lessons ({course.modules?.length || 0} Modules)</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/20 border border-primary/40 text-primary overflow-hidden flex items-center justify-center text-lg font-bold">
                  {course.instructor ? course.instructor.charAt(0) : 'I'}
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Instructor</p>
                  <p className="font-bold text-white text-base">{course.instructor || 'NexKind Academy Master'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom -mt-6 relative z-20 grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Course */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Course</h2>
            <p className="text-slate-600 leading-relaxed mb-6 whitespace-pre-line text-base">{course.aboutCourse || course.description}</p>

            {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
              <div className="mb-6 pt-6 border-t border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">What You Will Learn</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <CheckCircle size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-slate-700 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {course.skills && course.skills.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Skills Acquired</h4>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, idx) => (
                    <span key={idx} className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-lg text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Course Outline */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Complete Course Outline</h2>
                <p className="text-xs text-slate-500 mt-1">Explore all modules and structured lessons in detail.</p>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                {course.modules?.length || 0} Modules • {totalLessonsCount} Lessons
              </span>
            </div>

            <div className="space-y-4">
              {course.modules && course.modules.length > 0 ? (
                course.modules.map((module, i) => {
                  const isOpen = !!expandedModules[i];
                  const lessonsList = module.lessons || [];

                  return (
                    <div key={i} className="border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-all">
                      <button
                        onClick={() => toggleModule(i)}
                        className="w-full bg-slate-50/80 hover:bg-slate-100/80 p-4 flex items-center justify-between transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                            {i + 1}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 text-base block">{module.title}</span>
                            {module.description && <span className="text-xs text-slate-500 line-clamp-1">{module.description}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-slate-500 hidden sm:inline">{lessonsList.length} Lessons {module.duration ? `• ${module.duration}` : ''}</span>
                          {isOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-white border-t border-slate-100 divide-y divide-slate-100">
                          {lessonsList.length > 0 ? (
                            lessonsList.map((lesson, lIdx) => (
                              <div key={lIdx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <PlayCircle size={18} className="text-primary shrink-0" />
                                  <div>
                                    <p className="text-sm font-semibold text-slate-800">{lesson.title}</p>
                                    {lesson.description && <p className="text-xs text-slate-500">{lesson.description}</p>}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                  {lesson.practiceQuestions && lesson.practiceQuestions.length > 0 && (
                                    <span className="text-[11px] bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded">Quiz Included</span>
                                  )}
                                  <span className="text-xs text-slate-400">{lesson.duration || '15 mins'}</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="py-3 text-xs text-slate-400 italic">No individual lessons listed inside this module yet.</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-500 italic py-4 text-center">No modules listed yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Sticky Enrollment Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 sticky top-24">
            <div className="aspect-video bg-slate-900 rounded-xl mb-6 overflow-hidden relative group cursor-pointer border border-slate-200">
              <img src={course.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
              <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center group-hover:bg-slate-900/40 transition-colors">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <PlayCircle size={28} className="text-primary ml-1" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">Free</span>
                {course.price > 0 && <span className="text-slate-400 text-sm line-through">${course.price}</span>}
              </div>
              <span className="inline-block text-emerald-600 text-xs font-bold mt-1 bg-emerald-50 px-2 py-0.5 rounded">100% Scholarship Sponsored</span>
            </div>

            {course.isExternal || course.source === 'Microsoft Learn' ? (
              <a
                href={course.enrollLink || course.sourceUrl || 'https://learn.microsoft.com'}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary w-full justify-center mb-4 py-3.5 text-base font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2"
              >
                Start Learning on {course.provider || course.source}
              </a>
            ) : isEnrolled ? (
              <button
                onClick={() => navigate(`/student/courses/${id}/learn`)}
                className="btn btn-success w-full justify-center mb-4 py-3.5 text-base font-bold shadow-lg shadow-emerald-500/20"
              >
                Go to Learning Portal
              </button>
            ) : (
              <button onClick={handleEnroll} className="btn btn-primary w-full justify-center mb-4 py-3.5 text-base font-bold shadow-lg shadow-blue-500/20">
                Enroll Now
              </button>
            )}

            <p className="text-center text-xs text-slate-500 mb-6 font-medium">Full lifetime access to outline & resources</p>

            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Duration</span>
                <span className="font-semibold text-slate-800">{course.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Skill Level</span>
                <span className="font-semibold text-slate-800">{course.skillLevel || 'Beginner'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Language</span>
                <span className="font-semibold text-slate-800">{course.language || 'English'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Certificate</span>
                <span className="font-semibold text-emerald-600">Yes, upon 100% completion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
