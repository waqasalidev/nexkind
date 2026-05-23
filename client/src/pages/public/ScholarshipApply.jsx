import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, UploadCloud } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { applyScholarship } from '../../api';

const ScholarshipApply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('form');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    institution: '',
    gpa: '',
    major: ''
  });

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      }));
    } else {
      toast.error("Please login to apply");
      navigate('/student/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyScholarship(id);
      setStatus('success');
      toast.success('Scholarship application submitted!');
    } catch (error) {
      console.error('Error applying for scholarship:', error);
      toast.error('Failed to apply. ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-gradient-to-r from-secondary to-amber-600 p-8 text-white">
            <h1 className="text-2xl font-bold">Scholarship Application</h1>
            <p className="text-amber-100 text-sm mt-1">Submit your application</p>
          </div>

          <div className="p-8">
            {status === 'form' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Student Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
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
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Current Institution / School</label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">GPA / Grade</label>
                    <input
                      type="text"
                      name="gpa"
                      value={formData.gpa}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Major / Field of Study</label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 pt-4">Documents</h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Personal Statement / Essay</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-secondary hover:bg-amber-50 transition-colors cursor-pointer">
                    <UploadCloud className="mx-auto text-slate-400 mb-3" size={32} />
                    <p className="text-sm text-slate-600 font-medium">Upload your essay</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Academic Transcripts</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-secondary hover:bg-amber-50 transition-colors cursor-pointer">
                    <UploadCloud className="mx-auto text-slate-400 mb-3" size={32} />
                    <p className="text-sm text-slate-600 font-medium">Upload transcripts</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="btn btn-secondary w-full justify-center py-3 text-lg">
                    Submit Application
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12 animate-in fade-in zoom-in">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-3">Application Received!</h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg">We have received your scholarship application. You can track the status in your dashboard.</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => navigate('/scholarships')} className="btn bg-slate-100 text-slate-700 hover:bg-slate-200 px-8">
                    View More Scholarships
                  </button>
                  <button onClick={() => navigate('/student/dashboard')} className="btn btn-primary px-8">
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipApply;
