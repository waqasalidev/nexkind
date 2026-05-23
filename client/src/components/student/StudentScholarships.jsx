import { useState } from 'react';
import { PageHeader, ContentCard } from './StudentComponents';
import { CreditCard, Calendar, Clock } from 'lucide-react';

const StudentScholarships = ({ scholarships = [] }) => {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <PageHeader
        title="My Applications"
        subtitle="Track your scholarship applications"
        onSearch={setFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships
          .filter(item => item.scholarship && item.scholarship.title.toLowerCase().includes(filter.toLowerCase()))
          .map(item => (
            <ContentCard
              key={item._id}
              title={item.scholarship.title}
              subtitle={`Provider: ${item.scholarship.provider || 'Unknown'}`}
              image={item.scholarship.image}
              tags={[item.scholarship.category || 'Scholarship']}
              actionLabel="View Details"
              onAction={() => window.location.href = `/scholarships/${item.scholarship._id}`}
              footer={
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 font-medium text-xs px-2 py-1 rounded w-fit ${item.status === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                    }`}>
                    <Clock size={12} /> {item.status}
                  </div>
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-green-600 flex items-center gap-1"><CreditCard size={16} />{item.scholarship.amount || 'N/A'}</span>
                    <span className="text-slate-400 text-xs flex items-center gap-1"><Calendar size={14} /> Applied: {new Date(item.appliedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              }
            />
          ))}
        {scholarships.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500">
            No scholarship applications found.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentScholarships;
