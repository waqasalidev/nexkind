import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const userInfo = localStorage.getItem('userInfo');
  if (!userInfo) {
    return <Navigate to={role === 'admin' ? '/admin/login' : '/student/login'} replace />;
  }
  const user = JSON.parse(userInfo);
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
