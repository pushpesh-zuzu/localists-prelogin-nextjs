// src/lib/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice.js";
import buyerReducer from "./buyerslice/buyerSlice.js";
import findJobsReducer from "./findjobslice.js";
import companyReducer from "./companyJobSlice.js";
import authReducer from "./Auth/authSlice";
import sellerSlice from "./sellerSlice/SellerSlice.js";
import notificationReducer from "./sellerSlice/notificationService.js";
export const store = configureStore({
  reducer: {
    search: searchReducer,
    buyer: buyerReducer,
    findJobs: findJobsReducer,
    companyLook: companyReducer,
    auth: authReducer,
    seller: sellerSlice,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  devTools: process.env.NODE_ENV === "development",
});
