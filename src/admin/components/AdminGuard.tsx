import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Mock authentication hook - replace with your actual auth context
const useAuth = () => {
  // For demonstration, we'll assume the user is logged in and is an admin.
  // In a real app, you would have logic to check for a valid session and user role.
  const user = {
    loggedIn: true,
    role: 'admin',
  };

  return { user };
};

const AdminGuard: React.FC = () => {
  const { user } = useAuth();

  if (!user.loggedIn || user.role !== 'admin') {
    // If user is not an admin, redirect to the homepage
    return <Navigate to="/" replace />;
  }

  // If user is an admin, render the nested routes
  return <Outlet />;
};

export default AdminGuard;
