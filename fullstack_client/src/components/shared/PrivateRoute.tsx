// src/components/shared/PrivateRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner text="Loading..." size="lg" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role permissions if allowedRoles is provided
  if (allowedRoles && profile) {
    const userRole = profile.role;
    
    // Special handling for shareholder role
    if (allowedRoles.includes('shareholder')) {
      const isShareholder = allowedRoles.includes(userRole) || userRole === 'admin';
      
      if (!isShareholder) {
        return <Navigate to="/unauthorized" replace />;
      }
    } 
    // Regular role check
    else if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If authenticated and authorized, render the children
  return children;
};

export default PrivateRoute;