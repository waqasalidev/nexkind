import { useState, useEffect } from 'react';
import {
  BookOpen, Users, FileText, Settings, BarChart, LogOut, Bell, Plus,
  Trash2, Edit, Award, Briefcase, GraduationCap, Calendar, ChevronRight,
  CheckCircle, Send, ArrowLeft, Loader
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../components/common/Logo';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import {
  getTeacherStudents,
  getTeacherStudentRecord,
  createTeacherGoal,
  updateTeacherGoal,
  deleteTeacherGoal,
  createTeacherAnnouncement,
  getTeacherAnnouncements
} from '../../api';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isEditGoalOpen, setIsEditGoalOpen] = useState(false);
  const [newGoalData, setNewGoalData] = useState({ goal: '', progress: 50, feedback: '' });
  const [editGoalData, setEditGoalData] = useState({ _id: '', goal: '', progress: 50, feedback: '' });

  // Announcement Form State
  const [newAnnData, setNewAnnData] = useState({ title: '', content: '', targetAudience: 'all' });

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/teacher/login');
      return;
    }
    const parsed = JSON.parse(userInfo);
    if (parsed.role !== 'teacher') {
      navigate('/');
      return;
    }
    setUser(parsed);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/student/login');
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [studentsRes, announcementsRes] = await Promise.all([
        getTeacherStudents(),
        getTeacherAnnouncements()
      ]);
      setStudents(studentsRes.data || []);
      setAnnouncements(announcementsRes.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const selectStudent = async (studentId) => {
    try {
      setProfileLoading(true);
      const { data } = await getTeacherStudentRecord(studentId);
      setSelectedStudent(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load student profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!newGoalData.goal.trim()) {
      toast.error('Goal description is required');
      return;
    }
    try {
      await createTeacherGoal({
        studentId: selectedStudent.user._id,
        goal: newGoalData.goal,
        progress: newGoalData.progress,
        feedback: newGoalData.feedback || 'Work in progress'
      });
      toast.success('Mentoring goal assigned successfully!');
      setNewGoalData({ goal: '', progress: 50, feedback: '' });
      setIsAddGoalOpen(false);
      selectStudent(selectedStudent.user._id);
    } catch (err) {
      console.error(err);
      toast.error('Failed to assign goal');
    }
  };

  const handleUpdateGoal = async (e) => {
    e.preventDefault();
    if (!editGoalData.goal.trim()) {
      toast.error('Goal description is required');
      return;
    }
    try {
      await updateTeacherGoal(editGoalData._id, {
        goal: editGoalData.goal,
        progress: editGoalData.progress,
        feedback: editGoalData.feedback
      });
      toast.success('Goal updated successfully!');
      setIsEditGoalOpen(false);
      selectStudent(selectedStudent.user._id);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update goal');
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (!window.confirm('Are you sure you want to delete this mentoring goal?')) return;
    try {
      await deleteTeacherGoal(goalId);
      toast.success('Goal deleted');
      selectStudent(selectedStudent.user._id);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete goal');
    }
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    if (!newAnnData.title.trim() || !newAnnData.content.trim()) {
      toast.error('Title and content are required');
      return;
    }
    try {
      await createTeacherAnnouncement(newAnnData);
      toast.success('Announcement broadcasted!');
      setNewAnnData({ title: '', content: '', targetAudience: 'all' });
      const { data } = await getTeacherAnnouncements();
      setAnnouncements(data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to post announcement');
    }
  };

  const filteredStudents = students.filter(s => {
    const fullName = `${s.user?.firstName || ''} ${s.user?.lastName || ''}`.toLowerCase();
    const email = (s.user?.email || '').toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Teacher Dashboard Overview</h2>
              <p className="text-slate-500 mt-1">Welcome, Mentor {user?.firstName}!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Assigned Students', value: students.length, color: 'border-amber-500 bg-amber-500/10 text-amber-700' },
                { label: 'Broad Announcements', value: announcements.length, color: 'border-orange-500 bg-orange-500/10 text-orange-700' },
                { label: 'Platform Active Status', value: 'Operational', color: 'border-emerald-500 bg-emerald-500/10 text-emerald-700' }
              ].map((stat, i) => (
                <div key={i} className={`p-6 rounded-2xl border-l-4 shadow-sm ${stat.color}`}>
                  <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-sm font-semibold opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Quick list of students */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Your Mentored Students</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.slice(0, 4).map((s, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl flex justify-between items-center hover:bg-slate-100 transition-colors">
                    <div>
                      <p className="font-bold text-slate-800">{s.user?.firstName} {s.user?.lastName}</p>
                      <p className="text-xs text-slate-500">{s.user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('students');
                        selectStudent(s.user?._id);
                      }}
                      className="text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Mentorship Profile
                    </button>
                  </div>
                ))}
                {students.length === 0 && (
                  <p className="text-slate-400 text-sm">No students assigned to you yet.</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'students':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            {selectedStudent ? (
              // Selected Student Detail View
              <div className="space-y-6">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold transition-colors"
                >
                  <ArrowLeft size={16} /> Back to Student List
                </button>

                {profileLoading ? (
                  <div className="py-20 flex justify-center"><Loader className="animate-spin text-amber-600" size={32} /></div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Panel: Profile Info */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-to-tr from-amber-500 to-orange-500 text-white rounded-2xl flex items-center justify-center font-bold text-3xl mx-auto shadow-md mb-4">
                          {selectedStudent.user?.firstName?.charAt(0)}
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">{selectedStudent.user?.firstName} {selectedStudent.user?.lastName}</h3>
                        <p className="text-sm text-slate-500">{selectedStudent.user?.email}</p>
                      </div>

                      <hr className="border-slate-100" />

                      <div className="space-y-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Academic Record</p>
                        <div>
                          <p className="text-xs text-slate-400">Education Level</p>
                          <p className="text-sm font-semibold text-slate-700">{selectedStudent.profile?.educationLevel || 'Undergraduate'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">University</p>
                          <p className="text-sm font-semibold text-slate-700">{selectedStudent.profile?.university || 'Global University'}</p>
                        </div>
                      </div>

                      <hr className="border-slate-100" />

                      <div className="space-y-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Skills & Interests</p>
                        <div>
                          <p className="text-xs text-slate-400">Skills</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedStudent.profile?.skills?.map((s, idx) => (
                              <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-bold">{s}</span>
                            )) || <span className="text-slate-400 text-xs">No skills set</span>}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Interests</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedStudent.profile?.interests?.map((interest, idx) => (
                              <span key={idx} className="bg-amber-50 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold">{interest}</span>
                            )) || <span className="text-slate-400 text-xs">No interests set</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel: Goals, Enrolled Courses, Saved Items */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Goals section */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-bold text-slate-800">Mentoring Goals & Progress</h4>
                          <button
                            onClick={() => setIsAddGoalOpen(true)}
                            className="flex items-center gap-1.5 bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-amber-700 transition-colors"
                          >
                            <Plus size={14} /> Assign Goal
                          </button>
                        </div>

                        <div className="space-y-4">
                          {selectedStudent.mentorNotes?.map((note, idx) => (
                            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 transition-colors relative group">
                              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => {
                                    setEditGoalData(note);
                                    setIsEditGoalOpen(true);
                                  }}
                                  className="p-1 text-slate-500 hover:text-blue-600 rounded"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteGoal(note._id)}
                                  className="p-1 text-slate-500 hover:text-red-600 rounded"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <h5 className="font-bold text-slate-800 text-sm mb-1">{note.goal}</h5>
                              <div className="flex items-center gap-3 my-2">
                                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-amber-600 rounded-full" style={{ width: `${note.progress}%` }}></div>
                                </div>
                                <span className="text-xs font-bold text-slate-600">{note.progress}%</span>
                              </div>
                              <p className="text-xs text-slate-500"><strong className="text-slate-600">Mentor Feedback:</strong> {note.feedback}</p>
                            </div>
                          ))}
                          {(!selectedStudent.mentorNotes || selectedStudent.mentorNotes.length === 0) && (
                            <p className="text-slate-400 text-sm py-4 text-center">No goals set yet.</p>
                          )}
                        </div>
                      </div>

                      {/* Course / Scholarships / Career interests trackers */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Courses */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                          <h4 className="text-md font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <BookOpen size={16} className="text-slate-500" /> Course Progress
                          </h4>
                          <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                            {selectedStudent.enrolledCourses?.map((enroll, idx) => (
                              <div key={idx} className="flex justify-between items-center text-xs">
                                <span className="font-medium text-slate-700 truncate max-w-[70%]" title={enroll.course?.title}>{enroll.course?.title}</span>
                                <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">{enroll.progress}%</span>
                              </div>
                            ))}
                            {(!selectedStudent.enrolledCourses || selectedStudent.enrolledCourses.length === 0) && (
                              <p className="text-slate-400 text-xs py-4 text-center">No courses enrolled.</p>
                            )}
                          </div>
                        </div>

                        {/* Career & Scholarships Interests */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                          <h4 className="text-md font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Briefcase size={16} className="text-slate-500" /> Career & Scholarship
                          </h4>
                          <div className="space-y-3 text-xs">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-500">Scholarship Apps:</span>
                              <span className="font-bold text-slate-800">{selectedStudent.scholarshipApplications?.length || 0} applied</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-500">Job Applications:</span>
                              <span className="font-bold text-slate-800">{selectedStudent.appliedJobs?.length || 0} submitted</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-500">Saved Careers:</span>
                              <span className="font-bold text-slate-800">{selectedStudent.savedJobs?.length || 0} saved</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI History activity logs */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h4 className="text-md font-bold text-slate-800 mb-4">AI Chat Assistant Logs</h4>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {selectedStudent.aiHistory?.map((chat, idx) => (
                            <div key={idx} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-700">{chat.title || 'Career Advisory Session'}</span>
                                <span className="text-slate-400 text-[10px]">{new Date(chat.updatedAt).toLocaleDateString()}</span>
                              </div>
                              <p className="text-slate-500 italic">Total Messages: {chat.messages?.length || 0}</p>
                            </div>
                          ))}
                          {(!selectedStudent.aiHistory || selectedStudent.aiHistory.length === 0) && (
                            <p className="text-slate-400 text-xs py-4 text-center">No AI logs available.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // List of all students
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Assigned Student Records</h3>
                    <p className="text-slate-500 text-sm">Search and review academic details for mentored students.</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-sm w-72 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-xs border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4">Student</th>
                        <th className="px-6 py-4">Academic Level</th>
                        <th className="px-6 py-4">University</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStudents.map((s, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-800">
                            <div>
                              <p>{s.user?.firstName} {s.user?.lastName}</p>
                              <p className="text-xs text-slate-400 font-normal">{s.user?.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-600 font-medium">{s.educationLevel || 'Undergraduate'}</td>
                          <td className="px-6 py-4 text-slate-600 font-medium">{s.university || 'Global University'}</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => selectStudent(s.user?._id)}
                              className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl transition-all"
                            >
                              Open Profile
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredStudents.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                            No students match your query.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );

      case 'announcements':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {/* Post Announcement Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Send size={18} className="text-slate-500" /> Share Announcement
              </h3>
              <form onSubmit={handleAddAnnouncement} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Announcement Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Guidance Session Rescheduled"
                    value={newAnnData.title}
                    onChange={(e) => setNewAnnData({ ...newAnnData, title: e.target.value })}
                    className="w-full px-4 py-2 border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 border-slate-200 rounded-xl transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Content Details</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about recommended roadmaps, class schedules..."
                    value={newAnnData.content}
                    onChange={(e) => setNewAnnData({ ...newAnnData, content: e.target.value })}
                    className="w-full px-4 py-2 border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 border-slate-200 rounded-xl transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Target Role Audience</label>
                  <select
                    value={newAnnData.targetAudience}
                    onChange={(e) => setNewAnnData({ ...newAnnData, targetAudience: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all bg-white"
                  >
                    <option value="all">All Students</option>
                    <option value="undergraduate">Undergraduates Only</option>
                    <option value="career">Career Seekers Only</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 text-white font-bold py-2.5 rounded-xl hover:bg-amber-700 transition-colors shadow-md shadow-amber-600/20 flex items-center justify-center gap-2"
                >
                  <Send size={14} /> Broadcast Announcement
                </button>
              </form>
            </div>

            {/* List Announcements */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-800">Broadcast Bulletins History</h3>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {announcements.map((ann, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-800">{ann.title}</h4>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full capitalize">{ann.targetAudience}</span>
                    </div>
                    <p className="text-sm text-slate-600 whitespace-pre-wrap">{ann.content}</p>
                    <div className="mt-3 text-[10px] text-slate-400 flex justify-between">
                      <span>By: {ann.teacher?.firstName} {ann.teacher?.lastName}</span>
                      <span>{new Date(ann.createdAt).toLocaleDateString()} {new Date(ann.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))}
                {announcements.length === 0 && (
                  <p className="text-slate-400 text-sm text-center py-12">No announcements published.</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-xl animate-in fade-in duration-500">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Mentor Settings</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Display Name</p>
                <p className="text-slate-800 font-semibold">{user?.firstName} {user?.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Email address</p>
                <p className="text-slate-800 font-semibold">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">User Authorization Role</p>
                <span className="inline-block bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-100">Mentor / Teacher</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner text="Synchronizing portal data..." />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-inter">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200/60 flex flex-col hidden md:flex shadow-xl shadow-slate-200/40 z-20">
        <div className="h-24 flex items-center px-8">
          <Logo size="md" variant="light" />
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Menu</p>
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: BarChart },
            { id: 'students', label: 'Student Records', icon: Users },
            { id: 'announcements', label: 'Broadcast Bulletins', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSelectedStudent(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === item.id
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 translate-x-1'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'
                }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-all w-full">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="md:hidden flex items-center gap-1.5">
            <Logo size="sm" variant="light" />
            <span className="text-xs font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full uppercase">Teacher</span>
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-slate-500 capitalize">Mentor User</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-orange-500 text-white rounded-xl flex items-center justify-center font-bold shadow-md cursor-pointer">
                {user?.firstName?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* ADD GOAL MODAL */}
      {isAddGoalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsAddGoalOpen(false)} />
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Assign New Goal</h3>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Goal / Study Objective</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Learn Node.js and REST APIs"
                  value={newGoalData.goal}
                  onChange={(e) => setNewGoalData({ ...newGoalData, goal: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Goal Progress: {newGoalData.progress}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newGoalData.progress}
                  onChange={(e) => setNewGoalData({ ...newGoalData, progress: parseInt(e.target.value) })}
                  className="w-full accent-amber-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mentor Feedback / Advice Note</label>
                <textarea
                  placeholder="Provide recommendations for the student..."
                  value={newGoalData.feedback}
                  onChange={(e) => setNewGoalData({ ...newGoalData, feedback: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddGoalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-50 font-semibold rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 text-white font-bold px-5 py-2 rounded-xl text-sm hover:bg-amber-700 transition-colors shadow-md shadow-amber-600/20"
                >
                  Confirm Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT GOAL MODAL */}
      {isEditGoalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsEditGoalOpen(false)} />
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Edit Assigned Goal</h3>
            <form onSubmit={handleUpdateGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Goal / Study Objective</label>
                <input
                  type="text"
                  required
                  value={editGoalData.goal}
                  onChange={(e) => setEditGoalData({ ...editGoalData, goal: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Progress: {editGoalData.progress}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editGoalData.progress}
                  onChange={(e) => setEditGoalData({ ...editGoalData, progress: parseInt(e.target.value) })}
                  className="w-full accent-amber-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Feedback / Mentor Guidance</label>
                <textarea
                  value={editGoalData.feedback}
                  onChange={(e) => setEditGoalData({ ...editGoalData, feedback: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditGoalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-50 font-semibold rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 text-white font-bold px-5 py-2 rounded-xl text-sm hover:bg-amber-700 transition-colors shadow-md shadow-amber-600/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
