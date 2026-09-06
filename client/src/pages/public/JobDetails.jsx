import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin, Briefcase, Clock, Building2, ArrowLeft, Globe, CheckCircle,
  ExternalLink, Calendar, DollarSign, GraduationCap, Bookmark, Share2,
  AlertCircle, ShieldCheck, Check, Sparkles
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getJob, toggleSaveJob, getStudentDashboard } from '../../api';
import CompanyLogo from '../../components/CompanyLogo';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { fallbackJobs } from '../../data/fallbackJobs';
import { getOpportunityApplyInfo } from '../../utils/urlValidator';
import toast from 'react-hot-toast';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const fetchPromise = getJob(id);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Job timeout')), 4000)
        );
        const res = await Promise.race([fetchPromise, timeoutPromise]);
        if (res?.data) {
          setJob(res.data);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.warn('API getJob failed, trying fallback:', error?.message);
      }

      // Check fallback jobs
      const fb = fallbackJobs.find((j) => String(j._id) === String(id) || String(j.id) === String(id));
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
          const isApp = data?.appliedJobs?.some(
            (app) => app.job && (app.job._id === id || app.job.id === id)
          );
          if (isApp) setHasApplied(true);

          const isSav = data?.savedJobs?.some(
            (saved) => (saved._id || saved) === id
          );
          if (isSav) setIsSaved(true);
        } catch (error) {
          console.error('Failed to check student status', error);
        }
      }
    };

    fetchJob();
    checkStatus();
  }, [id]);

  const handleSaveJob = async () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      toast.error('Please log in to save this job to your profile');
      return;
    }

    try {
      await toggleSaveJob(id);
      setIsSaved(!isSaved);
      toast.success(isSaved ? 'Job removed from saved list' : 'Job bookmarked to your profile!');
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('Failed to update saved job');
    }
  };

  const handleInternalApply = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      toast.error('Please log in to apply through NexKind');
      return;
    }
    navigate(`/jobs/${id}/apply`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Opportunity link copied to clipboard!');
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage={true} text="Loading full opportunity details..." />;
  }

  if (!job) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Job Opportunity Not Found</h2>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">
            This job listing may have expired or is currently being updated by our verified NGO partners.
          </p>
          <Link to="/jobs" className="btn btn-primary w-full justify-center">
            <ArrowLeft size={16} className="mr-2" /> Browse All Active Jobs
          </Link>
        </div>
      </div>
    );
  }

  const applyInfo = getOpportunityApplyInfo(job, 'job');

  const formatDeadline = (dateVal) => {
    if (!dateVal) return 'Open until filled (Rolling basis)';
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isExpired = job.deadline && new Date(job.deadline) < new Date();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-custom py-4">
          <Link
            to="/jobs"
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} className="mr-1.5" /> Back to Jobs & Opportunities
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200 py-8 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <CompanyLogo
              src={job.logoCandidates?.[0] || job.image || job.logoUrl}
              name={job.company}
              size="xl"
              className="border border-slate-200 shadow-sm shrink-0"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  <Briefcase size={12} /> {job.type || 'Full-time'}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Building2 size={12} /> {job.workMode || 'On-site'}
                </span>
                {job.category && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                    {job.category}
                  </span>
                )}
                {job.country && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    <MapPin size={12} /> {job.country}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 font-medium">
                <span className="flex items-center gap-1 text-slate-900 font-bold">
                  <Building2 size={16} className="text-primary" /> {job.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={16} className="text-slate-400" /> {job.location || `${job.city}, ${job.country}`}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock size={16} className="text-slate-400" /> {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Active Opportunity'}
                </span>
              </div>
            </div>

            {/* Quick Actions for Desktop */}
            <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
              <button
                type="button"
                onClick={handleShare}
                className="btn bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 p-2.5 rounded-xl transition-all"
                title="Share opportunity"
                aria-label="Share opportunity"
              >
                <Share2 size={18} />
              </button>
              <button
                type="button"
                onClick={handleSaveJob}
                className={`btn border p-2.5 rounded-xl transition-all ${
                  isSaved
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
                title={isSaved ? 'Job bookmarked' : 'Save job'}
                aria-label="Save job"
              >
                <Bookmark size={18} className={isSaved ? 'fill-amber-500 text-amber-500' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Left Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Overview Stats Grid */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <DollarSign size={13} className="text-emerald-600" /> Salary
                </span>
                <p className="font-bold text-slate-900 text-sm sm:text-base">
                  {job.salary || 'Market Competitive'}
                </p>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Briefcase size={13} className="text-blue-600" /> Experience
                </span>
                <p className="font-bold text-slate-900 text-sm sm:text-base">
                  {job.experience || job.experienceLevel || 'Entry-level (0-2 yrs)'}
                </p>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <GraduationCap size={13} className="text-indigo-600" /> Education
                </span>
                <p className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1" title={job.education || "Bachelor's / Practical Experience"}>
                  {job.education || "Bachelor's / Portfolio"}
                </p>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Building2 size={13} className="text-amber-600" /> Work Setup
                </span>
                <p className="font-bold text-slate-900 text-sm sm:text-base">
                  {job.workMode || 'On-site'} ({job.city || job.country || 'Specified'})
                </p>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Calendar size={13} className="text-red-500" /> Deadline
                </span>
                <p className={`font-bold text-sm sm:text-base ${isExpired ? 'text-red-600' : 'text-slate-900'}`}>
                  {formatDeadline(job.deadline)}
                </p>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <ShieldCheck size={13} className="text-teal-600" /> Verification
                </span>
                <p className="font-bold text-teal-700 text-sm sm:text-base flex items-center gap-1">
                  <Check size={14} className="stroke-[3]" /> Verified Listing
                </p>
              </div>
            </div>

            {/* Role Description */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                About the Role
              </h2>
              <div className="text-slate-700 leading-relaxed space-y-4 whitespace-pre-line text-sm sm:text-base">
                {job.description}
              </div>
            </div>

            {/* Key Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
                <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                  Key Responsibilities
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                      <span className="w-5 h-5 rounded-full bg-blue-50 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements & Qualifications */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
                <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                  Eligibility & Requirements
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                      <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Skills Tags */}
            {job.skills && job.skills.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
                <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Sparkles size={18} className="text-amber-500" /> Required Skills & Technologies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold border border-slate-200/80 hover:bg-slate-200/70 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits & Perks */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
                <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                  Benefits & Perks
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-slate-800 text-sm"
                    >
                      <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DEDICATED HOW TO APPLY SECTION */}
            <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30 text-blue-200">
                    Application Guide
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
                  How to Apply for this Opportunity
                </h2>
                <p className="text-blue-200 text-sm mb-6 max-w-2xl leading-relaxed">
                  Follow these step-by-step instructions to ensure your application is submitted accurately to the official employer before the deadline.
                </p>

                <div className="space-y-4 mb-8">
                  {(applyInfo.instructions.length > 0
                    ? applyInfo.instructions
                    : [
                        'Review the role responsibilities, tech stack, and eligibility criteria.',
                        'Prepare your updated CV/resume and links to active code repositories (GitHub/Portfolio).',
                        'Click "Apply Now" below to navigate directly to the official company careers portal.',
                        'Complete the online application form with accurate academic and professional details.',
                        'Submit your application before the deadline and save your registration/reference number.',
                      ]
                  ).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                      <span className="w-7 h-7 rounded-xl bg-blue-500 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                        {idx + 1}
                      </span>
                      <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Prominent Action Button inside How to Apply */}
                <div className="pt-2 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {applyInfo.hasValidApplyUrl ? (
                    <a
                      href={applyInfo.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-white text-slate-900 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-black/20 flex items-center justify-center gap-2 text-center"
                    >
                      Apply Now <ExternalLink size={18} />
                    </a>
                  ) : (
                    <a
                      href={applyInfo.sourceUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-white/20 text-white hover:bg-white/30 font-bold px-8 py-4 rounded-xl text-base border border-white/30 flex items-center justify-center gap-2 text-center"
                    >
                      Visit Official Company Portal <ExternalLink size={18} />
                    </a>
                  )}

                  {applyInfo.sourceName && (
                    <div className="text-xs text-blue-200">
                      <span className="opacity-75">Application Source: </span>
                      <strong className="text-white underline underline-offset-2">
                        {applyInfo.sourceName}
                      </strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Right Sidebar (1 Col) */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
            {/* Primary Action Box */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80 space-y-5">
              <h3 className="font-extrabold text-slate-900 text-lg">
                Ready to Apply?
              </h3>

              {isExpired ? (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  This opportunity has passed its stated deadline.
                </div>
              ) : null}

              {applyInfo.hasValidApplyUrl ? (
                <a
                  href={applyInfo.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full justify-center py-4 text-base font-bold shadow-md shadow-primary/25 inline-flex items-center gap-2"
                >
                  Apply Now <ExternalLink size={18} />
                </a>
              ) : (
                <div className="space-y-3">
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs leading-relaxed">
                    <span className="font-bold block mb-1">Notice:</span>
                    Application link is managed via the official employer portal. Visit the source link below for latest vacancies.
                  </div>
                  {applyInfo.hasValidSourceUrl && (
                    <a
                      href={applyInfo.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full justify-center py-3 text-sm font-bold inline-flex items-center gap-2"
                    >
                      Visit Official Portal <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              )}

              {/* Internal Apply Button for Registered Students */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                {hasApplied ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Applied via NexKind Portal
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleInternalApply}
                    className="btn bg-slate-100 hover:bg-slate-200 text-slate-700 w-full justify-center py-2.5 text-sm font-semibold rounded-xl"
                  >
                    Quick Submit via NexKind
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSaveJob}
                  className="btn bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 w-full justify-center py-2.5 text-sm font-semibold rounded-xl"
                >
                  <Bookmark size={15} className={`mr-1.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
                  {isSaved ? 'Saved to Profile' : 'Save Job for Later'}
                </button>
              </div>

              {/* Verified Source Attribution */}
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <span className="font-bold text-slate-700 block">Verified Source Attribution:</span>
                <p className="truncate">
                  {applyInfo.sourceName}
                </p>
                {applyInfo.hasValidSourceUrl && (
                  <a
                    href={applyInfo.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1 mt-1"
                  >
                    Visit Official Organization Website <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>

            {/* About Organization Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">
                About the Company
              </h3>
              <div className="flex items-center gap-3">
                <CompanyLogo
                  src={job.logoCandidates?.[0] || job.image || job.logoUrl}
                  name={job.company}
                  size="md"
                />
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">{job.company}</p>
                  <p className="text-xs text-slate-500 truncate">{job.location || job.country}</p>
                </div>
              </div>

              {job.companyLink && (
                <a
                  href={job.companyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 w-full justify-center py-2 text-xs font-semibold rounded-xl inline-flex items-center gap-1.5"
                >
                  <Globe size={14} /> Company Homepage
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
