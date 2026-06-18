import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Logo from '../../components/common/Logo';
import { login } from '../../api';
import toast from 'react-hot-toast';

const Login = ({ role = 'student' }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login({ email, password });
      const data = response.data;

      localStorage.setItem('userInfo', JSON.stringify(data));

      toast.success(`Welcome back, ${data.firstName}!`);
      if (data.role === 'admin') navigate('/admin/dashboard');
      else if (data.role === 'teacher') navigate('/teacher/dashboard');
      else navigate('/student/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
      console.error(err);
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const getRoleTitle = (r) => {
    switch (r) {
      case 'admin': return 'Admin';
      case 'teacher': return 'Teacher / Mentor';
      default: return 'Student';
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="glass max-w-md w-full space-y-8 p-6 sm:p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <Logo size="lg" variant="light" className="justify-center mb-6" />
          <h2 className="text-3xl font-bold text-primary">{getRoleTitle(role)} Login</h2>
          <p className="mt-2 text-sm text-slate-500">Welcome back! Please sign in to continue.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field pl-10"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input-field pl-10"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-slate-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-accent hover:text-accent/80">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full justify-center py-3 text-base" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-slate-500">
          Don't have an account? <Link to={`/${role === 'student' ? 'student' : 'teacher'}/register`} className="font-bold text-accent hover:text-accent/80">Sign Up</Link>
        </div>

        {/* {role !== 'admin' && (
          <div className="mt-4 text-center text-xs">
            <Link to={role === 'student' ? '/teacher/login' : '/student/login'} className="text-slate-400 hover:text-slate-600 hover:underline transition-colors">
              Login as {role === 'student' ? 'Teacher' : 'Student'}
            </Link>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Login;
