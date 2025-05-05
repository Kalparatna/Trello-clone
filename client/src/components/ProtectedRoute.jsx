import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;