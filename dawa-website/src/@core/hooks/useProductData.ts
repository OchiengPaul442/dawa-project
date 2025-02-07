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
  updateProduct,
  deleteProductImage,
} from '@/app/server/products/api';
import {
  fetchUserProfile,
  updateUserProfile,
  changeUserPassword,
} from '@/app/server/auth/api';
import { useMemo } from 'react';
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

//Hooks to send and receive messages
export function useMessages() {
  const swrOptions = {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    // Optionally enable periodic refresh:
    // refreshInterval: 5000,
  };

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

export const useUserProfile = () => {
  // The SWR hook handles fetching, caching, and revalidation.
  const { data, error, isLoading, mutate } = useSWR<any>(
    '/getuserprofile/',
    fetchUserProfile,
    swrOptions,
  );

  return {
    userProfile: data?.data?.user_profile || null,
    items: data?.data?.items || [],
    isLoading,
    isError: error,
    mutate,
  };
};

export function useUpdateUserProfile() {
  const { trigger, isMutating, error } = useSWRMutation<
    any,
    any,
    string,
    FormData
  >('/updateuserprofile/', (_key, { arg }) => updateUserProfile(arg));

  return {
    updateUserProfile: trigger,
    isLoading: isMutating,
    error,
  };
}
export function useChangeUserPassword() {
  const { trigger, isMutating, error } = useSWRMutation<any, any, string, any>(
    '/changepassword/',
    changeUserPassword,
  );

  return {
    changeUserPassword: trigger,
    isLoading: isMutating,
    error,
  };
}

// Update product data
export const useUpdateProduct = () => {
  const { trigger, isMutating, error } = useSWRMutation<any, any, string, any>(
    '/updateitem/',
    updateProduct,
  );

  return {
    updateProduct: trigger,
    isLoading: isMutating,
    error,
  };
};

// delete product image
export const useDeleteItemImage = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    '/deleteitemimage/',
    deleteProductImage,
  );

  return {
    deleteItemImage: trigger,
    data,
    error,
    isMutating,
  };
};
