import { configureStore } from "@reduxjs/toolkit";
import  userReducer from './features/userSlice'
import  categoryReducer from './features/categorySlice'
import  servicesReducer from './features/serviceSlice'
const store = configureStore({
    reducer:{
        user:userReducer,
        categories:categoryReducer,
        services:categoryReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),

})
export default store