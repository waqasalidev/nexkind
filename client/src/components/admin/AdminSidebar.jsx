import { Link } from 'react-router-dom';
import {
  Users, BookOpen, Settings, LogOut,
  Calendar, GraduationCap, Briefcase, Mail, User, LayoutDashboard, Heart, Bot
} from 'lucide-react';
import Logo from '../common/Logo';

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'scholarships', label: 'Scholarships', icon: GraduationCap },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'donations', label: 'Donations', icon: Heart },
    { id: 'chatbot', label: 'AI Chatbot', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col hidden md:flex shadow-2xl z-20">
      <div className="h-24 flex items-center px-8 border-b border-slate-800/50">
        <Logo size="md" variant="white" />
      </div>

      <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
        <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4 px-2">Menu</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group ${activeTab === item.id
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 translate-x-1'
              : 'hover:bg-slate-800 hover:text-white hover:translate-x-1'
              }`}
          >
            <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white transition-colors'} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800/50 bg-slate-900/50">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-medium transition-colors">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
