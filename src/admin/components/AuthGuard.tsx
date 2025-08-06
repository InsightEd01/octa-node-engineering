import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useActivityTracker } from '../hooks/useActivityTracker';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  
  // Track user activity for session management
  useActivityTracker();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Check if user is still authenticated (handles session timeout)
  if (!isAuthenticated || !checkAuth()) {
    // Redirect to login page with return URL
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;