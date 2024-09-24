import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/customers';

// Get all customers
const getCustomers = async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
  });
  return response.data;
};

// Create customer
const createCustomer = async (customerData) => {
  const response = await axios.post(API_URL, customerData, {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
  });
  return response.data;
};

// Update customer
const updateCustomer = async (id, customerData) => {
  const response = await axios.put(`${API_URL}/${id}`, customerData, {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
  });
  return response.data;
};

// Delete customer
const deleteCustomer = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
  });
  return response.data;
};

export default { getCustomers, createCustomer, updateCustomer, deleteCustomer };
