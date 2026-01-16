// src/lib/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice.js";
import buyerReducer from "./buyerslice/buyerSlice.js";
import findJobsReducer from "./findjobslice.js";
import companyReducer from "./companyJobSlice.js";
import authReducer from "./Auth/authSlice";


export const store = configureStore({
  reducer: {
    search: searchReducer,
    buyer: buyerReducer,
    findJobs: findJobsReducer,
    companyLook: companyReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  devTools: process.env.NODE_ENV === "development",
});
