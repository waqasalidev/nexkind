import { useState } from 'react';
import { PageHeader, ContentCard } from './StudentComponents';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const StudentCourses = ({ courses = [] }) => {
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

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
          .map(item => {
            const courseObj = item.course || {};
            const currentProgress = item.progress || 0;

            return (
              <ContentCard
                key={item._id || courseObj._id}
                title={courseObj.title || 'Course'}
                subtitle={`Instructor: ${courseObj.instructor || 'Academy Master'}`}
                image={courseObj.image}
                tags={[courseObj.category || 'Course', courseObj.skillLevel || 'Beginner']}
                actionLabel={currentProgress > 0 ? "Continue Learning" : "Start Learning"}
                onAction={() => navigate(`/student/courses/${courseObj._id}/learn`)}
                secondaryActionLabel="View Outline"
                onSecondaryAction={() => navigate(`/courses/${courseObj._id}`)}
                footer={
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700">{currentProgress}% Complete</span>
                      <span className={currentProgress === 100 ? 'text-emerald-600 font-extrabold' : 'text-primary'}>
                        {currentProgress === 100 ? 'Completed 🎉' : 'In Progress'}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${currentProgress === 100 ? 'bg-emerald-500' : 'bg-primary'}`}
                        style={{ width: `${currentProgress}%` }}
                      />
                    </div>
                  </div>
                }
              />
            );
          })}

        {courses.length === 0 && (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <BookOpen size={40} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-700 font-bold text-lg mb-1">No Enrolled Courses Yet</p>
            <p className="text-slate-500 text-sm mb-4">Explore our course catalog and start your learning journey today.</p>
            <button onClick={() => navigate('/courses')} className="btn btn-primary text-sm py-2 px-6">
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;
