'use client';

import { configureStore } from '@reduxjs/toolkit';
import authDialogReducer from './slices/authDialog/authDialogSlice';

export const store = configureStore({
  reducer: {
    authDialog: authDialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
