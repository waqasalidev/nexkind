import { MapPin, Clock, ArrowRight, X, Calendar, Video, Search, Globe, RefreshCw } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { getEvents } from '../../api';
import { fallbackEvents } from '../../data/fallbackEvents';

const TIMEOUT_MS = 6000;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [isFallback, setIsFallback] = useState(false);

  const filterFallbackList = useCallback((list) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return list.filter((e) => {
      const eventDate = new Date(e.date);
      const isDateValid = !isNaN(eventDate.getTime());

      // Timeframe check
      if (activeTab === 'upcoming') {
        if (isDateValid && eventDate < today) return false;
      } else if (activeTab === 'past') {
        if (!isDateValid || eventDate >= today) return false;
      }

      // Country check
      if (country) {
        if (!e.country || !e.country.toLowerCase().includes(country.toLowerCase())) return false;
      }

      // Category check
      if (category) {
        if (!e.category || !e.category.toLowerCase().includes(category.toLowerCase())) return false;
      }

      // Search check
      if (search) {
        const s = search.toLowerCase();
        const matches =
          (e.title && e.title.toLowerCase().includes(s)) ||
          (e.description && e.description.toLowerCase().includes(s)) ||
          (e.location && e.location.toLowerCase().includes(s)) ||
          (e.country && e.country.toLowerCase().includes(s)) ||
          (e.organizer && e.organizer.toLowerCase().includes(s));
        if (!matches) return false;
      }

      return true;
    });
  }, [activeTab, country, category, search]);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const params = { timeframe: activeTab };
      if (search) params.search = search;
      if (category) params.category = category;
      if (country) params.country = country;

      // Timeout promise to prevent hanging
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Events request timed out')), TIMEOUT_MS)
      );

      const response = await Promise.race([getEvents(params), timeoutPromise]);
      const data = response?.data;
      const eventList = Array.isArray(data) ? data : data?.events || [];

      if (eventList.length > 0) {
        setEvents(eventList);
        setIsFallback(false);
      } else {
        // Use local fallback
        const filtered = filterFallbackList(fallbackEvents);
        setEvents(filtered);
        setIsFallback(true);
      }
    } catch (error) {
      console.warn('[EVENTS] API fetch error or timeout, applying fallback:', error.message);
      const filtered = filterFallbackList(fallbackEvents);
      setEvents(filtered);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  }, [activeTab, search, category, country, filterFallbackList]);

  useEffect(() => {
    const timer = setTimeout(fetchEvents, 250);
    return () => clearTimeout(timer);
  }, [fetchEvents]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  };

  const getDateParts = (dateString) => {
    if (!dateString) return { day: '15', month: 'OCT' };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      const parts = String(dateString).split('-');
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        if (!isNaN(d.getTime())) {
          return {
            day: d.getDate(),
            month: d.toLocaleString('default', { month: 'short' }).toUpperCase()
          };
        }
      }
      return { day: '15', month: 'OCT' };
    }
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase()
    };
  };

  return (
    <div className="min-h-[80vh] bg-slate-50">
      {/* Hero Header */}
      <div className="relative bg-slate-900 py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5 }}
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
            alt="Events Crowd"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/90 to-slate-900" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Calendar size={13} className="text-emerald-400" /> Community Events & Opportunities
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              NexKind Tech & Career Events
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Connect, learn, and grow at verified workshops, summits, and developer fairs across Pakistan, India, Bangladesh, and globally.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="py-12 container-custom max-w-5xl">
        {/* Navigation Tabs, Country Filter & Search */}
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-lg border border-slate-100 -mt-16 relative z-20 mb-8 flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto shrink-0">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 md:flex-initial py-2.5 px-5 rounded-lg text-sm font-bold transition-all min-h-[42px] ${
                activeTab === 'upcoming' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 md:flex-initial py-2.5 px-5 rounded-lg text-sm font-bold transition-all min-h-[42px] ${
                activeTab === 'past' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Past Events
            </button>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-2.5 flex-1 md:justify-end items-stretch sm:items-center">
            {/* Country Filter */}
            <div className="relative min-w-[150px]">
              <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[42px]"
              >
                <option value="">All Countries</option>
                <option value="Pakistan">Pakistan</option>
                <option value="India">India</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="UAE">UAE</option>
                <option value="Global">Global / Online</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search event title, topic, city..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[42px]"
              />
            </div>
          </div>
        </div>

        {/* Fallback notification notice if live catalog is synchronizing */}
        {isFallback && !loading && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-blue-50/80 border border-blue-200/60 text-blue-900 text-xs flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Showing verified NexKind community & partner events.
            </span>
            <button
              onClick={fetchEvents}
              className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-900 underline"
            >
              <RefreshCw size={12} /> Refresh
            </button>
          </div>
        )}

        {loading ? (
          <LoadingSpinner text="Loading upcoming events..." />
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="text-slate-400" size={30} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              No {activeTab === 'upcoming' ? 'Upcoming' : 'Past'} Events Matching Filter
            </h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-4">
              Try resetting your search or country filter to see all opportunities.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setCountry('');
                setCategory('');
              }}
              className="btn btn-primary text-xs py-2 px-4"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6"
          >
            {events.map((event) => {
              const { day, month } = getDateParts(event.startDate || event.date);

              return (
                <motion.div
                  key={event._id || event.id}
                  variants={itemVariants}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md border border-slate-200/70 transition-all duration-300 group"
                >
                  {/* Image & Date Badge Section */}
                  <div className="md:w-2/5 relative overflow-hidden h-52 md:h-auto shrink-0 bg-slate-100">
                    <img
                      src={
                        event.image ||
                        event.img ||
                        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
                      }
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Date badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl flex flex-col items-center shadow-md border border-white/60">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{month}</span>
                      <span className="text-2xl font-extrabold text-primary leading-none">{day}</span>
                    </div>

                    {/* Mode badge */}
                    {event.eventMode && (
                      <div className="absolute bottom-4 left-4 bg-slate-900/85 text-white backdrop-blur px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                        {event.eventMode === 'online' ? (
                          <Video size={12} className="text-emerald-400" />
                        ) : (
                          <MapPin size={12} className="text-blue-400" />
                        )}
                        {event.eventMode}
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 md:p-7 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">
                            {event.category || 'Conference'}
                          </span>
                          {event.country && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/50 text-xs font-semibold rounded-md">
                              <Globe size={11} />
                              {event.country}
                            </span>
                          )}
                        </div>
                        {event.status && (
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize bg-emerald-50 text-emerald-700">
                            Upcoming
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2.5 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-y-2 gap-x-6 text-slate-500 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <Clock size={15} className="text-primary shrink-0" />
                          <span>{event.time || '10:00 AM - 05:00 PM'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={15} className="text-primary shrink-0" />
                          <span className="line-clamp-1">{event.location || 'Online Virtual Hall'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <span className="text-xs text-slate-400">
                        Organizer: <strong className="text-slate-700 font-semibold">{event.organizer || 'NexKind Community'}</strong>
                      </span>
                      <Link
                        to={`/events/${event._id || event.id}`}
                        className="btn btn-primary text-xs py-2 px-4 min-h-[38px] flex items-center shrink-0"
                      >
                        View Details <ArrowRight size={14} className="ml-1.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Events;
