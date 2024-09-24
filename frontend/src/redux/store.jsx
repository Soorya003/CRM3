// src/redux/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Adjust the path if necessary

const store = configureStore({
  reducer: {
    auth: authReducer, // Add other reducers if needed
  },
});

export default store;