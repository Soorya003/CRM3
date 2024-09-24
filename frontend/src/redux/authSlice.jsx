// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userRole: null, // Ensure userRole is part of initial state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserRole(state, action) {
      state.userRole = action.payload.role;
      state.token = action.payload.token;
    },
    logout(state) {
      state.userRole = null;
      state.token = null;
    },
  },
});

export const { setUserRole, logout } = authSlice.actions;
export default authSlice.reducer;
