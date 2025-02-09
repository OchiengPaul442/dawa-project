// src/contexts/WishlistContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useSWRConfig } from 'swr';
import useSWR from 'swr';
import { getUserWishList, toggleWishlistItem } from '@/app/server/wishList/api';
import { swrOptions } from '@core/swrConfig';
import { useAuth } from '@core/hooks/use-auth';
import type { Product } from '@/types/wishList';

interface WishlistContextProps {
  // Full product objects (optimistically updated)
  rawWishlist: Product[];
  // An array of product IDs for convenience
  wishlist: string[];
  wishlistCount: number;
  isLoading: boolean;
  toggle: (productId: string, productData?: Product) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  refetchWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined,
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const { mutate: globalMutate } = useSWRConfig();

  // Only fetch wishlist if a user exists.
  const { data, isLoading, mutate } = useSWR(
    user ? 'userWishlist' : null,
    getUserWishList,
    swrOptions,
  );

  // Ensure rawWishlist is an array of Product objects.
  const rawWishlist: Product[] = Array.isArray(data) ? data : [];

  // Local state: array of product IDs (for quick lookup)
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Update the local ID array only when rawWishlist changes.
  useEffect(() => {
    const ids = rawWishlist.map((item) => item.id);
    if (JSON.stringify(ids) !== JSON.stringify(wishlist)) {
      setWishlist(ids);
    }
  }, [rawWishlist, wishlist]);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  );

  const toggle = useCallback(
    async (productId: string, productData?: Product) => {
      if (!user) return;
      const currentlyInWishlist = isInWishlist(productId);

      // Optimistically update local IDs.
      setWishlist((prev) =>
        currentlyInWishlist
          ? prev.filter((id) => id !== productId)
          : [...prev, productId],
      );

      console.info('productData', productData);

      // Optimistically update the SWR cache.
      globalMutate(
        'userWishlist',
        (existingData: Product[] = []) => {
          if (!Array.isArray(existingData)) return [];
          if (currentlyInWishlist) {
            // Remove the product from the wishlist.
            return existingData.filter((item) => item.id !== productId);
          } else {
            // Add productData if provided; otherwise, add a minimal object.
            const newItem = productData
              ? productData
              : {
                  id: productId,
                  name: '',
                  price: '',
                  image: '',
                  dateAdded: '',
                  originalPrice: '0',
                  discount: 0,
                  orders: 0,
                };
            return [...existingData, newItem];
          }
        },
        false,
      );

      try {
        // Fire off the API call in the background.
        await toggleWishlistItem('/wishunwish/', {
          arg: { item_id: productId },
        });
        // Revalidate the wishlist data from the server.
        mutate();
      } catch (err) {
        console.error(err);
        // On error, revert the optimistic update.
        setWishlist((prev) =>
          currentlyInWishlist
            ? [...prev, productId]
            : prev.filter((id) => id !== productId),
        );
        globalMutate('userWishlist');
      }
    },
    [user, isInWishlist, globalMutate, mutate],
  );

  const removeItem = useCallback(
    async (productId: string) => {
      if (!user || !isInWishlist(productId)) return;

      // Optimistically remove the product.
      setWishlist((prev) => prev.filter((id) => id !== productId));
      globalMutate(
        'userWishlist',
        (existingData: Product[] = []) => {
          if (!Array.isArray(existingData)) return [];
          return existingData.filter((item) => item.id !== productId);
        },
        false,
      );
      try {
        await toggleWishlistItem('/wishunwish/', {
          arg: { item_id: productId },
        });
        mutate();
      } catch (err) {
        console.error(err);
        // On error, revert removal.
        setWishlist((prev) => [...prev, productId]);
        globalMutate('userWishlist');
      }
    },
    [user, isInWishlist, globalMutate, mutate],
  );

  const refetchWishlist = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <WishlistContext.Provider
      value={{
        rawWishlist,
        wishlist,
        wishlistCount: wishlist.length,
        isLoading,
        toggle,
        removeItem,
        isInWishlist,
        refetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextProps => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
