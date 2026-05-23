import { useState } from 'react';
import { PageHeader, ContentCard } from './StudentComponents';
import { MapPin, Briefcase, Building2 } from 'lucide-react';

const StudentJobs = ({ jobs = [], savedJobs = [] }) => {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <PageHeader
        title="Job Applications"
        subtitle="Track the status of your applications"
        onSearch={setFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs
          .filter(item => item.job && item.job.title.toLowerCase().includes(filter.toLowerCase()))
          .map(item => (
            <ContentCard
              key={item._id}
              title={item.job.title}
              subtitle={
                <div className="flex items-center gap-1.5">
                  <Building2 size={14} className="text-primary" /> {item.job.company}
                </div>
              }
              image={item.job.image}
              tags={[item.job.type || 'Full-time']}
              actionLabel="View Application"
              onAction={() => window.location.href = `/jobs/${item.job._id}`}
              footer={
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 font-medium text-xs px-2 py-1 rounded w-fit ${item.status === 'Interviewing' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                    {item.status}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <MapPin size={14} />
                    <span>{item.job.location || 'Remote'}</span>
                  </div>
                </div>
              }
            />
          ))}
        {jobs.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500">
            No job applications found.
          </div>
        )}
      </div>

      {savedJobs.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Saved Jobs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs
              .filter(job => job.title.toLowerCase().includes(filter.toLowerCase()))
              .map(job => (
                <ContentCard
                  key={job._id}
                  title={job.title}
                  subtitle={
                    <div className="flex items-center gap-1.5">
                      <Building2 size={14} className="text-primary" /> {job.company}
                    </div>
                  }
                  image={job.image}
                  tags={['Saved']}
                  actionLabel="View Job"
                  onAction={() => window.location.href = `/jobs/${job._id}`}
                  footer={
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <MapPin size={14} />
                        <span>{job.location || 'Remote'}</span>
                      </div>
                    </div>
                  }
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentJobs;
