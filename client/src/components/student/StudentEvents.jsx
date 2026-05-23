import { useState } from 'react';
import { PageHeader, ContentCard } from './StudentComponents';
import { Calendar, MapPin, Clock, CheckCircle } from 'lucide-react';

const StudentEvents = ({ events = [] }) => {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <PageHeader
        title="My Events"
        subtitle="Events you are registered for"
        onSearch={setFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events
          .filter(item => item.event && item.event.title.toLowerCase().includes(filter.toLowerCase()))
          .map(item => (
            <ContentCard
              key={item._id}
              title={item.event.title}
              image={item.event.image}
              tags={[item.event.category || 'Event']}
              actionLabel="View Details"
              onAction={() => window.location.href = `/events/${item.event._id}`}
              footer={
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600 font-medium text-xs bg-green-50 px-2 py-1 rounded w-fit">
                    <CheckCircle size={12} /> Registered
                  </div>
                  <div className="space-y-1.5 text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-secondary" />
                      <span>{item.event.date ? new Date(item.event.date).toLocaleDateString() : 'TBA'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-secondary" />
                      <span>{item.event.time || 'TBA'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-secondary" />
                      <span>{item.event.location || 'Online'}</span>
                    </div>
                  </div>
                </div>
              }
            />
          ))}
        {events.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500">
            You are not registered for any events.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentEvents;
