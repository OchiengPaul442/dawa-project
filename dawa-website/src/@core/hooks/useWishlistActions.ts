'use client';

import { useEffect } from 'react';
import { useSWRConfig } from 'swr';
import useSWR from 'swr';

import { swrOptions } from '../swrConfig';
import { getUserWishList, toggleWishlistItem } from '@/app/server/wishList/api';
import { useAuth } from '@core/hooks/use-auth';

import { useDispatch, useSelector } from '@/redux-store/hooks';
import {
  addToWishlist,
  removeFromWishlist,
  setWishlist,
} from '@redux-store/slices/wishlist/wishlistSlice';

export function useWishlistActions() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { mutate: globalMutate } = useSWRConfig();

  const { data, error, isLoading } = useSWR(
    user ? 'userWishlist' : null,
    getUserWishList,
    swrOptions,
  );

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const itemIds = data.map((item: any) => item.id);
      dispatch(setWishlist(itemIds));
    }
  }, [data, dispatch]);

  const wishlist: any = useSelector((state) => state.wishlist.items);
  const wishlistCount = useSelector((state) => state.wishlist.count);

  function isInWishlist(productId: string) {
    return wishlist.includes(productId);
  }

  async function toggle(productId: string) {
    if (!user) return;

    const currentlyInWishlist = isInWishlist(productId);

    if (currentlyInWishlist) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }

    globalMutate(
      'userWishlist',
      (existingData: any[] = []) => {
        if (!Array.isArray(existingData)) return [];
        return currentlyInWishlist
          ? existingData.filter((item) => item.id !== productId)
          : [...existingData, { id: productId }];
      },
      false,
    );

    try {
      await toggleWishlistItem('/wishunwish/', { arg: { item_id: productId } });
      globalMutate('userWishlist');
    } catch (err) {
      console.error(err);
      if (currentlyInWishlist) {
        dispatch(addToWishlist(productId));
      } else {
        dispatch(removeFromWishlist(productId));
      }
      globalMutate('userWishlist');
    }
  }

  async function removeItem(productId: string) {
    if (!user) return;
    if (!isInWishlist(productId)) return;

    dispatch(removeFromWishlist(productId));

    globalMutate(
      'userWishlist',
      (existingData: any[] = []) => {
        if (!Array.isArray(existingData)) return [];
        return existingData.filter((item) => item.id !== productId);
      },
      false,
    );

    try {
      await toggleWishlistItem('/wishunwish/', { arg: { item_id: productId } });
      globalMutate('userWishlist');
    } catch (err) {
      console.error(err);
      dispatch(addToWishlist(productId));
      globalMutate('userWishlist');
    }
  }

  return {
    rawWishlist: data || [],
    isLoading,
    isError: !!error,
    wishlist,
    wishlistCount,
    toggle,
    removeItem,
    isInWishlist,
  };
}
