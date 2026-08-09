import { MapPin, Clock, ArrowRight, X, Calendar, Video, Search } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getEvents } from '../../api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = { timeframe: activeTab };
      if (search) params.search = search;
      if (category) params.category = category;

      const { data } = await getEvents(params);
      setEvents(Array.isArray(data) ? data : data.events || []);
    } catch (error) {
      console.error("Failed to fetch events", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchEvents, 300);
    return () => clearTimeout(timer);
  }, [activeTab, search, category]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const getDateParts = (dateString) => {
    if (!dateString) return { day: '??', month: '???' };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return { day: '??', month: '???' };
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase()
    };
  };

  return (
    <div className="min-h-[80vh] bg-slate-50">
      <div className="relative bg-slate-900 py-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5 }}
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" alt="Event Crowd" className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
              <Calendar size={14} className="text-secondary" /> Community & Summit Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">NexKind Tech & Career Events</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">Connect, learn, and grow at our workshops, global seminars, and hackathons.</p>
          </motion.div>
        </div>
      </div>

      <div className="py-12 container-custom max-w-5xl">
        {/* Navigation Tabs & Search */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 -mt-20 relative z-20 mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 md:flex-initial py-2.5 px-6 rounded-lg text-sm font-bold transition-all min-h-[44px] ${
                activeTab === 'upcoming' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 md:flex-initial py-2.5 px-6 rounded-lg text-sm font-bold transition-all min-h-[44px] ${
                activeTab === 'past' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Past Events Archive
            </button>
          </div>

          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search event title or topic..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[44px]"
            />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading events..." />
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="text-slate-400" size={36} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No {activeTab === 'upcoming' ? 'Upcoming' : 'Past'} Events Found</h2>
            <p className="text-slate-500 max-w-md mx-auto">There are no {activeTab} events matching your filter query at the moment.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8"
          >
            {events.map((event) => {
              const { day, month } = getDateParts(event.startDate || event.date);

              return (
                <motion.div
                  key={event._id}
                  variants={itemVariants}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300 group"
                >
                  {/* Image Section */}
                  <div className="md:w-2/5 relative overflow-hidden h-52 md:h-auto">
                    <img src={event.image || event.img || "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl flex flex-col items-center shadow-md border border-white/40">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{month}</span>
                      <span className="text-2xl font-extrabold text-primary leading-none">{day}</span>
                    </div>

                    {event.eventMode && (
                      <div className="absolute bottom-4 left-4 bg-slate-900/80 text-white backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 uppercase">
                        {event.eventMode === 'online' ? <Video size={12} className="text-emerald-400" /> : <MapPin size={12} className="text-blue-400" />}
                        {event.eventMode} Event
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">{event.category || 'General'}</span>
                        {event.status && (
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${event.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                            {event.status}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{event.title}</h3>
                      <p className="text-slate-600 text-sm mb-6 line-clamp-2 leading-relaxed">{event.description}</p>

                      <div className="flex flex-col sm:flex-row gap-y-2 gap-x-6 text-slate-500 text-sm mb-6">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-primary" /> {event.time || '09:00 AM - 05:00 PM'}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-primary" /> {event.location || 'Online Virtual Hall'}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">Organizer: <strong className="text-slate-700">{event.organizer || 'NexKind'}</strong></span>
                      <Link to={`/events/${event._id}`} className="btn btn-primary text-sm py-2 px-5 min-h-[44px] flex items-center">
                        View Details <ArrowRight size={16} className="ml-1.5" />
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
