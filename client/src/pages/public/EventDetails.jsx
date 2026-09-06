import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar, MapPin, Clock, ArrowLeft, Share2, Users, CheckCircle,
  ExternalLink, Globe, AlertCircle, ShieldCheck, Check, Sparkles, UserCheck
} from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getEvent, getStudentDashboard } from '../../api';
import { fallbackEvents } from '../../data/fallbackEvents';
import { getOpportunityApplyInfo } from '../../utils/urlValidator';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const { data } = await getEvent(id);
        if (data) {
          setEvent(data);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.warn('[EVENT-DETAILS] Live fetch error, trying fallback:', error?.message);
      }

      // Check fallback
      const found = fallbackEvents.find((e) => String(e._id) === String(id) || String(e.id) === String(id));
      if (found) {
        setEvent(found);
      }
      setLoading(false);
    };

    const checkStatus = async () => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          const { data } = await getStudentDashboard();
          const registered = data?.registeredEvents?.some(
            (reg) => reg.event && (reg.event._id === id || reg.event.id === id)
          );
          if (registered) setIsRegistered(true);
        } catch (error) {
          console.error('Failed to check event registration status', error);
        }
      }
    };

    fetchEvent();
    checkStatus();
  }, [id]);

  const handleInternalRegister = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      toast.error('Please log in to register attendance on NexKind');
      return;
    }
    navigate(`/events/${id}/register`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Event invitation link copied to clipboard!');
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage={true} text="Loading event details..." />;
  }

  if (!event) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Event Not Found</h2>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">
            This event listing may have concluded or is undergoing scheduling confirmation with our partners.
          </p>
          <Link to="/events" className="btn btn-primary w-full justify-center">
            <ArrowLeft size={16} className="mr-2" /> Browse Upcoming Events
          </Link>
        </div>
      </div>
    );
  }

  const applyInfo = getOpportunityApplyInfo(event, 'event');

  const getDateFormatted = (dateStr) => {
    if (!dateStr) return 'Date to be announced';
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? dateStr
      : date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
  };

  const isPastEvent = event.date && new Date(event.date) < new Date(Date.now() - 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Header with Background Banner */}
      <div className="relative w-full bg-slate-950 min-h-[380px] md:min-h-[440px] flex flex-col justify-end overflow-hidden">
        <img
          src={
            event.image ||
            'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
          }
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

        <div className="container-custom relative z-10 py-8 md:py-12">
          <Link
            to="/events"
            className="inline-flex items-center text-sm font-semibold text-slate-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1.5" /> Back to Upcoming Events
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            {event.category && (
              <span className="px-3 py-1 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md">
                {event.category}
              </span>
            )}
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider rounded-full border border-white/20">
              {event.eventMode || 'In-person / Hybrid'}
            </span>
            {event.country && (
              <span className="px-3 py-1 bg-slate-800 text-slate-200 font-bold text-xs rounded-full border border-slate-700">
                <MapPin size={12} className="inline mr-1 text-primary-light" /> {event.country}
              </span>
            )}
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold text-xs rounded-full border border-emerald-500/30">
              <ShieldCheck size={12} className="inline mr-1" /> Verified Event
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 max-w-4xl">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 font-medium">
            <span className="flex items-center gap-2">
              <Users size={16} className="text-primary-light" /> Hosted by {event.organizer || 'NexKind NGO & Global Partners'}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-slate-400" /> {event.venue || event.location}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Left Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Overview Stats Grid */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Calendar size={13} className="text-blue-600" /> Date
                </span>
                <p className="font-bold text-slate-900 text-sm sm:text-base">
                  {getDateFormatted(event.date || event.startDate)}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Clock size={13} className="text-emerald-600" /> Time & Zone
                </span>
                <p className="font-bold text-slate-900 text-sm sm:text-base">
                  {event.time || '10:00 AM - 05:00 PM'} {event.timezone ? `(${event.timezone})` : ''}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <MapPin size={13} className="text-purple-600" /> Venue / Platform
                </span>
                <p className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1" title={event.venue || event.location}>
                  {event.venue || event.location}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Users size={13} className="text-amber-600" /> Capacity
                </span>
                <p className="font-bold text-slate-900 text-sm sm:text-base">
                  {event.capacity ? `${event.capacity} Seats` : 'Open Capacity'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Calendar size={13} className="text-red-500" /> Registration Deadline
                </span>
                <p className="font-bold text-slate-900 text-sm sm:text-base">
                  {event.registrationDeadline || '2 days prior to event'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <ShieldCheck size={13} className="text-teal-600" /> Admission Cost
                </span>
                <p className="font-bold text-emerald-700 text-sm sm:text-base flex items-center gap-1">
                  <Check size={14} className="stroke-[3]" /> Free Admission
                </p>
              </div>
            </div>

            {/* About the Event */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                About this Event
              </h2>
              <div className="text-slate-700 leading-relaxed space-y-4 whitespace-pre-line text-sm sm:text-base">
                {event.description}
              </div>

              {/* Target Audience & Eligibility */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="block text-slate-900 text-sm font-bold mb-1 flex items-center gap-1.5">
                    <UserCheck size={16} className="text-primary" /> Target Audience
                  </strong>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {event.targetAudience || 'Undergraduate and graduate students, tech professionals, developers, and researchers.'}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="block text-slate-900 text-sm font-bold mb-1 flex items-center gap-1.5">
                    <CheckCircle size={16} className="text-emerald-600" /> Eligibility
                  </strong>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {event.eligibility && event.eligibility.length > 0
                      ? event.eligibility.join('. ')
                      : 'Open to all interested candidates. Free registration is required.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Event Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
                <h2 className="text-xl font-extrabold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Clock size={20} className="text-primary" /> Event Schedule & Agenda
                </h2>
                <div className="space-y-3.5">
                  {event.agenda.map((slot, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/70 transition-colors"
                    >
                      <span className="font-mono font-bold text-primary text-sm sm:w-36 shrink-0 flex items-center gap-1.5">
                        <Clock size={14} className="text-primary/70" /> {slot.time}
                      </span>
                      <span className="font-semibold text-slate-800 text-sm sm:text-base">
                        {slot.activity || slot.topic}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Keynote Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80">
                <h2 className="text-xl font-extrabold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Sparkles size={20} className="text-amber-500" /> Featured Speakers & Mentors
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.speakers.map((speaker, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-sm transition-all"
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0 border-2 border-white shadow-sm">
                        {speaker.image ? (
                          <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-slate-500 text-lg">
                            {speaker.name?.charAt(0) || 'S'}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-slate-900 text-sm sm:text-base truncate">
                          {speaker.name}
                        </p>
                        <p className="text-xs text-primary font-medium truncate">
                          {speaker.role}
                        </p>
                        {speaker.institution && (
                          <p className="text-xs text-slate-500 truncate">
                            {speaker.institution}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DEDICATED HOW TO REGISTER SECTION */}
            <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30 text-blue-200">
                    Registration Guide
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
                  How to Register for this Event
                </h2>
                <p className="text-blue-200 text-sm mb-6 max-w-2xl leading-relaxed">
                  Participation is completely free of charge. Complete the steps below to reserve your ticket or virtual meeting access.
                </p>

                <div className="space-y-4 mb-8">
                  {(applyInfo.instructions.length > 0
                    ? applyInfo.instructions
                    : [
                        'Verify the event date, start/end time, timezone, and venue/virtual stream link.',
                        'Click "Register Now" below to open the official host registration page.',
                        'Enter your full name, student or work email, and college/organization name.',
                        'Select your preferred breakout sessions or technical tracks.',
                        'Confirm your registration and save the ticket QR code / calendar invite.',
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

                {/* Prominent Register Button inside How to Register */}
                <div className="pt-2 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {applyInfo.hasValidApplyUrl ? (
                    <a
                      href={applyInfo.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-white text-slate-900 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-black/20 flex items-center justify-center gap-2 text-center"
                    >
                      Register Now <ExternalLink size={18} />
                    </a>
                  ) : (
                    <a
                      href={applyInfo.sourceUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-white/20 text-white hover:bg-white/30 font-bold px-8 py-4 rounded-xl text-base border border-white/30 flex items-center justify-center gap-2 text-center"
                    >
                      Visit Official Host Portal <ExternalLink size={18} />
                    </a>
                  )}

                  {applyInfo.sourceName && (
                    <div className="text-xs text-blue-200">
                      <span className="opacity-75">Event Host: </span>
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
                Registration Status
              </h3>

              {isPastEvent ? (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  This event date has passed. Check recording/slides.
                </div>
              ) : null}

              {applyInfo.hasValidApplyUrl ? (
                <a
                  href={applyInfo.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full justify-center py-4 text-base font-bold shadow-md shadow-primary/25 inline-flex items-center gap-2"
                >
                  Register Now <ExternalLink size={18} />
                </a>
              ) : (
                <div className="space-y-3">
                  <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs leading-relaxed">
                    <span className="font-bold block mb-1">Registration Notice:</span>
                    Registration is coordinated directly with the host venue. Visit the official event source below.
                  </div>
                  {applyInfo.hasValidSourceUrl && (
                    <a
                      href={applyInfo.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full justify-center py-3 text-sm font-bold inline-flex items-center gap-2"
                    >
                      Visit Official Event Site <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              )}

              {/* Internal Attendance Registration on Student Dashboard */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                {isRegistered ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle size={16} className="text-emerald-600" />
                    Saved on My Events Dashboard
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleInternalRegister}
                    className="btn bg-slate-100 hover:bg-slate-200 text-slate-700 w-full justify-center py-2.5 text-sm font-semibold rounded-xl"
                  >
                    Save to My NexKind Calendar
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleShare}
                  className="btn bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 w-full justify-center py-2.5 text-sm font-semibold rounded-xl"
                >
                  <Share2 size={15} className="mr-1.5" />
                  Share with Classmates
                </button>
              </div>

              {/* Verified Source Attribution */}
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <span className="font-bold text-slate-700 block">Event Host:</span>
                <p className="truncate">{applyInfo.sourceName}</p>
                {applyInfo.hasValidSourceUrl && (
                  <a
                    href={applyInfo.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1 mt-1"
                  >
                    Visit Host Website <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>

            {/* Venue & Time Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">
                Event Location & Time
              </h3>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">{event.venue || event.location}</span>
                    <span className="text-xs text-slate-500">{event.city}, {event.country}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">{event.time || '10:00 AM - 05:00 PM'}</span>
                    <span className="text-xs text-slate-500">{event.timezone || 'PKT (UTC+5)'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
