// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [] },
  reducers: {
    setOrders: (state, action) => {
      console.log('====================================');
      console.log("Orders Was Called and cahnged");
      console.log('====================================');
      state.orders = action.payload;
    },
  },
 
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
