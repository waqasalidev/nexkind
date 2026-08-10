import { useState, useEffect } from 'react';
import { PageHeader, ContentCard } from './StudentComponents';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ExternalLink, CheckCircle } from 'lucide-react';
import { getMyEnrollments, updateEnrollmentProgress } from '../../api';

const StudentCourses = ({ courses: initialCourses = [] }) => {
  const [filter, setFilter] = useState('');
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const { data } = await getMyEnrollments();
        if (data && data.enrollments) {
          setEnrollments(data.enrollments);
        } else {
          setEnrollments(initialCourses);
        }
      } catch (err) {
        console.warn("Failed to fetch dedicated enrollments, using fallback dashboard courses", err);
        setEnrollments(initialCourses);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [initialCourses]);

  const handleStartExternal = async (item) => {
    try {
      await updateEnrollmentProgress(item.externalCourseId || item._id, { status: 'in-progress' });
    } catch (err) {
      console.warn("Update progress error", err);
    }
    const targetUrl = item.sourceUrl || item.course?.sourceUrl || item.course?.enrollLink || 'https://learn.microsoft.com';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const filteredItems = enrollments.filter(item => {
    const title = item.courseTitle || item.course?.title || '';
    return title.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <PageHeader
        title="My Learning & Enrolled Courses"
        subtitle="Access all your internal and external Microsoft Learn courses in one unified portal"
        onSearch={setFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const isExt = item.courseType === 'external' || item.course?.isExternal || item.externalProvider === 'Microsoft Learn';
          const title = item.courseTitle || item.course?.title || 'Course';
          const provider = item.externalProvider || item.course?.provider || item.course?.source || 'NexKind Academy';
          const image = item.image || item.course?.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80';
          const category = item.category || item.course?.category || 'Technology';
          const skillLevel = item.skillLevel || item.course?.skillLevel || 'Beginner';
          const currentProgress = item.progress || 0;
          const courseId = item.course?._id || item.externalCourseId || item._id;

          return (
            <ContentCard
              key={item._id || courseId}
              title={title}
              subtitle={`Provider: ${provider}`}
              image={image}
              tags={[category, skillLevel, isExt ? 'External Course' : 'NexKind Course']}
              actionLabel={
                isExt ? (
                  <span className="flex items-center gap-1">
                    Start Learning <ExternalLink size={14} />
                  </span>
                ) : currentProgress > 0 ? "Continue Learning" : "Start Learning"
              }
              onAction={() => {
                if (isExt) {
                  handleStartExternal(item);
                } else {
                  navigate(`/student/courses/${courseId}/learn`);
                }
              }}
              secondaryActionLabel="Course Info"
              onSecondaryAction={() => navigate(`/courses/${courseId}`)}
              footer={
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">
                      {isExt ? `Enrolled: ${new Date(item.enrolledAt || item.createdAt || Date.now()).toLocaleDateString()}` : `${currentProgress}% Complete`}
                    </span>
                    <span className={item.status === 'completed' || currentProgress === 100 ? 'text-emerald-600 font-extrabold flex items-center gap-1' : 'text-primary'}>
                      {item.status === 'completed' || currentProgress === 100 ? (
                        <>
                          <CheckCircle size={12} /> Completed 🎉
                        </>
                      ) : isExt ? (
                        'Managed by Provider'
                      ) : (
                        'In Progress'
                      )}
                    </span>
                  </div>
                  {isExt ? (
                    <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] text-slate-500 italic">
                      External course — learning progress is managed on {provider}.
                    </div>
                  ) : (
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${currentProgress === 100 ? 'bg-emerald-500' : 'bg-primary'}`}
                        style={{ width: `${currentProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              }
            />
          );
        })}

        {!loading && filteredItems.length === 0 && (
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
