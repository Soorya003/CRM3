import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('Current user:', user.role); // Debug log

  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }

  return children;
};


export default ProtectedRoute;
