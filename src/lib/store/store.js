// src/lib/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice.js';

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  devTools: process.env.NODE_ENV === 'development',
});