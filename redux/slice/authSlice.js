import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  user: {
    id: '',
    name: '',
    email: '',
  },
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user.id = '';
      state.user.name = '';
      state.user.email = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
