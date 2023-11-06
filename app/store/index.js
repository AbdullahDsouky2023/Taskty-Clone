import { configureStore } from "@reduxjs/toolkit";
import  userReducer from './features/userSlice'
import  categoryReducer from './features/categorySlice'
const store = configureStore({
    reducer:{
        user:userReducer,
        categories:categoryReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),

})
export default store