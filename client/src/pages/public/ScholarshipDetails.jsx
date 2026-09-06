import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, GraduationCap, Calendar, DollarSign, Globe,
  ExternalLink, Bookmark, Share2, AlertCircle, ShieldCheck, Check,
  BookOpen, Award, FileText, Clock, MapPin, Sparkles
} from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getScholarship, getStudentDashboard } from '../../api';
import { fallbackScholarships } from '../../data/fallbackScholarships';
import { getOpportunityApplyInfo } from '../../utils/urlValidator';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        setLoading(true);
        const { data } = await getScholarship(id);
        if (data) {
          setScholarship(data);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.warn('[SCHOLARSHIP-DETAILS] Live fetch error, checking fallback:', error?.message);
      }

      // Check fallback
      const found = fallbackScholarships.find((s) => String(s._id) === String(id) || String(s.id) === String(id));
      if (found) {
        setScholarship(found);
      }
      setLoading(false);
    };

    const checkStatus = async () => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          const { data } = await getStudentDashboard();
          const isApp = data?.scholarshipApplications?.some(
            (app) => app.scholarship && (app.scholarship._id === id || app.scholarship.id === id)
          );
          if (isApp) setHasApplied(true);

          const isSav = data?.savedScholarships?.some(
            (saved) => (saved._id || saved) === id
          );
          if (isSav) setIsSaved(true);
        } catch (error) {
          console.error('Failed to check status', error);
        }
      }
    };

    fetchScholarship();
    checkStatus();
  }, [id]);

  const handleInternalApply = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      toast.error('Please log in to register your application on NexKind');
      return;
    }
    navigate(`/scholarships/${id}/apply`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Scholarship link copied to clipboard!');
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage={true} text="Loading scholarship details..." />;
  }

  if (!scholarship) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Scholarship Not Found</h2>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">
            This scholarship may have expired or is currently being verified by our education advisory board.
          </p>
          <Link to="/scholarships" className="btn btn-primary w-full justify-center">
            <ArrowLeft size={16} className="mr-2" /> Browse All Scholarships
          </Link>
        </div>
      </div>
    );
  }

  const applyInfo = getOpportunityApplyInfo(scholarship, 'scholarship');

  const formatDeadline = (dateVal) => {
    if (!dateVal) return 'Rolling admission / Ongoing';
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isExpired = scholarship.deadline && new Date(scholarship.deadline) < new Date();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-custom py-4">
          <Link
            to="/scholarships"
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} className="mr-1.5" /> Back to Scholarships
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200 py-8 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
              <GraduationCap size={42} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                  <Award size={13} /> {scholarship.fundingType || 'Fully Funded'}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  <BookOpen size={13} /> {scholarship.degreeLevel || 'Undergraduate / Masters'}
                </span>
                {scholarship.country && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    <MapPin size={13} /> {scholarship.country}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck size={13} /> Verified Official Program
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                {scholarship.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 font-medium">
                <span className="text-slate-900 font-bold">
                  Offered by: {scholarship.provider || scholarship.organization || 'Educational Trust'}
                </span>
                {scholarship.university && (
                  <span className="text-slate-500 font-medium">
                    Host: {scholarship.university}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Share Action */}
            <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
              <button
                type="button"
                onClick={handleShare}
                className="btn bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 p-2.5 rounded-xl transition-all"
                title="Share scholarship"
                aria-label="Share scholarship"
              >
                <Share2 size={18} />
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
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <DollarSign size={13} className="text-emerald-600" /> Coverage / Award
                </span>
                <p className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1" title={scholarship.amount}>
                  {scholarship.amount || 'Full Tuition Coverage'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <GraduationCap size={13} className="text-blue-600" /> Degree Level
                </span>
                <p className="font-bold text-slate-900 text-sm sm:text-base">
                  {scholarship.degreeLevel || 'All Levels'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <BookOpen size={13} className="text-purple-600" /> Field of Study
                </span>
                <p className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1" title={scholarship.fieldOfStudy || 'All Academic Fields'}>
                  {scholarship.fieldOfStudy || scholarship.field || 'All Fields'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Award size={13} className="text-amber-600" /> Funding Type
                </span>
                <p className="font-bold text-slate-900 text-sm sm:text-base">
                  {scholarship.fundingType || 'Fully Funded'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Calendar size={13} className="text-red-500" /> Deadline
                </span>
                <p className={`font-bold text-sm sm:text-base ${isExpired ? 'text-red-600' : 'text-slate-900'}`}>
                  {formatDeadline(scholarship.deadline)}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <MapPin size={13} className="text-teal-600" /> Eligible Regions
                </span>
                <p className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1" title={scholarship.eligibleCountries?.join(', ') || scholarship.country}>
                  {scholarship.eligibleCountries?.join(', ') || scholarship.country || 'International'}
                </p>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                About the Scholarship Program
              </h2>
              <div className="text-slate-700 leading-relaxed space-y-4 whitespace-pre-line text-sm sm:text-base">
                {scholarship.description}
              </div>
            </div>

            {/* Benefits & Financial Coverage Breakdown */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" /> Funding & Financial Benefits
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {(scholarship.benefits && scholarship.benefits.length > 0
                  ? scholarship.benefits
                  : [
                      '100% Full Tuition Fee Waiver across all semesters',
                      'Monthly living maintenance stipend allowance',
                      'Subsidized university accommodation / residency grant',
                      'Student health and medical insurance coverage',
                      'Annual academic books, research, and materials allowance',
                    ]
                ).map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-slate-800 text-sm"
                  >
                    <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 italic">
                Note: Benefits are verified directly with official awarding bodies and university bursary offices.
              </p>
            </div>

            {/* Eligibility Criteria Section */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                Eligibility & Candidate Requirements
              </h2>
              <ul className="space-y-3.5 mb-6">
                {(scholarship.eligibilityCriteria && scholarship.eligibilityCriteria.length > 0
                  ? scholarship.eligibilityCriteria
                  : [
                      `Open to citizens of ${scholarship.country || 'participating countries'}`,
                      `Applying for enrolled or prospective ${scholarship.degreeLevel || 'degree'} studies`,
                      'Strong academic record (minimum 3.0/4.0 CGPA or equivalent First Division standing)',
                      'Demonstrated leadership qualities, community service, or academic merit',
                    ]
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                    <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Explicit Criteria Pill Tags */}
              <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
                {scholarship.academicRequirements && (
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <strong className="block text-slate-800 mb-0.5">Academic Prerequisites:</strong>
                    {scholarship.academicRequirements}
                  </div>
                )}
                {scholarship.ageRequirements && (
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <strong className="block text-slate-800 mb-0.5">Age Guidelines:</strong>
                    {scholarship.ageRequirements}
                  </div>
                )}
                {scholarship.languageRequirements && (
                  <div className="p-3 bg-slate-50 rounded-xl sm:col-span-2">
                    <strong className="block text-slate-800 mb-0.5">Language Proficiency:</strong>
                    {scholarship.languageRequirements}
                  </div>
                )}
              </div>
            </div>

            {/* Required Documents Checklist */}
            {scholarship.requiredDocuments && scholarship.requiredDocuments.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
                <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <FileText size={18} className="text-blue-600" /> Required Documents Checklist
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {scholarship.requiredDocuments.map((doc, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-md bg-blue-100 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="font-medium leading-relaxed">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DEDICATED HOW TO APPLY SECTION */}
            <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30 text-amber-100">
                    Application Guide
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
                  How to Apply for this Scholarship
                </h2>
                <p className="text-amber-100 text-sm mb-6 max-w-2xl leading-relaxed">
                  Follow these step-by-step instructions to ensure your application is submitted accurately through the official awarding portal.
                </p>

                <div className="space-y-4 mb-8">
                  {(applyInfo.instructions.length > 0
                    ? applyInfo.instructions
                    : [
                        'Confirm your nationality, academic score, and eligibility criteria.',
                        'Prepare verified transcripts, CNIC/National ID/Passport, statement of purpose, and reference letters.',
                        'Click "Apply for Scholarship" below to open the official government or university portal.',
                        'Create an applicant profile and complete all academic & family background sections.',
                        'Upload required attested documents and submit the online application before the published deadline.',
                        'Print or download the submission confirmation receipt for scholarship tracking.',
                      ]
                  ).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 bg-white/15 p-4 rounded-2xl backdrop-blur-md border border-white/15">
                      <span className="w-7 h-7 rounded-xl bg-white text-amber-900 font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                        {idx + 1}
                      </span>
                      <p className="text-sm sm:text-base text-white font-medium leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Prominent Action Button inside How to Apply */}
                <div className="pt-2 border-t border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {applyInfo.hasValidApplyUrl ? (
                    <a
                      href={applyInfo.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-white text-amber-950 hover:bg-amber-50 font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-black/20 flex items-center justify-center gap-2 text-center"
                    >
                      Apply for Scholarship <ExternalLink size={18} />
                    </a>
                  ) : (
                    <a
                      href={applyInfo.sourceUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-white/20 text-white hover:bg-white/30 font-bold px-8 py-4 rounded-xl text-base border border-white/30 flex items-center justify-center gap-2 text-center"
                    >
                      Visit Official Portal <ExternalLink size={18} />
                    </a>
                  )}

                  {applyInfo.sourceName && (
                    <div className="text-xs text-amber-100">
                      <span className="opacity-75">Official Source: </span>
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
            {/* Primary Action Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80 space-y-5">
              <h3 className="font-extrabold text-slate-900 text-lg">
                Official Application
              </h3>

              {isExpired ? (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  This scholarship cycle has concluded its deadline.
                </div>
              ) : null}

              {applyInfo.hasValidApplyUrl ? (
                <a
                  href={applyInfo.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full justify-center py-4 text-base font-bold shadow-md shadow-amber-500/25 inline-flex items-center gap-2 text-white bg-amber-600 hover:bg-amber-700"
                >
                  Apply for Scholarship <ExternalLink size={18} />
                </a>
              ) : (
                <div className="space-y-3">
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs leading-relaxed">
                    <span className="font-bold block mb-1">Notice:</span>
                    Direct electronic link is currently handled via the official awarding department. Visit the verified official source below.
                  </div>
                  {applyInfo.hasValidSourceUrl && (
                    <a
                      href={applyInfo.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary w-full justify-center py-3 text-sm font-bold inline-flex items-center gap-2 text-white bg-amber-600 hover:bg-amber-700"
                    >
                      Visit Official Source <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              )}

              {/* Internal Application Tracking */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                {hasApplied ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Tracked on Student Dashboard
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleInternalApply}
                    className="btn bg-slate-100 hover:bg-slate-200 text-slate-700 w-full justify-center py-2.5 text-sm font-semibold rounded-xl"
                  >
                    Mark Applied on NexKind Profile
                  </button>
                )}
              </div>

              {/* Official Source Attribution */}
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <span className="font-bold text-slate-700 block">Official Awarding Source:</span>
                <p className="truncate">
                  {applyInfo.sourceName}
                </p>
                {applyInfo.hasValidSourceUrl && (
                  <a
                    href={applyInfo.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:underline font-semibold inline-flex items-center gap-1 mt-1"
                  >
                    Official Portal Website <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>

            {/* Provider Info Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">
                Awarding Organization
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 font-black text-lg">
                  {scholarship.provider?.charAt(0) || 'S'}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">{scholarship.provider || 'Scholarship Authority'}</p>
                  <p className="text-xs text-slate-500 truncate">{scholarship.country}</p>
                </div>
              </div>

              {scholarship.providerLink && (
                <a
                  href={scholarship.providerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 w-full justify-center py-2 text-xs font-semibold rounded-xl inline-flex items-center gap-1.5"
                >
                  <Globe size={14} /> Organization Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
