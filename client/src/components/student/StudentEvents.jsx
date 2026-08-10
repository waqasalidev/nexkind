import { useState, useEffect } from 'react';
import { PageHeader } from './StudentComponents';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, CheckCircle, CalendarDays, RefreshCw } from 'lucide-react';
import { getMyEventRegistrations } from '../../api';

const STATUS_COLORS = {
  'Registered':  'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Attended':    'bg-blue-50 text-blue-700 border-blue-100',
  'Cancelled':   'bg-red-50 text-red-600 border-red-100',
  'Waitlisted':  'bg-amber-50 text-amber-700 border-amber-100',
};

const StudentEvents = ({ events: legacyEvents = [] }) => {
  const [filter, setFilter] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await getMyEventRegistrations();
        if (data && data.registrations) {
          setRegistrations(data.registrations);
        } else {
          // Fallback to legacy format from user.registeredEvents
          setRegistrations(legacyEvents.map(item => ({
            _id: item._id,
            eventTitle: item.event?.title || 'Event',
            eventDate: item.event?.date || '',
            eventType: item.event?.category || 'Community Event',
            location: item.event?.location || '',
            status: 'Registered',
            registeredAt: item.registeredAt,
            eventId: item.event?._id
          })));
        }
      } catch (err) {
        console.warn('[StudentEvents] Failed to fetch registrations:', err);
        setError('Unable to load your event registrations.');
        setRegistrations(legacyEvents.map(item => ({
          _id: item._id,
          eventTitle: item.event?.title || 'Event',
          eventDate: item.event?.date || '',
          status: 'Registered',
          registeredAt: item.registeredAt,
          eventId: item.event?._id
        })));
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  const filtered = registrations.filter(reg => {
    const title = reg.eventTitle || reg.event?.title || '';
    return title.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <PageHeader
        title="My Event Registrations"
        subtitle="Events you have registered for"
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
          {filtered.map(reg => {
            const eventId = reg.eventId || reg.event?._id || reg._id;
            const statusClass = STATUS_COLORS[reg.status] || 'bg-emerald-50 text-emerald-700 border-emerald-100';
            return (
              <div key={reg._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-800 text-base leading-tight">{reg.eventTitle}</h3>
                    <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${statusClass}`}>
                      <CheckCircle size={10} /> {reg.status}
                    </span>
                  </div>
                  {reg.eventDate && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-1">
                      <CalendarDays size={13} className="text-secondary" />
                      <span>{reg.eventDate}</span>
                    </div>
                  )}
                  {reg.location && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                      <MapPin size={13} />
                      <span>{reg.location}</span>
                    </div>
                  )}
                </div>
                <div className="px-5 pb-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar size={12} />
                    <span>Registered {reg.registeredAt ? new Date(reg.registeredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}</span>
                  </div>
                  {eventId && (
                    <button
                      onClick={() => navigate(`/events/${eventId}`)}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      View Event
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <Calendar size={40} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-700 font-bold text-lg mb-1">No Event Registrations Yet</p>
          <p className="text-slate-500 text-sm mb-4">Discover upcoming events, workshops, and career fairs.</p>
          <button onClick={() => navigate('/events')} className="btn btn-primary text-sm py-2 px-6">
            Explore Events
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentEvents;
