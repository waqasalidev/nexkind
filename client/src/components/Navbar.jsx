import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown, BookOpen, Briefcase, Calendar, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from './common/Logo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'Jobs', path: '/jobs' },
  { name: 'Scholarships', path: '/scholarships' },
  { name: 'Events', path: '/events' },
  { name: 'About', path: '/about' },
  { name: 'AI Counselor', path: '/ai-assistant' },
  { name: 'Contact', path: '/contact' },
];

const getDashboardUrl = (role) => {
  if (role === 'admin') return '/admin/dashboard';
  if (role === 'teacher') return '/teacher/dashboard';
  return '/student/dashboard';
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (dropdownOpen) setDropdownOpen(false);
  };

  const toggleAccountDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    if (isOpen) setIsOpen(false);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        setUser(JSON.parse(userInfo));
      } catch (err) {
        console.error('Failed to parse user info', err);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  // Lock body scroll when either mobile panel is open
  useEffect(() => {
    if (isOpen || dropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, dropdownOpen]);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    setIsOpen(false);
    setDropdownOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 h-20 w-full glass shadow-sm">
      <div className="container-custom h-full flex justify-between items-center">
        <Logo size="md" variant="light" />

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium py-2 px-1 transition-colors ${
                    isActive ? 'text-primary border-b-2 border-secondary' : 'text-slate-600 hover:text-primary'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Right Side (Auth / Profile & Action Buttons) */}
          <div className="flex gap-4 items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleAccountDropdown}
                  className="flex items-center gap-2 hover:bg-slate-100 py-2 px-3 rounded-xl transition-colors min-h-[44px]"
                  aria-expanded={dropdownOpen}
                  aria-label="User account menu"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/20 shrink-0">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'
                    )}
                  </div>
                  <span className="font-semibold text-slate-700 max-w-[120px] truncate">
                    {user.firstName} {user.lastName}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Desktop Dropdown */}
                {dropdownOpen && (
                  <div className="hidden lg:block absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-fade-in z-50">
                    <div className="px-4 py-3 border-b border-slate-100 mb-1">
                      <p className="font-bold text-slate-800 truncate">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to={getDashboardUrl(user.role)}
                      className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors min-h-[44px] font-medium text-sm"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LayoutDashboard size={18} className="text-primary" /> Dashboard
                    </Link>
                    <Link
                      to={getDashboardUrl(user.role)}
                      state={{ activeTab: 'courses' }}
                      className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors min-h-[44px] font-medium text-sm"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <BookOpen size={18} className="text-blue-500" /> My Courses
                    </Link>
                    <Link
                      to={getDashboardUrl(user.role)}
                      state={{ activeTab: 'jobs' }}
                      className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors min-h-[44px] font-medium text-sm"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Briefcase size={18} className="text-amber-500" /> My Applications
                    </Link>
                    <Link
                      to={getDashboardUrl(user.role)}
                      state={{ activeTab: 'events' }}
                      className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors min-h-[44px] font-medium text-sm"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Calendar size={18} className="text-purple-500" /> My Events
                    </Link>
                    <Link
                      to={getDashboardUrl(user.role)}
                      state={{ activeTab: 'profile' }}
                      className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors min-h-[44px] font-medium text-sm"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={18} className="text-emerald-500" /> Profile
                    </Link>
                    <Link
                      to={getDashboardUrl(user.role)}
                      state={{ activeTab: 'settings' }}
                      className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors min-h-[44px] font-medium text-sm"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings size={18} className="text-slate-500" /> Settings
                    </Link>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-left min-h-[44px] font-medium text-sm"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/student/login" className="btn btn-secondary min-h-[44px] flex items-center justify-center">
                Login
              </Link>
            )}
            <Link to="/donate" className="btn btn-primary min-h-[44px] flex items-center justify-center">
              Donate
            </Link>
          </div>
        </div>

        {/* Mobile Header Right Bar (Profile button if logged in + Hamburger Menu button) */}
        <div className="flex lg:hidden items-center gap-2">
          {user && (
            <button
              onClick={toggleAccountDropdown}
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/20 min-h-[44px] min-w-[44px]"
              aria-label="Open mobile account menu"
            >
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'
              )}
            </button>
          )}

          <button
            className="text-primary p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. MAIN MOBILE NAVIGATION PANEL (FULL VIEWPORT DRAWER)
         ───────────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-white flex flex-col w-screen h-screen w-[100vw] h-[100vh] h-[100dvh] max-w-[100vw] overflow-y-auto lg:hidden"
          style={{
            paddingTop: 'env(safe-area-inset-top, 0px)',
            paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {/* Mobile Drawer Top Header */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100 shrink-0">
            <Logo size="md" variant="light" />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close navigation menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Mobile Navigation Links & Content */}
          <div className="flex-1 p-6 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Navigation</p>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-base font-semibold py-3.5 px-4 rounded-xl flex items-center min-h-[48px] transition-all ${
                    isActive ? 'bg-primary/10 text-primary font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            <div className="border-t border-slate-100 my-4 pt-4 flex flex-col gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/20 shrink-0">
                      {user.avatar ? (
                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900 truncate">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>

                  <Link
                    to={getDashboardUrl(user.role)}
                    className="btn bg-slate-100 text-slate-800 justify-center min-h-[48px] text-base"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard size={20} className="mr-2" /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn bg-red-50 text-red-600 border border-red-100 justify-center min-h-[48px] text-base"
                  >
                    <LogOut size={20} className="mr-2" /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/student/login"
                  className="btn btn-secondary justify-center min-h-[48px] text-base"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
              <Link
                to="/donate"
                className="btn btn-primary justify-center min-h-[48px] text-base"
                onClick={() => setIsOpen(false)}
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. MOBILE ACCOUNT / PROFILE MENU PANEL (FULL VIEWPORT SHEET)
         ───────────────────────────────────────────────────────────── */}
      {dropdownOpen && user && (
        <div
          className="lg:hidden fixed inset-0 z-[110] bg-white flex flex-col w-screen h-screen w-[100vw] h-[100vh] h-[100dvh] max-w-[100vw] overflow-y-auto"
          style={{
            paddingTop: 'env(safe-area-inset-top, 0px)',
            paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {/* Account Mobile Header */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/20 shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 leading-tight truncate">{user.firstName} {user.lastName}</h3>
                <p className="text-xs text-slate-500 capitalize">{user.role || 'Student'} Account</p>
              </div>
            </div>
            <button
              onClick={() => setDropdownOpen(false)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close account menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Account Menu Items */}
          <div className="flex-1 p-6 space-y-3 overflow-y-auto custom-scrollbar">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Account Options</p>

            <Link
              to={getDashboardUrl(user.role)}
              className="flex items-center gap-4 px-4 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl font-medium min-h-[48px] transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <LayoutDashboard size={20} className="text-primary" />
              <div>
                <p className="font-semibold text-slate-800">Dashboard</p>
                <p className="text-xs text-slate-500">Overview of your activity</p>
              </div>
            </Link>

            <Link
              to={getDashboardUrl(user.role)}
              state={{ activeTab: 'courses' }}
              className="flex items-center gap-4 px-4 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl font-medium min-h-[48px] transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <BookOpen size={20} className="text-blue-500" />
              <div>
                <p className="font-semibold text-slate-800">My Courses</p>
                <p className="text-xs text-slate-500">Enrolled learning modules</p>
              </div>
            </Link>

            <Link
              to={getDashboardUrl(user.role)}
              state={{ activeTab: 'jobs' }}
              className="flex items-center gap-4 px-4 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl font-medium min-h-[48px] transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <Briefcase size={20} className="text-amber-500" />
              <div>
                <p className="font-semibold text-slate-800">My Applications</p>
                <p className="text-xs text-slate-500">Job and career applications</p>
              </div>
            </Link>

            <Link
              to={getDashboardUrl(user.role)}
              state={{ activeTab: 'events' }}
              className="flex items-center gap-4 px-4 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl font-medium min-h-[48px] transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <Calendar size={20} className="text-purple-500" />
              <div>
                <p className="font-semibold text-slate-800">My Events</p>
                <p className="text-xs text-slate-500">Registered workshops & events</p>
              </div>
            </Link>

            <Link
              to={getDashboardUrl(user.role)}
              state={{ activeTab: 'profile' }}
              className="flex items-center gap-4 px-4 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl font-medium min-h-[48px] transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <User size={20} className="text-emerald-500" />
              <div>
                <p className="font-semibold text-slate-800">Profile</p>
                <p className="text-xs text-slate-500">Personal & academic details</p>
              </div>
            </Link>

            <Link
              to={getDashboardUrl(user.role)}
              state={{ activeTab: 'settings' }}
              className="flex items-center gap-4 px-4 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl font-medium min-h-[48px] transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <Settings size={20} className="text-slate-500" />
              <div>
                <p className="font-semibold text-slate-800">Settings</p>
                <p className="text-xs text-slate-500">Account preferences</p>
              </div>
            </Link>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl min-h-[48px] transition-colors text-base"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
