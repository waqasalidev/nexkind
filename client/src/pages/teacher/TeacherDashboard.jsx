import { useState } from 'react';
import { BookOpen, Users, FileText, Settings, BarChart, LogOut, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../../components/common/Logo';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: BarChart },
    { id: 'courses', label: 'Manage Courses', icon: BookOpen },
    { id: 'students', label: 'My Students', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <Logo size="sm" variant="light" />
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors">
            <LogOut size={20} /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 backdrop-blur border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="md:hidden">
            <Logo size="sm" variant="light" />
          </div>
          <div className="flex items-center gap-6 ml-auto">
            <button className="text-slate-400 hover:text-primary transition-colors"><Bell size={20} /></button>
            <div className="w-10 h-10 bg-secondary text-primary rounded-full flex items-center justify-center font-bold shadow-md">T</div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-slate-800">Instructor Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Active Courses', value: '12' },
                { label: 'Total Students', value: '1,250' },
                { label: 'Average Rating', value: '4.8' }
              ].map((stat, i) => (
                <div key={i} className="glass p-6 rounded-xl shadow-sm border-l-4 border-secondary">
                  <h3 className="text-3xl font-bold text-primary mb-1">{stat.value}</h3>
                  <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm min-h-[300px] flex items-center justify-center text-slate-400">
              <div className="text-center">
                <p className="mb-2">Chart Visualization Placeholder</p>
                <span className="text-xs">Activity analytics will appear here</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
