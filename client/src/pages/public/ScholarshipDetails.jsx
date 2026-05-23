import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, GraduationCap, Calendar, DollarSign, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getScholarship, getStudentDashboard } from '../../api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const { data } = await getScholarship(id);
        setScholarship(data);
      } catch (error) {
        console.error("Failed to fetch scholarship details", error);
      } finally {
        setLoading(false);
      }
    };

    const checkStatus = async () => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          const { data } = await getStudentDashboard();
          const isApplied = data.scholarshipApplications.some(app => app.scholarship && app.scholarship._id === id);
          if (isApplied) setHasApplied(true);
        } catch (error) {
          console.error("Failed to check status", error);
        }
      }
    };

    fetchScholarship();
    checkStatus();
  }, [id]);

  const handleApply = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      toast.error('Please login to apply for this scholarship');
      return;
    }
    navigate(`/scholarships/${id}/apply`);
  };

  if (loading) {
    return <LoadingSpinner fullPage={true} text="Loading scholarship details..." />;
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Scholarship Not Found</h2>
        <Link to="/scholarships" className="btn btn-primary">Back to Scholarships</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200 py-10">
        <div className="container-custom">
          <Link to="/scholarships" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors">
            <ArrowLeft size={18} className="mr-2" /> Back to Scholarships
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider mb-3">{scholarship.category || 'General'}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{scholarship.title}</h1>
              <p className="text-lg text-slate-500 font-medium mb-6">Provided by {scholarship.provider || 'Scholarship Foundation'}</p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">Amount</p>
                    <p className="font-bold text-lg">{scholarship.amount}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">Deadline</p>
                    <p className="font-bold text-lg">{scholarship.deadline ? new Date(scholarship.deadline).toLocaleDateString() : 'Ongoing'}</p>
                  </div>
                </div>
              </div>
            </div>

            {hasApplied ? (
              <button disabled className="btn bg-green-50 text-green-700 border border-green-200 px-8 py-4 text-lg shadow-none cursor-not-allowed">
                <CheckCircle size={20} className="mr-2" /> Applied
              </button>
            ) : (
              <button onClick={handleApply} className="btn btn-secondary px-8 py-4 text-lg shadow-lg shadow-amber-500/20">
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-custom py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">About the Scholarship</h2>
            <p className="text-slate-600 leading-relaxed mb-8 whitespace-pre-line">{scholarship.description}</p>

            {scholarship.eligibilityCriteria && scholarship.eligibilityCriteria.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Eligibility Criteria</h3>
                <ul className="space-y-3 mb-8">
                  {scholarship.eligibilityCriteria.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle size={18} className="text-green-500 mt-1 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {scholarship.requiredDocuments && scholarship.requiredDocuments.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Required Documents</h3>
                <ul className="space-y-3">
                  {scholarship.requiredDocuments.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2.5 shrink-0"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Provider Info</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center">
                <GraduationCap size={28} className="text-slate-400" />
              </div>
              <div>
                <p className="font-bold text-slate-800">{scholarship.provider || 'Foundation'}</p>
                {scholarship.providerLink && (
                  <a href={scholarship.providerLink} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline flex items-center gap-1">Visit Website <Globe size={12} /></a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
