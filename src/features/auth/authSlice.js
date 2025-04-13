import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('accessToken') || null,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;

      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export default authSlice.reducer;
