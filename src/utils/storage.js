
// access token
export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');
// refresh token
export const getTokenRefresh = () => localStorage.getItem('token-refresh');
export const setTokenRefresh = (refresh) => localStorage.setItem('token-refresh', refresh);
export const removeTokenRefresh = () => localStorage.removeItem('token-refresh');