import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice"; // ✅ Ensure correct reducer import

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;
