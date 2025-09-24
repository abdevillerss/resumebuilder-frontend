import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // You can optionally return a loading spinner here
    return <div>Loading...</div>;
  }

  if (!user) {
    // If the user is not logged in, redirect them to the /auth page
    return <Navigate to="/auth" />;
  }

  // If the user is logged in, render the child components
  return children;
};

export default ProtectedRoute;