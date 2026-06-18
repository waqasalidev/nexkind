import { useState, useEffect } from 'react';
import {
  Users, BookOpen, DollarSign, Bell,
  CheckCircle, GraduationCap, User, Search, Briefcase, Calendar,
  Award, Sparkles, UserPlus, Menu, LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAdminAnalytics } from '../../api';
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

const CustomAreaChart = ({ data = [], dataKey, color }) => {
  if (!data || data.length === 0) return <div className="text-slate-400 text-sm text-center py-8">No growth data available</div>;

  const maxVal = Math.max(...data.map(d => d[dataKey] || 0), 1) * 1.2;
  const height = 180;
  const width = 500;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const points = data.map((d, i) => {
    const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartWidth;
    const val = d[dataKey] || 0;
    const y = padding.top + chartHeight - (val / maxVal) * chartHeight;
    return { x, y, val, label: d.name };
  });

  const pathD = points.length > 0 ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') : '';
  const fillD = points.length > 0 ? `${pathD} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z` : '';

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {/* Y Axis Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
          const y = padding.top + chartHeight * ratio;
          const labelVal = Math.round(maxVal * (1 - ratio));
          return (
            <g key={idx}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#f1f5f9" strokeWidth="1" />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-medium">{labelVal}</text>
            </g>
          );
        })}

        {/* Fill Area */}
        {fillD && <path d={fillD} fill={color} fillOpacity="0.1" />}
        {/* Stroke Line */}
        {pathD && <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}

        {/* Data Points */}
        {points.map((p, idx) => (
          <g key={idx} className="group/dot cursor-pointer">
            <circle cx={p.x} cy={p.y} r="4" fill="#ffffff" stroke={color} strokeWidth="2.5" className="transition-all duration-200 group-hover/dot:r-6 group-hover/dot:stroke-width-3" />
            {/* Tooltip on hover */}
            <g className="opacity-0 group-hover/dot:opacity-100 transition-opacity duration-200 pointer-events-none">
              <rect x={p.x - 25} y={p.y - 32} width="50" height="22" rx="4" fill="#1e293b" />
              <text x={p.x} y={p.y - 17} textAnchor="middle" fill="#ffffff" className="text-[10px] font-bold">{p.val}</text>
            </g>
          </g>
        ))}

        {/* X Axis Labels */}
        {points.map((p, idx) => (
          <text key={idx} x={p.x} y={height - 8} textAnchor="middle" className="text-[10px] fill-slate-400 font-medium">{p.label}</text>
        ))}
      </svg>
    </div>
  );
};

const CustomBarChart = ({ data = [], dataKey, color }) => {
  if (!data || data.length === 0) return <div className="text-slate-400 text-sm text-center py-8">No data available</div>;

  const maxVal = Math.max(...data.map(d => d[dataKey] || 0), 10);

  return (
    <div className="space-y-4">
      {data.map((item, idx) => {
        const value = item[dataKey] || 0;
        const percentage = maxVal > 0 ? (value / maxVal) * 100 : 0;
        return (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <span className="truncate max-w-[70%]" title={item.name}>{item.name}</span>
              <span className="text-slate-500 font-bold">{value}</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}40`
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTeachers: 0,
    totalCourses: 0,
    totalScholarships: 0,
    totalJobs: 0,
    totalDonations: 0,
    totalRaised: 0,
    totalAiConversations: 0,
    newRegistrations: 0
  });
  const [charts, setCharts] = useState({
    userGrowth: [],
    courseEnrollmentTrends: [],
    scholarshipApplications: [],
    jobApplications: []
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
        const { data } = await getAdminAnalytics();
        setStats(data.stats || {});
        setCharts(data.charts || {});
      } catch (error) {
        console.error('Error fetching analytics:', error);
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
                    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-600', sub: `${stats.newRegistrations} New (30d)` },
                    { label: 'Total Teachers', value: stats.totalTeachers, icon: GraduationCap, color: 'bg-emerald-600', sub: 'Assigned Mentors' },
                    { label: 'Total Courses', value: stats.totalCourses, icon: BookOpen, color: 'bg-indigo-600', sub: 'Active Curriculum' },
                    { label: 'Scholarships Available', value: stats.totalScholarships, icon: Award, color: 'bg-orange-600', sub: 'Financial Opportunities' },
                    { label: 'Active Jobs', value: stats.totalJobs, icon: Briefcase, color: 'bg-teal-600', sub: 'Career Opportunities' },
                    { label: 'Donations Amount', value: `$${stats.totalRaised.toLocaleString()}`, icon: DollarSign, color: 'bg-green-600', sub: `${stats.totalDonations} Donation Events` },
                    { label: 'AI Conversations', value: stats.totalAiConversations, icon: Sparkles, color: 'bg-purple-600', sub: 'Conversations Active' },
                    { label: 'New Registrations', value: stats.newRegistrations, icon: UserPlus, color: 'bg-pink-600', sub: 'Last 30 Days' }
                  ].map((stat, i) => {
                    const Icon = stat.icon || Users;
                    return (
                      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
                            {stat.sub && <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wide">{stat.sub}</p>}
                          </div>
                          <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-slate-100`}>
                            <Icon size={24} className={`text-${stat.color.split('-')[1]}-600`} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Dashboard Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">User Growth (Last 6 Months)</h3>
                    <CustomAreaChart data={charts.userGrowth} dataKey="users" color="rgb(79, 70, 229)" />
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Course Enrollment Trends (Top Courses)</h3>
                    <CustomBarChart data={charts.courseEnrollmentTrends} dataKey="enrolled" color="rgb(59, 130, 246)" />
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Scholarship Applications (Top Listings)</h3>
                    <CustomBarChart data={charts.scholarshipApplications} dataKey="applied" color="rgb(249, 115, 22)" />
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Job Applications (Top Postings)</h3>
                    <CustomBarChart data={charts.jobApplications} dataKey="applicants" color="rgb(20, 184, 166)" />
                  </div>
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
                        { title: 'Donation Received: $100', meta: '2 hours ago', type: 'Donation' },
                        { title: 'New Course Added: Full Stack Web Development', meta: '5 hours ago', type: 'Course' }
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
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 transition-all">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 mr-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              title="Open Menu"
            >
              <Menu size={24} />
            </button>
            <div className="md:hidden flex items-center gap-1.5">
              <Logo size="sm" variant="light" />
              <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase tracking-wider">Admin</span>
            </div>
          </div>

          <div className="hidden md:block relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/50 border-none rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-6 ml-auto">
            <button className="relative text-slate-500 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <button
              onClick={handleLogout}
              className="text-slate-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
              title="Logout"
            >
              <LogOut size={20} />
            </button>

            <div className="flex items-center gap-3 pl-3 sm:pl-6 border-l border-slate-200">
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
