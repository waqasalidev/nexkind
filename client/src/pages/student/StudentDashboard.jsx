import { useState, useEffect } from 'react';
import { BookOpen, Briefcase, User, Bell, Calendar, Search, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getStudentDashboard } from '../../api';
import StudentCourses from '../../components/student/StudentCourses';
import StudentEvents from '../../components/student/StudentEvents';
import StudentScholarships from '../../components/student/StudentScholarships';
import StudentJobs from '../../components/student/StudentJobs';
import StudentSettings from '../../components/student/StudentSettings';
import StudentSidebar from '../../components/student/StudentSidebar';
import Logo from '../../components/common/Logo';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    upcomingEvents: 0,
    jobApplications: 0
  });

  const [studentData, setStudentData] = useState({
    enrolledCourses: [],
    registeredEvents: [],
    appliedJobs: [],
    scholarshipApplications: [],
    savedJobs: []
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/student/login');
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getStudentDashboard();
        setStudentData(data);
        setStats({
          enrolledCourses: data.enrolledCourses.length,
          upcomingEvents: data.registeredEvents.length,
          jobApplications: data.appliedJobs.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">Hello, {user?.firstName || 'Student'}! 👋</h2>
                <p className="text-slate-500 mt-1">Ready to continue your learning journey?</p>
              </div>
              <div className="hidden sm:block text-sm text-slate-400 font-medium">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Enrolled Courses', value: stats.enrolledCourses, icon: BookOpen, color: 'from-blue-500 to-cyan-400' },
                { label: 'Registered Events', value: stats.upcomingEvents, icon: Calendar, color: 'from-purple-500 to-pink-500' },
                { label: 'Job Applications', value: stats.jobApplications, icon: Briefcase, color: 'from-orange-400 to-red-400' }
              ].map((stat, i) => (
                <div key={i} className="group relative bg-white overflow-hidden p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`absolute top-0 right-0 p-3 opacity-10 rounded-bl-3xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon size={60} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-bold text-slate-800 mb-1 group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">{stat.value}</h3>
                    <p className="text-slate-500 font-medium flex items-center gap-2">
                      <stat.icon size={16} /> {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <Sparkles className="text-yellow-400 fill-yellow-400" size={20} /> Continue Learning
                    </h3>
                  </div>

                  {studentData.enrolledCourses.length > 0 ? (
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors group cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-2 inline-block">
                            {studentData.enrolledCourses[0].course.category || 'Course'}
                          </span>
                          <h4 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {studentData.enrolledCourses[0].course.title}
                          </h4>
                          <p className="text-sm text-slate-500 mt-1">Instructor: {studentData.enrolledCourses[0].course.instructor}</p>
                        </div>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 font-bold border border-slate-100">
                          {studentData.enrolledCourses[0].progress}%
                        </div>
                      </div>
                      <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                          style={{ width: `${studentData.enrolledCourses[0].progress}%` }}
                        ></div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => setActiveTab('courses')}
                          className="px-5 py-2 bg-white text-slate-700 text-sm font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-slate-200 hover:border-transparent"
                        >
                          Resume Course
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <p>You haven't enrolled in any courses yet.</p>
                      <button onClick={() => navigate('/courses')} className="mt-4 btn btn-primary">Browse Courses</button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 opacity-20 rounded-full -ml-10 -mb-10 blur-xl"></div>

                  <h3 className="text-lg font-bold mb-4 relative z-10">Daily Fact</h3>
                  <p className="text-indigo-200 text-sm leading-relaxed relative z-10">
                    "Consistent learning for just 20 minutes a day can effectively build new neural pathways in your brain."
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10 relative z-10 flex items-center justify-between">
                    <span className="text-xs font-medium text-indigo-300">Keep it up!</span>
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                      <Sparkles size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'courses': return <StudentCourses courses={studentData.enrolledCourses} />;
      case 'events': return <StudentEvents events={studentData.registeredEvents} />;
      case 'scholarships': return <StudentScholarships scholarships={studentData.scholarshipApplications} />;
      case 'jobs': return <StudentJobs jobs={studentData.appliedJobs} savedJobs={studentData.savedJobs} />;

      case 'settings': return <StudentSettings user={user} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden font-inter">
      <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="md:hidden">
            <Logo size="sm" variant="light" />
          </div>

          <div className="hidden md:block relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search courses, events, jobs..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/50 border-none rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <button className="relative text-slate-500 hover:text-primary transition-colors p-2 hover:bg-slate-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-slate-500 capitalize">{user?.role || 'Student'}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-blue-400 text-white rounded-xl flex items-center justify-center font-bold shadow-md cursor-pointer hover:shadow-lg transition-all">
                {user?.firstName?.charAt(0) || 'S'}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
