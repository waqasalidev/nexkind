import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowLeft, Share2, Users, CheckCircle } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getEvent, getStudentDashboard } from '../../api';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await getEvent(id);
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event details", error);
      } finally {
        setLoading(false);
      }
    };

    const checkStatus = async () => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          const { data } = await getStudentDashboard();
          const registered = data.registeredEvents.some(reg => reg.event && reg.event._id === id);
          if (registered) setIsRegistered(true);
        } catch (error) {
          console.error("Failed to check status", error);
        }
      }
    };

    fetchEvent();
    checkStatus();
  }, [id]);

  const handleRegister = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      toast.error('Please login to register for this event');
      return;
    }
    navigate(`/events/${id}/register`);
  };

  if (loading) {
    return <LoadingSpinner fullPage={true} text="Loading event details..." />;
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Event Not Found</h2>
        <Link to="/events" className="btn btn-primary">Back to Events</Link>
      </div>
    );
  }

  const getDateFormatted = (dateStr) => {
    if (!dateStr) return 'TBD';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Image */}
      <div className="h-80 md:h-96 relative w-full bg-slate-900">
        <img src={event.image || "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} alt={event.title} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="absolute bottom-10 left-0 w-full p-8 md:p-12">
          <div className="container-custom">
            <Link to="/events" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft size={18} className="mr-2" /> Back to Events
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{event.title}</h1>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About the Event</h2>
              <p className="text-slate-600 leading-relaxed mb-6 whitespace-pre-line">{event.description}</p>

              {event.agenda && event.agenda.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Agenda</h3>
                  <div className="space-y-4">
                    {event.agenda.map((slot, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                        <div className="font-bold text-primary w-24 shrink-0">{slot.time}</div>
                        <div className="text-slate-700 font-medium">{slot.activity || slot.topic}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {event.speakers && event.speakers.length > 0 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Speakers</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {event.speakers.map((speaker, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                        {speaker.image ? (
                          <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-slate-500">{speaker.name.charAt(0)}</div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{speaker.name}</p>
                        <p className="text-sm text-slate-500">{speaker.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 sticky top-24">
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <Calendar className="text-primary mt-1" size={24} />
                  <div>
                    <p className="font-bold text-slate-900">Date</p>
                    <p className="text-slate-600">{getDateFormatted(event.date || event.startDate)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-primary mt-1" size={24} />
                  <div>
                    <p className="font-bold text-slate-900">Time</p>
                    <p className="text-slate-600">{event.time || 'TBA'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary mt-1" size={24} />
                  <div>
                    <p className="font-bold text-slate-900">Location</p>
                    <p className="text-slate-600">{event.location}</p>
                  </div>
                </div>
              </div>

              {isRegistered ? (
                <button disabled className="btn bg-green-50 text-green-700 border border-green-200 w-full justify-center py-3 text-lg mb-4 cursor-not-allowed">
                  <CheckCircle size={20} className="mr-2" /> Registered
                </button>
              ) : (
                <button onClick={handleRegister} className="btn btn-primary w-full justify-center py-3 text-lg mb-4">
                  Register Now
                </button>
              )}

              <div className="flex items-center justify-center gap-2 text-slate-500 text-sm cursor-pointer hover:text-primary transition-colors">
                <Share2 size={16} /> Share Event
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
