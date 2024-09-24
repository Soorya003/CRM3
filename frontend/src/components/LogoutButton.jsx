// src/components/LogoutButton.jsx
import React from 'react';
import { useLogout } from '../utils/authUtils';

const LogoutButton = () => {
  const handleLogout = useLogout(); // Get the logout function from the hook

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default LogoutButton;
