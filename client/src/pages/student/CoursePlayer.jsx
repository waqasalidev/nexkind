import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, PlayCircle, BookOpen, Download, HelpCircle, Menu } from 'lucide-react';
import { getStudentCourse, updateCourseProgress } from '../../api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const PROGRAMMING_VIDEOS = [
  "bJzb-RuUcMU", // React in 100 Seconds
  "kUMe1FH4CHE", // HTML in 100 Seconds
  "hdI2bqOjy3c", // JavaScript in 100 Seconds
  "F4kWAq13gVI", // Java in 100 Seconds
  "zOjov-2OZ0E", // Python in 100 Seconds
  "WXsD0ZgxjRw", // React Native in 100 Seconds
  "SqcY0GlETPk", // C# in 100 Seconds
  "9haTFmnwXkI", // Next.js in 100 Seconds
  "Bottom67FwU", // C++ in 100 Seconds
  "TZbLrOSXF9s", // TypeScript in 100 Seconds
];

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null); // { course, progress, enrolledAt }
  const [activeModule, setActiveModule] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data } = await getStudentCourse(id);
        setCourseData(data);
      } catch (error) {
        console.error("Failed to load course", error);
        toast.error("Failed to load course details");
        navigate('/student/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id, navigate]);

  const getVideoId = (index) => {
    return PROGRAMMING_VIDEOS[index % PROGRAMMING_VIDEOS.length];
  };

  const handleMarkComplete = async () => {
    if (!courseData) return;

    // Logic: Calculate new progress based on modules
    // Since we don't have modules tracked in DB, we'll simulate it by incrementing progress
    // If we had 10 modules, completing one is +10%.

    // For this demo, let's assume current Active Module is now "completed".
    // We'll trust the user's local state for now or just bump progress.

    const totalModules = courseData.course.modules?.length || 1;
    const progressPerModule = 100 / totalModules;

    // Ensure we don't double count if user clicks repeatedly for same module?
    // Simplified: Just update progress based on activeModule index
    // If activeModule is 0, they finished 1/N.

    const newProgress = Math.min(Math.round(((activeModule + 1) / totalModules) * 100), 100);

    // Only update if newProgress > currentProgress
    if (newProgress > courseData.progress) {
      try {
        await updateCourseProgress(id, newProgress);
        setCourseData(prev => ({ ...prev, progress: newProgress }));
        toast.success("Progress saved!");

        // Auto advance
        if (activeModule < (courseData.course.modules?.length || 0) - 1) {
          setActiveModule(prev => prev + 1);
        }
      } catch (error) {
        toast.error("Failed to update progress");
      }
    } else {
      // Just advance even if progress didn't change (re-watching)
      if (activeModule < (courseData.course.modules?.length || 0) - 1) {
        setActiveModule(prev => prev + 1);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage={true} text="Loading course player..." />;
  }

  if (!courseData) return null;

  const { course, progress } = courseData;
  const modules = course.modules || [];
  const currentModule = modules[activeModule] || { title: 'Intro', description: 'Welcome to the course' };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {/* Sidebar - Course Content */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300 relative`}>
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="font-bold text-lg truncate pr-2">{course.title}</h2>
          <button onClick={() => navigate('/student/dashboard')} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white">
            <ArrowLeft size={18} />
          </button>
        </div>

        <div className="p-4 border-b border-slate-700">
          <div className="flex justify-between text-xs mb-2 text-slate-400">
            <span>Course Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="py-2">
            {modules.length > 0 ? (
              modules.map((module, index) => {
                const isCompleted = ((index + 1) / modules.length) * 100 <= progress;
                const isActive = index === activeModule;

                return (
                  <div
                    key={index}
                    onClick={() => setActiveModule(index)}
                    className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors ${isActive ? 'bg-primary/20 border-l-4 border-primary' : 'hover:bg-slate-700/50 border-l-4 border-transparent'}`}
                  >
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle size={18} className="text-green-500" />
                      ) : isActive ? (
                        <PlayCircle size={18} className="text-primary" />
                      ) : (
                        <div className="w-4.5 h-4.5 rounded-full border-2 border-slate-600"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {index + 1}. {module.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{module.duration || '10 min'}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-slate-500 text-sm">No modules found properly.</div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content - Video Player */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <div className="h-16 bg-slate-800 border-b border-slate-700 flex items-center px-6 justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
              <Menu size={20} />
            </button>
            <h3 className="font-semibold text-lg max-w-2xl truncate">{activeModule + 1}. {currentModule.title}</h3>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors">
              <HelpCircle size={16} /> <span className="hidden sm:inline">Help</span>
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 md:p-10 flex flex-col max-w-5xl mx-auto w-full">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative mb-8 border border-slate-700">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${getVideoId(activeModule)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">About this lesson</h2>
                <button
                  onClick={handleMarkComplete}
                  className="bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  {((activeModule + 1) / modules.length) * 100 <= progress ? 'Completed' : 'Mark as Complete'} <CheckCircle size={18} />
                </button>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg">{currentModule.description || "No description available for this lesson."}</p>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mt-8">
                <h4 className="font-bold mb-4 flex items-center gap-2"><BookOpen size={18} className="text-secondary" /> Resources</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-400 hover:text-primary cursor-pointer transition-colors p-2 hover:bg-slate-700/50 rounded-lg">
                    <Download size={16} /> <span>Lesson Slides.pdf</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-400 hover:text-primary cursor-pointer transition-colors p-2 hover:bg-slate-700/50 rounded-lg">
                    <Download size={16} /> <span>Exercise Files.zip</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
