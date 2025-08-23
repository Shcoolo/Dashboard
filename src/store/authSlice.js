import { createSlice } from '@reduxjs/toolkit';
import { setToken, removeToken, removeTokenRefresh, setTokenRefresh, getToken } from '../utils/storage';

const initialState = {
  user: null,
  isAuthenticated: false,
  token: getToken(),
  phone_number: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { first_name, last_name, role , access, refresh, phone_number } = action.payload;
      const token = access?access:action.payload.access_token  // TODO token remove it after edit token name to one name
      state.isAuthenticated = true;
      state.token = token;
      state.user = { first_name, last_name, role }; 
      state.phone_number = phone_number

      setToken(token);
      setTokenRefresh(refresh);
    },
    logoutRedux: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeToken();
      removeTokenRefresh();
    },
  },
});

export const { loginSuccess, logoutRedux } = authSlice.actions;
export default authSlice.reducer;
