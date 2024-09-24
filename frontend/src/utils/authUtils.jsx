// src/utils/authUtils.js
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clear user data from Redux store
    localStorage.removeItem('user'); // Remove user data (including token) from localStorage
    navigate('/login'); // Redirect to login page
  };

  return handleLogout; // Return the logout function
};
