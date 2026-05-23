import { useState } from 'react';
import { PageHeader, ContentCard } from './StudentComponents';
import { BookOpen, Clock, Award } from 'lucide-react';

const StudentCourses = ({ courses = [] }) => {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <PageHeader
        title="My Learning"
        subtitle="Track your progress and continue learning"
        onSearch={setFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses
          .filter(item => item.course && item.course.title.toLowerCase().includes(filter.toLowerCase()))
          .map(item => (
            <ContentCard
              key={item._id}
              title={item.course.title}
              subtitle={`By ${item.course.instructor}`}
              image={item.course.image}
              tags={[item.course.category || 'Course']}
              actionLabel={item.progress > 0 ? "Continue Learning" : "Start Course"}
              onAction={() => window.location.href = `/student/courses/${item.course._id}/learn`}
              secondaryActionLabel="View Details"
              onSecondaryAction={() => window.location.href = `/courses/${item.course._id}`}
              footer={
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{item.progress}% Complete</span>
                    <span className="text-primary">{item.progress === 100 ? 'Completed' : 'In Progress'}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              }
            />
          ))}
        {courses.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500">
            No enrolled courses found.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;
