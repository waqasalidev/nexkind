import { useParams, useNavigate } from 'react';
import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, PlayCircle, BookOpen, Download, HelpCircle, Menu, X, Award, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { getStudentCourse, updateCourseProgress } from '../../api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const DEFAULT_VIDEOS = [
  "bJzb-RuUcMU", // React in 100 Seconds
  "kUMe1FH4CHE", // HTML in 100 Seconds
  "hdI2bqOjy3c", // JavaScript in 100 Seconds
  "zOjov-2OZ0E", // Python in 100 Seconds
  "7H_b1W4Zk40", // Node API in 100 Seconds
];

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null); // { course, progress, completedLessons, currentLessonId, certificateIssued }
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState({ 0: true });
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const { data } = await getStudentCourse(id);
        setCourseData(data);

        // Auto expand module containing current active lesson
        if (data.course && data.course.modules && data.course.modules.length > 0) {
          if (data.currentLessonId) {
            data.course.modules.forEach((mod, mIdx) => {
              if (mod.lessons) {
                const lIdx = mod.lessons.findIndex(l => l._id && l._id.toString() === data.currentLessonId);
                if (lIdx !== -1) {
                  setActiveModuleIdx(mIdx);
                  setActiveLessonIdx(lIdx);
                  setExpandedModules(prev => ({ ...prev, [mIdx]: true }));
                }
              }
            });
          }
        }
      } catch (error) {
        console.error("Failed to load course", error);
        toast.error("Failed to load course details. Please ensure you are enrolled.");
        navigate('/student/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id, navigate]);

  if (loading) {
    return <LoadingSpinner fullPage={true} text="Opening Learning Portal..." />;
  }

  if (!courseData || !courseData.course) return null;

  const { course, progress = 0 } = courseData;
  const completedLessons = courseData.completedLessons || [];
  const modules = course.modules || [];
  const currentModule = modules[activeModuleIdx] || { title: 'Module 1', lessons: [] };
  const lessons = currentModule.lessons || [];
  const currentLesson = lessons[activeLessonIdx] || {
    title: currentModule.title || 'Lesson Overview',
    description: currentModule.description || 'Welcome to this lesson.',
    duration: '20 mins',
    videoUrl: 'https://www.youtube.com/embed/bJzb-RuUcMU'
  };

  const getLessonKey = (mIdx, lIdx) => {
    const les = modules[mIdx]?.lessons?.[lIdx];
    return les?._id ? les._id.toString() : `m${mIdx}_l${lIdx}`;
  };

  const currentLessonKey = getLessonKey(activeModuleIdx, activeLessonIdx);
  const isCurrentCompleted = completedLessons.includes(currentLessonKey);

  const toggleModule = (idx) => {
    setExpandedModules(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSelectLesson = (mIdx, lIdx) => {
    setActiveModuleIdx(mIdx);
    setActiveLessonIdx(lIdx);
    const lessonKey = getLessonKey(mIdx, lIdx);
    // Save current active lesson to backend
    updateCourseProgress(id, { currentLessonId: lessonKey, completed: completedLessons.includes(lessonKey) });
  };

  const handleToggleComplete = async () => {
    try {
      const isCompletedNow = !isCurrentCompleted;
      const res = await updateCourseProgress(id, {
        lessonId: currentLessonKey,
        completed: isCompletedNow
      });

      const updatedProgress = res.data.progress;
      const updatedCompletedLessons = res.data.completedLessons;

      setCourseData(prev => ({
        ...prev,
        progress: updatedProgress,
        completedLessons: updatedCompletedLessons,
        certificateIssued: res.data.certificateIssued
      }));

      if (isCompletedNow) {
        toast.success("Lesson marked as complete! Keep going!");
      } else {
        toast.success("Lesson status updated.");
      }

      // Auto advance to next lesson if available
      if (isCompletedNow) {
        if (activeLessonIdx < lessons.length - 1) {
          setActiveLessonIdx(prev => prev + 1);
        } else if (activeModuleIdx < modules.length - 1) {
          setActiveModuleIdx(prev => prev + 1);
          setActiveLessonIdx(0);
          setExpandedModules(prev => ({ ...prev, [activeModuleIdx + 1]: true }));
        }
      }
    } catch (error) {
      toast.error("Failed to update progress");
    }
  };

  const extractYoutubeEmbed = (url, fallbackIdx) => {
    if (!url) return `https://www.youtube.com/embed/${DEFAULT_VIDEOS[fallbackIdx % DEFAULT_VIDEOS.length]}`;
    if (url.includes('embed/')) return url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Interactive Course Outline */}
      <div className={`fixed lg:static inset-y-0 left-0 z-40 ${sidebarOpen ? 'w-80' : 'w-0 -translate-x-full lg:translate-x-0'} bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 shadow-2xl`}>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <button onClick={() => navigate('/student/dashboard')} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors shrink-0">
              <ArrowLeft size={20} />
            </button>
            <h2 className="font-bold text-base text-white truncate">{course.title}</h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Progress Tracker Bar */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-bold text-slate-400 uppercase tracking-wider">Overall Progress</span>
            <span className="font-extrabold text-emerald-400">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
            <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          {progress === 100 && (
            <button
              onClick={() => setShowCertificate(true)}
              className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20"
            >
              <Award size={14} /> View Certificate
            </button>
          )}
        </div>

        {/* Modules & Lessons Outline Accordion */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
          {modules.length > 0 ? (
            modules.map((module, mIdx) => {
              const isOpen = !!expandedModules[mIdx];
              const moduleLessons = module.lessons || [];

              return (
                <div key={mIdx} className="bg-slate-950/60 border border-slate-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleModule(mIdx)}
                    className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="pr-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Module {mIdx + 1}</p>
                      <p className="text-sm font-bold text-white line-clamp-1">{module.title}</p>
                    </div>
                    {isOpen ? <ChevronUp size={16} className="text-slate-400 shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-800/80 divide-y divide-slate-800/50 bg-slate-900/40">
                      {moduleLessons.length > 0 ? (
                        moduleLessons.map((lesson, lIdx) => {
                          const lessonKey = getLessonKey(mIdx, lIdx);
                          const isCompleted = completedLessons.includes(lessonKey);
                          const isActive = mIdx === activeModuleIdx && lIdx === activeLessonIdx;

                          return (
                            <div
                              key={lIdx}
                              onClick={() => handleSelectLesson(mIdx, lIdx)}
                              className={`p-3 cursor-pointer flex items-center gap-3 transition-colors ${isActive ? 'bg-primary/20 text-white border-l-4 border-primary' : 'hover:bg-slate-800/40 text-slate-300'}`}
                            >
                              <div className="shrink-0">
                                {isCompleted ? (
                                  <CheckCircle size={16} className="text-emerald-400 fill-emerald-400/20" />
                                ) : isActive ? (
                                  <PlayCircle size={16} className="text-primary" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                                  {lesson.title}
                                </p>
                                <p className="text-[11px] text-slate-500 mt-0.5">{lesson.duration || '15 mins'}</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-3 text-xs text-slate-500 italic">No lessons listed.</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-4 text-center text-slate-500 text-sm">No course outline modules available.</div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Header Bar */}
        <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center px-4 md:px-8 justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle Outline"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="text-xs text-slate-400 font-medium">Module {activeModuleIdx + 1} • Lesson {activeLessonIdx + 1}</p>
              <h3 className="font-bold text-base text-white max-w-xl truncate">{currentLesson.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleComplete}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
                isCurrentCompleted 
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30' 
                  : 'bg-primary hover:bg-blue-600 text-white shadow-blue-500/20'
              }`}
            >
              {isCurrentCompleted ? 'Completed' : 'Mark Complete'} <CheckCircle size={16} />
            </button>
          </div>
        </div>

        {/* Lesson View Area */}
        <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-8">
          {/* Video Container */}
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative border border-slate-800">
            <iframe
              width="100%"
              height="100%"
              src={extractYoutubeEmbed(currentLesson.videoUrl, activeModuleIdx + activeLessonIdx)}
              title={currentLesson.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Lesson Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-2">{currentLesson.title}</h2>
              <p className="text-slate-300 leading-relaxed text-base">{currentLesson.description || "In this lesson, you will explore core concepts and best practices to advance your skills."}</p>
            </div>

            {currentLesson.preparationMaterial && (
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                <h4 className="font-bold text-slate-200 text-sm mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-secondary" /> Preparation & Prerequisites
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{currentLesson.preparationMaterial}</p>
              </div>
            )}

            {/* Practice Questions / Quiz */}
            {currentLesson.practiceQuestions && currentLesson.practiceQuestions.length > 0 && (
              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <HelpCircle size={20} className="text-purple-400" /> Practice Knowledge Check
                </h3>
                <div className="space-y-4">
                  {currentLesson.practiceQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                      <p className="font-semibold text-slate-200 text-sm mb-3">{qIdx + 1}. {q.question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = quizAnswers[`${currentLessonKey}_${qIdx}`] === optIdx;
                          const isCorrect = optIdx === q.correctAnswer;
                          
                          return (
                            <button
                              key={optIdx}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [`${currentLessonKey}_${qIdx}`]: optIdx }))}
                              className={`p-3 rounded-lg text-xs font-semibold text-left border transition-all ${
                                isSelected
                                  ? isCorrect
                                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                    : 'bg-rose-950 border-rose-500 text-rose-300'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {quizAnswers[`${currentLessonKey}_${qIdx}`] !== undefined && q.explanation && (
                        <p className="text-xs text-slate-400 mt-2 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                          💡 <strong className="text-slate-200">Explanation:</strong> {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Download */}
            {currentLesson.resources && currentLesson.resources.length > 0 && (
              <div className="pt-4 border-t border-slate-800">
                <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                  <BookOpen size={16} className="text-secondary" /> Downloadable Resources
                </h4>
                <div className="flex flex-wrap gap-3">
                  {currentLesson.resources.map((res, rIdx) => (
                    <a
                      key={rIdx}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
                    >
                      <Download size={14} className="text-primary" /> {res.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 p-8 md:p-12 rounded-3xl max-w-2xl w-full border-4 border-yellow-500 shadow-2xl relative text-center">
            <button onClick={() => setShowCertificate(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X size={24} />
            </button>
            
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600">
              <Award size={36} />
            </div>
            
            <p className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-1">Official Certificate of Completion</p>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">NexKind Academy</h2>
            <p className="text-sm text-slate-600 mb-6">This certifies that you have successfully completed 100% of the comprehensive coursework for:</p>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-extrabold text-xl text-primary mb-6">
              {course.title}
            </div>

            <p className="text-xs text-slate-400 mb-6">Issued on {new Date().toLocaleDateString()} • Verified Credential ID: NK-CERT-{course._id?.substring(0,8).toUpperCase()}</p>
            
            <button
              onClick={() => {
                toast.success("Certificate downloaded!");
                setShowCertificate(false);
              }}
              className="btn btn-primary px-8 py-3 font-bold rounded-xl"
            >
              Download PDF Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;
