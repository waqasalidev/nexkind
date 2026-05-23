import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Ticket } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { registerEvent } from '../../api';

const EventRegister = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('form'); // form, success
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: ''
  });

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      }));
    } else {
      toast.error("Please login to register");
      navigate('/student/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerEvent(id);
      setStatus('success');
      toast.success('Successfully registered for event!');
    } catch (error) {
      console.error('Error registering for event:', error);
      toast.error('Failed to register. ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-xl w-full">
        <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-slate-900 p-8 text-white text-center relative overflow-hidden">
            <div className="relative z-10">
              <Ticket size={40} className="mx-auto mb-4 text-secondary" />
              <h1 className="text-2xl font-bold">Event Registration</h1>
              <p className="text-slate-300 text-sm mt-1">Join us for the event</p>
            </div>
            {/* Decor */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
          </div>

          <div className="p-8">
            {status === 'form' ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Organization / School</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full justify-center py-3 text-lg">
                  Confirm Registration
                </button>
              </form>
            ) : (
              <div className="text-center py-8 animate-in fade-in zoom-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">You're Registered!</h2>
                <p className="text-slate-600 mb-8 max-w-sm mx-auto">Your ticket has been sent to your email. We look forward to seeing you there.</p>
                <button onClick={() => navigate('/events')} className="btn btn-primary w-full justify-center">
                  Back to Events
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegister;
