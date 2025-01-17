'use client';

import { useEffect } from 'react';
import { useSWRConfig } from 'swr';
import { swrOptions } from '../swrConfig';
import useSWR from 'swr';
import {
  addToWishlist,
  removeFromWishlist,
  setWishlist,
} from '@redux-store/slices/wishlist/wishlistSlice';
import { getUserWishList, toggleWishlistItem } from '@/app/server/wishList/api';
import { useAuth } from '@core/hooks/use-auth';
import { useDispatch, useSelector } from '@/redux-store/hooks';

export function useWishlistActions() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { mutate: globalMutate } = useSWRConfig();

  // Fetch wishlist data using SWR
  const { data, error, isLoading } = useSWR(
    'userWishlist',
    getUserWishList,
    swrOptions,
  );

  // On successful fetch, sync the wishlist IDs to Redux
  useEffect(() => {
    if (data && Array.isArray(data)) {
      dispatch(setWishlist(data.map((item: any) => item.id)));
    }
  }, [data, dispatch]);

  // Access the current wishlist items from Redux state
  const wishlist: any = useSelector((state) => state.wishlist.items);

  // Check if a product is in the wishlist
  function isInWishlist(productId: string): boolean {
    return wishlist.includes(productId);
  }

  // Toggle function with optimistic updates
  async function toggle(productId: string) {
    if (!user) {
      // Optionally handle unauthenticated user case
      return;
    }

    const alreadyLiked = isInWishlist(productId);

    // Optimistic update
    if (alreadyLiked) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }

    // Call API to toggle wishlist item
    try {
      await toggleWishlistItem('/wishunwish/', { arg: { item_id: productId } });
      globalMutate('userWishlist');
    } catch (err) {
      // Revert optimistic update on error
      if (alreadyLiked) {
        dispatch(addToWishlist(productId));
      } else {
        dispatch(removeFromWishlist(productId));
      }
      console.error(err);
    }
  }

  return {
    wishlist,
    rawWishlist: data || [],
    isLoading,
    isError: !!error,
    isInWishlist,
    toggle,
  };
}
