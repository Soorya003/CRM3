import axios from 'axios';

const API_URL = 'https://crm3-h8hk.onrender.com/api/auth'; // Remove the trailing slash


// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData); // Ensure URL is correct
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data)); // Store token in localStorage
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};


// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

export default { register, login, logout };
