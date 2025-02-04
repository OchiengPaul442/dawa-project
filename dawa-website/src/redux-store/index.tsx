import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authDialogReducer from './slices/authDialog/authDialogSlice';
import categoriesReducer from './slices/categories/categories';
import categoryReducer from './slices/categories/categorySlice';
import productReducer from './slices/products/productSlice';
import wishlistReducer from './slices/wishlist/wishlistSlice';
import chatReducer from './slices/chatApp/chatSlice';

const rootReducer = combineReducers({
  authDialog: authDialogReducer,
  categories: categoriesReducer,
  category: categoryReducer,
  product: productReducer,
  wishlist: wishlistReducer,
  chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function initializeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = initializeStore();
export type AppDispatch = typeof store.dispatch;
