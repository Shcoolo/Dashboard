import { createSlice } from '@reduxjs/toolkit';
import { setToken, removeToken } from '../utils/storage';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, access_token } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      setToken(access_token);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeToken();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
