import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, Clock, Building2, ArrowLeft, Globe, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getJob, toggleSaveJob, getStudentDashboard } from '../../api';
import CompanyLogo from '../../components/CompanyLogo';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { fallbackJobs } from '../../data/fallbackJobs';
import toast from 'react-hot-toast';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const fetchPromise = getJob(id);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Job timeout')), 3500)
        );
        const res = await Promise.race([fetchPromise, timeoutPromise]);
        if (res?.data) {
          setJob(res.data);
          return;
        }
      } catch (error) {
        console.warn("API getJob failed, trying fallback:", error.message);
      }

      // Check fallback jobs
      const fb = fallbackJobs.find((j) => j._id === id || j.id === id);
      if (fb) {
        setJob(fb);
      }
      setLoading(false);
    };

    const checkStatus = async () => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          const { data } = await getStudentDashboard();
          const isApplied = data?.appliedJobs?.some(app => app.job && (app.job._id === id || app.job.id === id));
          if (isApplied) setHasApplied(true);
        } catch (error) {
          console.error("Failed to check status", error);
        }
      }
    };

    fetchJob();
    checkStatus();
  }, [id]);

  const handleSaveJob = async () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      toast.error('Please login to save this job');
      return;
    }

    try {
      await toggleSaveJob(id);
      toast.success('Job saved status updated!');
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('Failed to save job');
    }
  };

  const handleApply = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      toast.error('Please login to apply for this job');
      return;
    }
    navigate(`/jobs/${id}/apply`);
  };

  if (loading) {
    return <LoadingSpinner fullPage={true} text="Loading job details..." />;
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Job Not Found</h2>
        <Link to="/jobs" className="btn btn-primary">Back to Jobs</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="container-custom">
          <Link to="/jobs" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors">
            <ArrowLeft size={18} className="mr-2" /> Back to Jobs
          </Link>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <CompanyLogo src={job.image || job.logoUrl} name={job.company} size="xl" className="border border-blue-100" />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 font-medium">
                <div className="flex items-center gap-2"><Building2 size={18} /> {job.company}</div>
                <div className="flex items-center gap-2"><MapPin size={18} /> {job.location}</div>
                <div className="flex items-center gap-2"><Briefcase size={18} /> {job.type}</div>
                <div className="flex items-center gap-2"><Clock size={18} /> {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recent'}</div>
              </div>
            </div>
            <div className="flex flex-col gap-3 min-w-[200px]">
              {job.applyLink ? (
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary justify-center py-3 text-lg inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  Apply on Portal <Globe size={18} />
                </a>
              ) : hasApplied ? (
                <button disabled className="btn bg-green-50 text-green-700 border border-green-200 justify-center py-3 text-lg cursor-not-allowed">
                  <CheckCircle size={20} className="mr-2" /> Applied
                </button>
              ) : (
                <button onClick={handleApply} className="btn btn-primary justify-center py-3 text-lg">Apply Now</button>
              )}
              <button
                onClick={handleSaveJob}
                className="btn bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 justify-center"
              >
                Save Job
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Job Description</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line mb-8">{job.description}</p>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Key Responsibilities</h3>
                <ul className="space-y-3 mb-8">
                  {job.responsibilities.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 shrink-0"></div>
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Requirements</h3>
                <ul className="space-y-3 mb-8">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 shrink-0"></div>
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Benefits</h3>
                <ul className="space-y-3">
                  {job.benefits.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle size={18} className="text-green-500 mt-1 shrink-0" />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Job Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Salary</span>
                <span className="font-semibold text-slate-800">{job.salary || 'Competitive'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Job Type</span>
                <span className="font-semibold text-slate-800">{job.type}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Experience</span>
                <span className="font-semibold text-slate-800">{job.experience || 'Not Specified'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">About the Company</h3>
            <div className="flex items-center gap-3 mb-4">
              <CompanyLogo src={job.image || job.logoUrl} name={job.company} size="sm" />
              <div>
                <p className="font-bold text-slate-800">{job.company}</p>
                {job.companyLink && (
                  <a href={job.companyLink} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline flex items-center gap-1">Visit Website <Globe size={12} /></a>
                )}
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              {job.company} is a valued partner committed to excellence and innovation.
            </p>
            <button className="w-full btn bg-slate-50 text-slate-700 hover:bg-slate-100 justify-center">Follow Company</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
