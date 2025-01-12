'use client';

import useSWR from 'swr';
import {
  getTrendingProductsList,
  getCategoriesList,
  getCategoryData,
} from '@/app/server/products/api';
import { setCategories } from '@/redux-store/slices/categories/categories';
import { useEffect, useMemo } from 'react';
import { useDispatch } from '@/redux-store/hooks';
import { swrOptions } from '../swrConfig';

export function useProducts() {
  const { data, error, isLoading, mutate } = useSWR(
    'products',
    getTrendingProductsList,
    swrOptions,
  );

  return {
    productsData: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

export function useCategories() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSWR(
    'categories',
    getCategoriesList,
    swrOptions,
  );

  useEffect(() => {
    if (data?.data) {
      dispatch(setCategories(data.data));
    }
  }, [data, dispatch]);

  return {
    categories: data?.data || [],
    isLoading,
    isError: error,
  };
}
export function useCategoryData({
  selectedCategory,
  selectedSubcategory,
}: any) {
  const body = useMemo(() => {
    if (selectedSubcategory) {
      return { subcategory_id: selectedSubcategory.id };
    } else if (selectedCategory) {
      return { category_id: selectedCategory.id };
    }
    return null;
  }, [selectedCategory, selectedSubcategory]);

  const shouldFetch = body !== null;

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? ['categoryData', JSON.stringify(body)] : null,
    () => getCategoryData(body),
    {
      ...swrOptions,
      revalidateOnFocus: false,
    },
  );

  return { data, error, isLoading, mutate };
}
