import { Link } from 'react-router-dom';
import {
  Users, BookOpen, Settings, LogOut,
  Calendar, GraduationCap, Briefcase, Mail, User, LayoutDashboard, Heart, Bot, X
} from 'lucide-react';
import Logo from '../common/Logo';

const AdminSidebar = ({ activeTab, setActiveTab, onLogout, isOpen, setIsOpen }) => {
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
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-24 flex items-center justify-between px-8 border-b border-slate-800/50">
          <Logo size="md" variant="white" />
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4 px-2">Menu</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false); // Close drawer on selection
              }}
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
    </>
  );
};

export default AdminSidebar;
