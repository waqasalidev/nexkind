import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import Home from './pages/public/Home';
import NotFound from './pages/NotFound';

// Public Pages
import About from './pages/public/About';
import Courses from './pages/public/Courses';
import CourseDetails from './pages/public/CourseDetails';
import CourseEnroll from './pages/public/CourseEnroll';
import Events from './pages/public/Events';
import EventDetails from './pages/public/EventDetails';
import EventRegister from './pages/public/EventRegister';
import Scholarships from './pages/public/Scholarships';
import ScholarshipDetails from './pages/public/ScholarshipDetails';
import ScholarshipApply from './pages/public/ScholarshipApply';
import Jobs from './pages/public/Jobs';
import JobDetails from './pages/public/JobDetails';
import JobApply from './pages/public/JobApply';
import Contact from './pages/public/Contact';
import Donate from './pages/public/Donate';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import FAQ from './pages/public/FAQ';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsOfService from './pages/public/TermsOfService';

// Dashboard Pages
import StudentDashboard from './pages/student/StudentDashboard';
import CoursePlayer from './pages/student/CoursePlayer';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AIAssistantPage from './pages/public/AIAssistantPage';
import ProtectedRoute from './components/ProtectedRoute';

import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();
  // Hide navbar/footer on dashboard pages if needed, for now keep them or use a Layout component
  // We'll keep them for simplicity unless requested otherwise

  const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/learn') || location.pathname === '/ai-assistant';

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      {!isDashboard && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/courses/:id/enroll" element={<CourseEnroll />} />

          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id/register" element={<EventRegister />} />

          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/scholarships/:id" element={<ScholarshipDetails />} />
          <Route path="/scholarships/:id/apply" element={<ScholarshipApply />} />

          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobs/:id/apply" element={<JobApply />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* Universal Auth or specific? User asked for Student/Teacher portals. 
              We'll use a generic Auth with role selection or specific routes. 
              Let's use specific routes for clarity as requested.
          */}
          <Route path="/student/login" element={<Login role="student" />} />
          <Route path="/student/register" element={<Register role="student" />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/courses/:id/learn" element={<CoursePlayer />} />

          <Route path="/teacher/login" element={<Login role="teacher" />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />


          <Route path="/admin/login" element={<Login role="admin" />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isDashboard && <Footer />}
      {location.pathname !== '/ai-assistant' && <ChatbotWidget />}
    </div>
  );
}

export default App;
