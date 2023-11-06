// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "services",
  initialState: { categories: [] },
  reducers: {
    setServices: (state, action) => {
      state.categories = action.payload;
    },
    // Add other reducers as needed
  },
});

export const { setServices } = serviceSlice.actions;
export default serviceSlice.reducer;
