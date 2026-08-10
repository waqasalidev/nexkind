import { useState, useEffect } from 'react';
import { PageHeader } from './StudentComponents';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Building2, MapPin, Calendar, RefreshCw } from 'lucide-react';
import { getMyJobApplications } from '../../api';

const STATUS_COLORS = {
  'Applied':       'bg-blue-50 text-blue-700 border-blue-100',
  'Under Review':  'bg-amber-50 text-amber-700 border-amber-100',
  'Shortlisted':   'bg-purple-50 text-purple-700 border-purple-100',
  'Interview':     'bg-indigo-50 text-indigo-700 border-indigo-100',
  'Hired':         'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Rejected':      'bg-red-50 text-red-700 border-red-100',
  'Withdrawn':     'bg-slate-50 text-slate-500 border-slate-100',
};

const StudentJobs = ({ jobs: legacyJobs = [], savedJobs = [] }) => {
  const [filter, setFilter] = useState('');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await getMyJobApplications();
        if (data && data.applications) {
          setApplications(data.applications);
        } else {
          // Fallback: convert legacy format from user.appliedJobs
          setApplications(legacyJobs.map(item => ({
            _id: item._id,
            jobTitle: item.job?.title || 'Job Position',
            company: item.job?.company || '',
            location: item.job?.location || '',
            jobType: item.job?.type || 'Full-time',
            status: item.status || 'Applied',
            appliedAt: item.appliedAt,
            jobId: item.job?._id
          })));
        }
      } catch (err) {
        console.warn('[StudentJobs] Failed to fetch applications:', err);
        setError('Unable to load your applications.');
        // Fallback to legacy
        setApplications(legacyJobs.map(item => ({
          _id: item._id,
          jobTitle: item.job?.title || 'Job Position',
          company: item.job?.company || '',
          location: item.job?.location || '',
          status: item.status || 'Applied',
          appliedAt: item.appliedAt,
          jobId: item.job?._id
        })));
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const filtered = applications.filter(app => {
    const title = app.jobTitle || app.job?.title || '';
    return title.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <PageHeader
        title="My Job Applications"
        subtitle="Track the status of all your job applications"
        onSearch={setFilter}
      />

      {error && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => window.location.reload()} className="flex items-center gap-1 text-xs font-bold hover:underline">
            <RefreshCw size={12} /> Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-3" />
              <div className="h-3 bg-slate-100 rounded w-1/2 mb-6" />
              <div className="h-8 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(app => {
            const jobId = app.jobId || app.job?._id || app._id;
            const statusClass = STATUS_COLORS[app.status] || 'bg-slate-50 text-slate-600 border-slate-100';
            return (
              <div key={app._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-800 text-base leading-tight">{app.jobTitle}</h3>
                    <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusClass}`}>
                      {app.status}
                    </span>
                  </div>
                  {app.company && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-1">
                      <Building2 size={13} className="text-primary" />
                      <span>{app.company}</span>
                    </div>
                  )}
                  {app.location && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                      <MapPin size={13} />
                      <span>{app.location}</span>
                    </div>
                  )}
                </div>
                <div className="px-5 pb-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar size={12} />
                    <span>Applied {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}</span>
                  </div>
                  {jobId && (
                    <button
                      onClick={() => navigate(`/jobs/${jobId}`)}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      View Job
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <Briefcase size={40} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-700 font-bold text-lg mb-1">No Applications Yet</p>
          <p className="text-slate-500 text-sm mb-4">Start applying for jobs that match your skills and interests.</p>
          <button onClick={() => navigate('/jobs')} className="btn btn-primary text-sm py-2 px-6">
            Explore Jobs
          </button>
        </div>
      )}

      {savedJobs.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Saved Jobs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs
              .filter(job => (job.title || '').toLowerCase().includes(filter.toLowerCase()))
              .map(job => (
                <div key={job._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all">
                  <h3 className="font-bold text-slate-800 mb-1">{job.title}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
                    <Building2 size={13} className="text-primary" />
                    <span>{job.company}</span>
                  </div>
                  <button onClick={() => navigate(`/jobs/${job._id}`)} className="btn btn-primary text-xs py-1.5 px-4">
                    View Job
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentJobs;
