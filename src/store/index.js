import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice';
import yearReducer from './yearSlice';


const store =  configureStore({
  reducer: {
    auth: authReducer,
    year: yearReducer,
  },
});

export default store;