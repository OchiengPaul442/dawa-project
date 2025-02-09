// src/app/wishlist/WishlistPage.tsx
'use client';

import React, { useState, useMemo, useCallback } from 'react';
import WishlistHeader from './WishlistHeader';
import ProductList from './ProductList';
import Button from '@/components/shared/Button';
import { useWishlist } from '@/contexts/WishlistContext';
import type { Product } from '@/types/wishList';

const WishlistPage = () => {
  const { rawWishlist, isLoading } = useWishlist();

  const [sortBy, setSortBy] = useState<string>('date-added');
  const [visibleProducts, setVisibleProducts] = useState<number>(10);

  // Map raw wishlist data (assumed to be Product objects) to our local array.
  // If the API data already matches the Product type, this mapping may be trivial.
  const products: Product[] = useMemo(() => {
    return rawWishlist.map((item: any) => ({
      id: item.id,
      name: item.item_name,
      price: item.item_price, // Assumed to be string; convert if needed.
      originalPrice: item.original_price ? item.original_price : '0',
      discount: 0,
      image: item.images?.[0]?.image || '',
      rating: item.rating || 0,
      orders: item.orders || 0,
      dateAdded: item.created_at,
      description: item.item_description,
    }));
  }, [rawWishlist]);

  const sortedProducts: Product[] = useMemo(() => {
    const copy = [...products];
    switch (sortBy) {
      case 'price-low':
        return copy.sort((a, b) => Number(a.price) - Number(b.price));
      case 'price-high':
        return copy.sort((a, b) => Number(b.price) - Number(a.price));
      case 'orders':
        return copy.sort((a, b) => (b.orders ?? 0) - (a.orders ?? 0));
      case 'date-added':
      default:
        return copy.sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
        );
    }
  }, [products, sortBy]);

  const displayedProducts = useMemo(
    () => sortedProducts.slice(0, visibleProducts),
    [sortedProducts, visibleProducts],
  );

  const handleLoadMore = useCallback(() => {
    setVisibleProducts((prev) => prev + 10);
  }, []);

  return (
    <>
      <WishlistHeader
        totalItems={sortedProducts.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <ProductList products={displayedProducts} isLoading={isLoading} />

      {visibleProducts < sortedProducts.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={handleLoadMore} className="min-w-[200px]">
            Load More
          </Button>
        </div>
      )}

      {!isLoading && sortedProducts.length === 0 && (
        <div className="flex justify-center mt-8">
          <p className="text-gray-500">Your wishlist is empty.</p>
        </div>
      )}
    </>
  );
};

export default WishlistPage;
