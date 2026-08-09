import api from './axios';

// Auth API
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/signup', userData);

// Dashboard API
export const getDashboardStats = () => api.get('/dashboard/stats');
export const syncDatabaseCounts = () => api.post('/dashboard/sync');

// User API
export const getUsers = (params) => api.get('/users', { params });
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const updateUserProfile = (userData) => api.put('/users/profile', userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Course API
export const getCourses = (params) => api.get('/courses', { params });
export const getCourse = (id) => api.get(`/courses/${id}`);
export const createCourse = (courseData) => api.post('/courses', courseData);
export const updateCourse = (id, courseData) => api.put(`/courses/${id}`, courseData);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
// Event API
export const getEvents = (params) => api.get('/events', { params });
export const getEvent = (id) => api.get(`/events/${id}`);
export const createEvent = (eventData) => api.post('/events', eventData);
export const updateEvent = (id, eventData) => api.put(`/events/${id}`, eventData);
export const deleteEvent = (id) => api.delete(`/events/${id}`);
// Scholarship API
export const getScholarships = (params) => api.get('/scholarships', { params });
export const getScholarship = (id) => api.get(`/scholarships/${id}`);
export const createScholarship = (scholarshipData) => api.post('/scholarships', scholarshipData);
export const updateScholarship = (id, scholarshipData) => api.put(`/scholarships/${id}`, scholarshipData);
export const deleteScholarship = (id) => api.delete(`/scholarships/${id}`);

// Job API
export const getJobs = (params) => api.get('/jobs', { params });
export const getJob = (id) => api.get(`/jobs/${id}`);
export const createJob = (jobData) => api.post('/jobs', jobData);
export const updateJob = (id, jobData) => api.put(`/jobs/${id}`, jobData);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);

// Message API
export const getMessages = (params) => api.get('/messages', { params });
export const createMessage = (messageData) => api.post('/messages', messageData);
export const deleteMessage = (id) => api.delete(`/messages/${id}`);

// Donation API
export const getDonations = (params) => api.get('/donations', { params });
export const getDonationStats = () => api.get('/donations/stats');
export const createDonation = (donationData) => api.post('/donations', donationData);
export const createPaymentIntent = (donationData) => api.post('/donations/create-payment-intent', donationData);
export const deleteDonation = (id) => api.delete(`/donations/${id}`);

// Student API
export const getStudentDashboard = () => api.get('/student/dashboard');
export const toggleSaveJob = (id) => api.post(`/student/jobs/save/${id}`);
export const applyJob = (id) => api.post(`/student/jobs/apply/${id}`);
export const registerEvent = (id) => api.post(`/student/events/register/${id}`);
export const enrollCourse = (id) => api.post(`/student/courses/enroll/${id}`);
export const getStudentCourse = (id) => api.get(`/student/courses/${id}`);
export const updateCourseProgress = (id, payload) => api.post(`/student/courses/${id}/progress`, typeof payload === 'object' ? payload : { progress: payload });
export const applyScholarship = (id) => api.post(`/student/scholarships/apply/${id}`);

// Chat API
const chatHeaders = () => {
  const sessionId = localStorage.getItem('nexkind_chat_session') || `session-${Date.now()}`;
  if (!localStorage.getItem('nexkind_chat_session')) {
    localStorage.setItem('nexkind_chat_session', sessionId);
  }
  return { 'x-session-id': sessionId };
};

export const getChatHealth = () => api.get('/chat/health');
export const getChatSettings = () => api.get('/chat/settings');
export const sendChatMessage = (data) =>
  api.post('/chat/message', data, { headers: chatHeaders(), timeout: 90000 });
export const getChatConversations = () =>
  api.get('/chat/conversations', { headers: chatHeaders() });
export const getChatConversation = (id) =>
  api.get(`/chat/conversations/${id}`, { headers: chatHeaders() });
export const deleteChatConversation = (id) =>
  api.delete(`/chat/conversations/${id}`, { headers: chatHeaders() });
export const getAdminChatSettings = () => api.get('/chat/settings/admin');
export const updateChatSettings = (data) => api.put('/chat/settings', data);

// Advanced Admin Analytics & Management API
export const getAdminAnalytics = () => api.get('/admin/analytics');
export const createAdminUser = (data) => api.post('/users', data);

// Dedicated Teacher / Mentor API
export const getTeacherStudents = () => api.get('/teacher/students');
export const getTeacherStudentRecord = (id) => api.get(`/teacher/students/${id}`);
export const createTeacherGoal = (data) => api.post('/teacher/goals', data);
export const updateTeacherGoal = (id, data) => api.put(`/teacher/goals/${id}`, data);
export const deleteTeacherGoal = (id) => api.delete(`/teacher/goals/${id}`);
export const createTeacherAnnouncement = (data) => api.post('/teacher/announcements', data);
export const getTeacherAnnouncements = () => api.get('/teacher/announcements');
export const assignStudentToSelf = (data) => api.post('/teacher/assign-student', data);

// Student Profile & Mentorship API
export const getStudentProfile = () => api.get('/student/profile');
export const updateStudentProfile = (data) => api.put('/student/profile', data);
export const getStudentMentoring = () => api.get('/student/mentoring');
