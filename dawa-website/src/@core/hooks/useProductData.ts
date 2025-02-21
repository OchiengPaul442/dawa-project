'use client';

import useSWR, { SWRConfiguration } from 'swr';
import useSWRInfinite from 'swr/infinite';
import useSWRMutation from 'swr/mutation';
import { useCallback, useMemo, useRef, useEffect } from 'react';
import {
  getProductsList,
  getPromotedProductsList,
  getCategoryData,
  addNewProduct,
  getProductDetails,
  reportAbuse,
  sendReview,
  updateProduct,
  deleteProductImage,
} from '@/app/server/products/api';
import { getShopData } from '@/app/server/my-shop/api';
import {
  fetchUserProfile,
  updateUserProfile,
  changeUserPassword,
} from '@/app/server/auth/api';
import { getMessages, sendMessage } from '@/app/server/messages/api';
import { SendMessagePayload } from '@/types/message';
import { ProductUploadProps, TrendingProductsResponse } from '@/types/product';
import { ReportAbuseProps } from '@/types/reportAbuse';
import {
  getFaqs,
  subscribeToNewsletter,
  contactUs,
} from '@/app/server/faqs_newLetter_contactUs/api';
import { ContactUsPayload, SubscribePayload } from '@/types/contact-us';
import { search } from '@/app/server/search/api';
import { swrOptions } from '../swrConfig';

/**
 * Helper to remove duplicate products based on their id.
 */
function deduplicateProducts(products: any[]): any[] {
  const uniqueMap = new Map<number, any>();
  products.forEach((product) => {
    uniqueMap.set(product.id, product);
  });
  return Array.from(uniqueMap.values());
}

/**
 * useProductsData accepts an optional body object that will be sent on the initial request.
 * Changing the body creates a new stable key to trigger revalidation.
 */
export function useProductsData(body?: any) {
  const bodyKey = useMemo(() => (body ? JSON.stringify(body) : null), [body]);

  const getKey = useCallback(
    (
      pageIndex: number,
      previousPageData: TrendingProductsResponse | null,
    ): string | null => {
      if (previousPageData && !previousPageData.next) return null;
      if (pageIndex === 0)
        return bodyKey
          ? `/getitems/?body=${encodeURIComponent(bodyKey)}`
          : '/getitems/';
      return previousPageData!.next;
    },
    [bodyKey],
  );

  const { data, error, size, setSize, mutate } =
    useSWRInfinite<TrendingProductsResponse>(
      getKey,
      (url: string) => getProductsList(url, body),
      {
        revalidateAll: false,
        revalidateOnFocus: false,
      },
    );

  // Flatten pages and deduplicate by id
  const rawProductsData = data ? data.flatMap((page) => page.results.data) : [];
  const productsData = deduplicateProducts(rawProductsData);
  const totalCount = data?.[0]?.count || 0;
  const nextPageUrl = data?.[data.length - 1]?.next || null;
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  return {
    productsData,
    totalCount,
    nextPageUrl,
    isLoading: isLoadingMore,
    isError: error,
    mutate,
    size,
    setSize,
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

// Hooks to send and receive messages
export function useMessages() {
  // Custom options for messages (if needed) can override swrOptions
  const messagesOptions: SWRConfiguration = {
    ...swrOptions,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  };

  const { data, error, isLoading, mutate } = useSWR(
    'messages',
    getMessages,
    messagesOptions,
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
    any,
    any,
    string,
    ProductUploadProps
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
    productData: productData?.data,
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
  const userOptions: SWRConfiguration = {
    ...swrOptions,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  };

  const { data, error, isLoading, mutate } = useSWR<any>(
    '/getuserprofile/',
    fetchUserProfile,
    userOptions,
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

export const useShopData = (userId: any) => {
  const { data, error, isLoading, mutate } = useSWR<any>(
    userId ? [`/getshopprofile`, userId] : null,
    () => getShopData('/getshopprofile/', { user_id: userId }),
  );

  return {
    shopData: data?.data || null,
    isLoading,
    isError: error,
    mutate,
  };
};

export const useFaqs = () => {
  const { data, error, isLoading, mutate } = useSWR(
    'faqs',
    getFaqs,
    swrOptions,
  );

  return {
    faqsData: data || [],
    isLoading,
    isError: error,
    mutate,
  };
};

export const useSubscribeToNewsletter = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    any,
    any,
    string,
    SubscribePayload
  >('/subscribe/', subscribeToNewsletter);

  return {
    subscribeToNewsletter: trigger,
    isLoading: isMutating,
    error,
  };
};

export const useContactUs = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    any,
    any,
    string,
    ContactUsPayload
  >('/contactus/', contactUs);

  return {
    contactUs: trigger,
    isLoading: isMutating,
    error,
  };
};

/**
 * useSearchProducts implements proper cancellation using a ref to avoid lingering requests.
 */
export const useSearchProducts = (query: string) => {
  // Store the current AbortController in a ref
  const controllerRef = useRef<AbortController | null>(null);

  // Fetcher wrapped in useCallback to ensure stable identity across renders
  const fetcher = useCallback(() => {
    // Abort any previous pending request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;

    // Pass the signal to the search API
    return search(query, controller.signal);
  }, [query]);

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  const { data, error, mutate, isValidating } = useSWR(
    query ? ['search', query] : null,
    fetcher,
    swrOptions,
  );

  return {
    searchQuery: data?.search_query || '',
    productsData: data?.data || [],
    status: data?.status || 0,
    isLoading: query ? !data && !error : false,
    isError: error,
    mutate,
    isValidating,
  };
};
