import { Link } from 'react-router-dom';
import { BookOpen, Award, Briefcase, User, Home, LogOut, Calendar, Settings } from 'lucide-react';
import Logo from '../common/Logo';

const StudentSidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'events', label: 'My Events', icon: Calendar },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200/60 flex flex-col hidden md:flex shadow-xl shadow-slate-200/40 z-20">
      <div className="h-24 flex items-center px-8">
        <Logo size="md" variant="light" />
      </div>

      <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Menu</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === item.id
              ? 'bg-primary text-white shadow-lg shadow-primary/30 translate-x-1'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'
              }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-100">
        <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-all w-full">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;
