import { useState, useEffect } from 'react';
import { Save, Lock, Bell, User, CheckCircle, AlertCircle } from 'lucide-react';
import { updateUserProfile, syncDatabaseCounts } from '../../api';

const AdminSettings = ({ user }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear messages when user types
    if (message) setMessage(null);
    if (error) setError(null);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Basic validation
      if (activeTab === 'security') {
        if (formData.newPassword !== formData.confirmPassword) {
          setError("New passwords do not match");
          setLoading(false);
          return;
        }
        if (formData.newPassword.length < 6) {
          setError("Password must be at least 6 characters");
          setLoading(false);
          return;
        }
      }

      const updateData = {};
      if (activeTab === 'account') {
        updateData.firstName = formData.firstName;
        updateData.lastName = formData.lastName;
        updateData.email = formData.email;
      } else if (activeTab === 'security') {
        updateData.password = formData.newPassword;
      }

      const { data } = await updateUserProfile(updateData);

      // Update local storage with new user info
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const updatedUserInfo = { ...userInfo, ...data };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

      setMessage("Profile updated successfully!");

      // If password changed, clear those fields
      if (activeTab === 'security') {
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }

    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
        <p className="text-slate-500">Manage your account settings and preferences.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="border-b border-slate-100 flex">
          {[
            { id: 'account', label: 'Account', icon: User },
            { id: 'security', label: 'Security', icon: Lock },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'system', label: 'System', icon: AlertCircle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setMessage(null); setError(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {message && (
            <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2">
              <CheckCircle size={20} />
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {activeTab === 'account' && (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Profile Picture / Info Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                  {formData.firstName?.charAt(0) || 'A'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{formData.firstName} {formData.lastName}</h3>
                  <p className="text-slate-500">{formData.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">{user?.role || 'Admin'}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" disabled={loading} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95 disabled:opacity-70">
                  <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* <div className="p-4 bg-yellow-50 text-yellow-800 rounded-xl text-sm mb-4">
                Note: Backend verification of "Current Password" is not currently enforced for simplicity. You can directly set a new password.
              </div> */}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password (optional)"
                  // value={formData.currentPassword}
                  // onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" disabled={loading} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95 disabled:opacity-70">
                  <Save size={18} /> {loading ? 'Update Password' : 'Update Password'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              {['Email Notifications', 'Push Notifications', 'Weekly Digest', 'New User Alerts'].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 text-blue-800 rounded-xl">
                <h4 className="font-bold mb-2">Sync Database Counts</h4>
                <p className="text-sm mb-4">Run this to recalculate and sync the number of students enrolled, event attendees, and job/scholarship applicants from the actual User data. This fixes "0" counts.</p>
                <button
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await syncDatabaseCounts();
                      setMessage("Database counts synced successfully!");
                      // Could force reload stats here
                    } catch (err) {
                      setError("Failed to sync counts.");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? 'Syncing...' : 'Sync Now'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
