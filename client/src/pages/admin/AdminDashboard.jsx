import { useState, useEffect } from 'react';
import {
  Users, BookOpen, DollarSign, Bell,
  CheckCircle, GraduationCap, User, Search, Briefcase, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats } from '../../api';
import CourseManager from '../../components/admin/CourseManager';
import EventManager from '../../components/admin/EventManager';
import ScholarshipManager from '../../components/admin/ScholarshipManager';
import JobManager from '../../components/admin/JobManager';
import UserManager from '../../components/admin/UserManager';
import MessageManager from '../../components/admin/MessageManager';
import DonationManager from '../../components/admin/DonationManager';
import AdminSettings from '../../components/admin/AdminSettings';
import ChatSettingsManager from '../../components/admin/ChatSettingsManager';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Logo from '../../components/common/Logo';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeCourses: 0,
    totalEvents: 0,
    activeJobs: 0,
    scholarships: 0,
    totalRaised: 0,
    totalEnrolled: 0,
    totalAttendees: 0,
    totalJobApplicants: 0,
    totalScholarshipApplicants: 0
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/admin/login');
      return;
    }
    const parsed = JSON.parse(userInfo);
    if (parsed.role !== 'admin') {
      navigate('/');
      return;
    }
    setUser(parsed);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/student/login');
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getDashboardStats();
        setStats({
          totalUsers: data.totalUsers || 0,
          activeCourses: data.activeCourses || 0,
          totalEvents: data.totalEvents || 0,
          activeJobs: data.activeJobs || 0,
          scholarships: data.scholarships || 0,
          totalRaised: data.totalRaised || 0,
          totalEnrolled: data.totalEnrolled || 0,
          totalAttendees: data.totalAttendees || 0,
          totalJobApplicants: data.totalJobApplicants || 0,
          totalScholarshipApplicants: data.totalScholarshipApplicants || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Dashboard Overview</h2>
              <p className="text-slate-500 mt-1">Welcome back, {user?.firstName}!</p>
            </div>

            {loading ? (
              <LoadingSpinner text="Loading dashboard stats..." />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-500', sub: 'Active' },
                    { label: 'Active Courses', value: stats.activeCourses, icon: BookOpen, color: 'bg-indigo-500', sub: `${stats.totalEnrolled} Enrolled` },
                    { label: 'Donations Raised', value: `$${stats.totalRaised.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500', sub: 'Total Fund' },
                    { label: 'Scholarships', value: stats.scholarships, icon: GraduationCap, color: 'bg-orange-500', sub: `${stats.totalScholarshipApplicants} Applied` },
                    { label: 'Events', value: stats.totalEvents, icon: Calendar, color: 'bg-pink-500', sub: `${stats.totalAttendees} Attendees` },
                    { label: 'Active Jobs', value: stats.activeJobs, icon: Briefcase, color: 'bg-teal-500', sub: `${stats.totalJobApplicants} Applicants` }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                          <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
                          {stat.sub && <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wide">{stat.sub}</p>}
                        </div>
                        <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-white`}>
                          <stat.icon size={24} className={`text-${stat.color.split('-')[1]}-600`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
                      <button className="text-sm text-primary font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                      {[
                        { title: 'New User Registration', meta: 'Just now', type: 'User' },
                        { title: 'Donation Received: $50', meta: '2 hours ago', type: 'Donation' },
                        { title: 'New Course Added: Python Basics', meta: '5 hours ago', type: 'Course' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 font-bold">
                              {item.title.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                              <p className="text-xs text-slate-500">{item.meta}</p>
                            </div>
                          </div>
                          <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                            <CheckCircle size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">System Health</h3>
                    <div className="flex items-center gap-4 p-5 bg-green-50/50 text-green-700 rounded-xl border border-green-100 mb-6">
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute inset-0"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                      </div>
                      <span className="font-semibold">All Systems Operational</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {[
                        { label: 'Latency', value: '24ms', color: 'text-blue-600' },
                        { label: 'Uptime', value: '99.9%', color: 'text-green-600' },
                        { label: 'Database', value: 'Connected', color: 'text-purple-600' }
                      ].map((stat, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                          <div className={`text-xl font-bold ${stat.color} mb-1 truncate`}>{stat.value}</div>
                          <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      case 'courses': return <CourseManager />;
      case 'events': return <EventManager />;
      case 'scholarships': return <ScholarshipManager />;
      case 'jobs': return <JobManager />;
      case 'users': return <UserManager />;
      case 'messages': return <MessageManager />;
      case 'donations': return <DonationManager />;
      case 'chatbot': return <ChatSettingsManager />;
      case 'settings': return <AdminSettings user={user} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-inter">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-30 transition-all">
          <div className="md:hidden flex items-center gap-1.5">
            <Logo size="sm" variant="light" />
            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase tracking-wider">Admin</span>
          </div>

          <div className="hidden md:block relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/50 border-none rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <button className="relative text-slate-500 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-slate-500 capitalize">{user?.role || 'Admin'} User</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold shadow-md transform hover:scale-105 transition-transform cursor-pointer">
                {user?.firstName?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
