import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, BookOpen, CheckCircle, ArrowLeft, PlayCircle } from 'lucide-react';
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

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await getCourse(id);
        setCourse(data);
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

  if (loading) {
    return <LoadingSpinner fullPage={true} text="Loading course details..." />;
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
      return;
    }
    navigate(`/courses/${id}/enroll`);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white relative">
        <div className="absolute inset-0 opacity-30">
          <img src={course.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} alt={course.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>

        <div className="container-custom relative z-10 py-12">
          <Link to="/courses" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={18} className="mr-2" /> Back to Courses
          </Link>
          <div className="max-w-3xl">
            <span className="bg-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wide mb-4 inline-block">{course.category || 'Education'}</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl text-slate-300 mb-8">{course.description}</p>

            <div className="flex flex-wrap gap-6 text-sm mb-8">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-secondary" />
                <span>{course.studentsEnrolled || 0} Enrolled</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="text-yellow-500" />
                <span>{course.rating || 4.5} Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-secondary" />
                <span>{course.duration || 'Self-paced'}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-secondary" />
                <span>{course.totalLectures || course.modules?.length || 0} Lectures</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center text-lg font-bold">
                  {course.instructor ? course.instructor.charAt(0) : 'I'}
                </div>
                <div>
                  <p className="text-xs text-slate-400">Instructor</p>
                  <p className="font-semibold">{course.instructor || 'Academy Instructor'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom -mt-5 relative z-20 grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Course</h2>
            <p className="text-slate-600 leading-relaxed mb-6 whitespace-pre-line">{course.aboutCourse || course.description}</p>

            {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-slate-900 mb-4">What you'll learn</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-green-500 mt-1 shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Content</h2>
            <div className="space-y-3">
              {course.modules && course.modules.length > 0 ? (
                course.modules.map((module, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-4 flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <PlayCircle size={20} className="text-primary" />
                      <div>
                        <span className="font-medium text-slate-800 block">Module {i + 1}: {module.title}</span>
                        <span className="text-xs text-slate-500">{module.description}</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{module.duration || '20 min'}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No modules listed yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 sticky top-24">
            <div className="aspect-video bg-slate-100 rounded-lg mb-6 overflow-hidden relative group cursor-pointer">
              <img src={course.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <PlayCircle size={24} className="text-primary ml-1" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-slate-900">Free</span>
              {course.price > 0 && <span className="text-slate-400 text-sm line-through ml-2">${course.price}</span>}
              <span className="block text-green-600 text-xs font-semibold mt-1">100% Scholarship Applied</span>
            </div>

            {isEnrolled ? (
              <button
                onClick={() => navigate(`/student/courses/${id}/learn`)}
                className="btn btn-success w-full justify-center mb-4 py-3 text-lg shadow-lg shadow-green-500/20"
              >
                Go to Course
              </button>
            ) : (
              <button onClick={handleEnroll} className="btn btn-primary w-full justify-center mb-4 py-3 text-lg shadow-lg shadow-blue-500/20">
                Enroll Now
              </button>
            )}

            <p className="text-center text-xs text-slate-400 mb-4">Guarantee certification upon completion</p>

            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Duration</span>
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Skill Level</span>
                <span className="font-medium">{course.skillLevel || 'All Levels'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Language</span>
                <span className="font-medium">{course.language || 'English'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
