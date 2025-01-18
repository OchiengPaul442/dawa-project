'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  items: string[]; // store only item IDs (to keep it simple)
  count: number; // track the number of wishlist items
}

const initialState: WishlistState = {
  items: [],
  count: 0,
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<string[]>) {
      state.items = action.payload;
      state.count = action.payload.length;
    },
    addToWishlist(state, action: PayloadAction<string>) {
      const productId = action.payload;
      if (!state.items.includes(productId)) {
        state.items.push(productId);
        state.count = state.items.length; // re-calc count
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      const productId = action.payload;
      state.items = state.items.filter((id) => id !== productId);
      state.count = state.items.length; // re-calc count
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
