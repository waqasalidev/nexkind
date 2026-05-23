import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from './common/Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    setDropdownOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getDashboardUrl = (role) => {
    switch (role) {
      case 'admin': return '/admin/dashboard';
      case 'teacher': return '/teacher/dashboard';
      default: return '/student/dashboard';
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Events', path: '/events' },
    { name: 'Scholarships', path: '/scholarships' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'AI Assistant', path: '/ai-assistant' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 h-20 w-full glass">
      <div className="container-custom h-full flex justify-between items-center">
        <Logo size="md" variant="light" />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `font-medium transition-colors ${isActive ? 'text-primary border-b-2 border-secondary' : 'text-slate-500 hover:text-primary'}`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          <div className="flex gap-4 items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:bg-slate-100 py-1 px-2 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/20">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'
                    )}
                  </div>
                  <span className="font-semibold text-slate-700 max-w-[100px] truncate">
                    {user.firstName} {user.lastName}
                  </span>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-fade-in">
                    <div className="px-4 py-3 border-b border-slate-100 mb-2">
                      <p className="font-bold text-slate-800 truncate">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to={getDashboardUrl(user.role)}
                      className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link
                      to={getDashboardUrl(user.role)}
                      state={{ activeTab: 'settings' }}
                      className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={18} /> Profile
                    </Link>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/student/login" className="btn btn-secondary">Login</Link>
            )}
            <Link to="/donate" className="btn btn-primary">Donate</Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-t border-slate-100 shadow-lg p-6 flex flex-col gap-4 md:hidden animate-fade-in">
          {user && (
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold overflow-hidden">
                {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.firstName?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="font-bold text-slate-900">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-slate-500">{user.role || 'Student'}</p>
              </div>
            </div>
          )}

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `text-lg font-medium py-2 ${isActive ? 'text-primary' : 'text-slate-600'}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          <div className="flex flex-col gap-3 mt-4">
            {user ? (
              <>
                <Link to={getDashboardUrl(user.role)} className="btn bg-slate-100 text-slate-700 justify-center" onClick={() => setIsOpen(false)}>
                  <LayoutDashboard size={18} className="mr-2" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="btn bg-red-50 text-red-600 justify-center border border-red-100">
                  <LogOut size={18} className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <Link to="/student/login" className="btn btn-secondary justify-center" onClick={() => setIsOpen(false)}>Login</Link>
            )}
            <Link to="/donate" className="btn btn-primary justify-center" onClick={() => setIsOpen(false)}>Donate</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
