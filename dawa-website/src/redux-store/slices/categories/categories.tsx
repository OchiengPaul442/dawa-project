import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '@/types/category';
import { RootState } from '@/redux-store';

interface CategoriesState {
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  status: 'idle',
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setLoading: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setCategories, setLoading, setError } = categoriesSlice.actions;

export const selectedCategories = (state: RootState) =>
  state.categories.categories;
export default categoriesSlice.reducer;
