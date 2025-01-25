'use client';

import useSWR from 'swr';
import {
  getTrendingProductsList,
  getPromotedProductsList,
  getCategoryData,
  addNewProduct,
  getProductDetails,
  reportAbuse,
  sendReview,
} from '@/app/server/products/api';
import { useEffect, useMemo } from 'react';
import { useDispatch } from '@/redux-store/hooks';
import { swrOptions } from '../swrConfig';
import useSWRMutation from 'swr/mutation';
import { getMessages, sendMessage } from '@/app/server/messages/api';
import { SendMessagePayload } from '@/types/message';
import { ProductUploadProps } from '@/types/product';
import { ReportAbuseProps } from '@/types/reportAbuse';

export function useTrendingProducts() {
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

export function useMessages() {
  const { data, error, isLoading, mutate } = useSWR(
    'messages',
    getMessages,
    swrOptions,
  );

  return {
    messagesData: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

export function useSendMessage() {
  const { trigger, isMutating, error } = useSWRMutation<
    any,
    any,
    string,
    SendMessagePayload
  >('/sendmessage/', sendMessage);

  return {
    sendMessage: trigger,
    isSending: isMutating,
    error,
  };
}

export function useAddNewProduct() {
  const { trigger, isMutating, error } = useSWRMutation<
    any, // Replace with the actual response type if available
    any, // Replace with the actual error type if available
    string, // Key type
    ProductUploadProps // Argument type
  >('/additem/', addNewProduct);

  return {
    addProduct: trigger,
    isAdding: isMutating,
    error,
  };
}

export const useProductDetails = (itemId: any) => {
  const {
    data: productData,
    error,
    isLoading,
    mutate,
  } = useSWR(
    [`/getitemdetails`, itemId],
    async () => {
      const response = await getProductDetails({ item_id: itemId });
      return response;
    },
    swrOptions,
  );

  return {
    productData: productData?.data as any,
    isError: !!error,
    isLoading,
    mutate,
  };
};

export function usePromotedProducts() {
  const { data, error, isLoading, mutate } = useSWR(
    'promotedProducts',
    getPromotedProductsList,
    swrOptions,
  );

  return {
    productsData: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

export function useReportAbuse() {
  const { trigger, isMutating, error } = useSWRMutation<
    any,
    any,
    string,
    ReportAbuseProps
  >('/makereportofabuse/', reportAbuse);

  return {
    reportAbuse: trigger,
    isLoading: isMutating,
    error,
  };
}

export function useSendReviews() {
  const { trigger, isMutating, error } = useSWRMutation<any, any, string, any>(
    '/submitreview/',
    sendReview,
  );

  return {
    sendReviews: trigger,
    isLoading: isMutating,
    error,
  };
}
