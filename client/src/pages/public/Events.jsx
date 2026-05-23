import { MapPin, Clock, ArrowRight, X } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getEvents } from '../../api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await getEvents();
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">Connect, learn, and grow at our workshops, seminars, and community gatherings.</p>
          </motion.div>
        </div>
      </div>

      <div className="py-20 container-custom">
        {loading ? (
          <LoadingSpinner text="Loading events..." />
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100 max-w-4xl mx-auto relative z-20 -mt-32">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="text-slate-400" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Upcoming Events</h2>
            <p className="text-slate-500 max-w-md mx-auto">There are no events scheduled at the moment. Please check back later.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 max-w-5xl mx-auto -mt-32 relative z-20"
          >
            {events.map((event) => {
              const { day, month } = getDateParts(event.startDate || event.date);

              return (
                <motion.div
                  key={event._id}
                  variants={itemVariants}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-lg hover:shadow-xl transition-all duration-300 group"
                >

                  {/* Image Section */}
                  <div className="md:w-1/3 relative overflow-hidden h-48 md:h-auto">
                    <img src={event.image || event.img || "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg flex flex-col items-center shadow-sm">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{month}</span>
                      <span className="text-2xl font-bold text-primary leading-none">{day}</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">{event.category || 'General'}</span>
                      <Link to={`/events/${event._id}`}>
                        <button className="text-slate-400 group-hover:text-secondary group-hover:translate-x-1 transition-all">
                          <ArrowRight size={24} />
                        </button>
                      </Link>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">{event.title}</h3>

                    <div className="flex flex-col sm:flex-row gap-y-2 gap-x-6 text-slate-500 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-secondary" /> {event.time || 'TBD'}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-secondary" /> {event.location || 'TBD'}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <Link to={`/events/${event._id}`} className="text-sm font-semibold text-primary hover:text-primary-dark hover:underline">View Details</Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div >
  );
};

export default Events;
