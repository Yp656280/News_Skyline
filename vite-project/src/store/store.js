import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./authSlice";
import weatherReducers from "./weatherSlice";
const store = configureStore({
  reducer: {
    auth: authReducers,
    weather: weatherReducers,
    // posts: postReducers,
  },
});

export default store;
