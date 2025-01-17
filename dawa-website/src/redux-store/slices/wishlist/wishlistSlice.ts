'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  items: string[];
}

const initialState: WishlistState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<string[]>) {
      state.items = action.payload;
    },
    addToWishlist(state, action: PayloadAction<string>) {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((id) => id !== action.payload);
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
