// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: { categories: [] },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    // Add other reducers as needed
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
