import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Slices/ApiConfig";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export default store;
