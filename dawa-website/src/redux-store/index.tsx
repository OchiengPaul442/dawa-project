'use client';

import { configureStore } from '@reduxjs/toolkit';
import authDialogReducer from './slices/authDialog/authDialogSlice';
import categoriesReducer from './slices/categories/categories';
import categoryReducer from './slices/categories/categorySlice';
import productReducer from './slices/products/productSlice';
import wishlistReducer from './slices/wishlist/wishlistSlice';

export const store = configureStore({
  reducer: {
    authDialog: authDialogReducer,
    categories: categoriesReducer,
    category: categoryReducer,
    product: productReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
