// src/lib/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice.js';
import buyerReducer from './buyerslice/buyerSlice.js';
import findJobsReducer from './findjobslice.js';  // name change

export const store = configureStore({
  reducer: {
    search: searchReducer,
    buyer: buyerReducer, 
    findJobs: findJobsReducer  // ✅ ye change karo
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  devTools: process.env.NODE_ENV === 'development',
});