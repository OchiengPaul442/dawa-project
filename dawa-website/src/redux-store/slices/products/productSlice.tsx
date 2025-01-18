import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  selectedProductId: null,
  lastSelectedAt: null,
};

const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<any>) => {
      state.selectedProductId = action.payload;
      state.lastSelectedAt = new Date().toISOString();
    },
    clearSelectedProduct: (state) => {
      state.selectedProductId = null;
      state.lastSelectedAt = null;
    },
  },
});

// Export actions
export const { setSelectedProduct, clearSelectedProduct } =
  selectedProductSlice.actions;

// Export reducer
export default selectedProductSlice.reducer;
