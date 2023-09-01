import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import homeSlice from './slice/homeSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    home: homeSlice,
  },
});
