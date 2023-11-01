// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // Store user data here
    loading: false,
    error: null,
  },
  reducers: {
    userRegisterStart: (state) => {
      state.loading = true;
    },
    userRegisterSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    userRegisterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userRegisterStart, userRegisterSuccess, userRegisterFailure } = userSlice.actions;

export default userSlice.reducer;
