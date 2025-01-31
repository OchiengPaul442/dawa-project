// WishlistPage.tsx
'use client';

import React, { useState, useMemo, useCallback } from 'react';
import WishlistHeader from './WishlistHeader';
import ProductList from './ProductList';
import Button from '@/components/shared/Button';
import { useWishlistActions } from '@core/hooks/useWishlistActions';
import type { Product } from '@/types/wishList';

const WishlistPage = () => {
  const { rawWishlist, isLoading } = useWishlistActions();

  const [sortBy, setSortBy] = useState<string>('date-added');
  const [visibleProducts, setVisibleProducts] = useState<number>(10);

  // Convert item price to number so that arithmetic operations work
  const products: Product[] = useMemo(() => {
    if (!rawWishlist) return [];
    return rawWishlist.map((item: any) => ({
      id: item.id,
      name: item.item_name,
      price: Number(item.item_price), // Convert string to number here
      originalPrice: 0, // Or use Number(item.original_price) if applicable
      discount: 0,
      image: item.images?.[0]?.image || '',
      rating: 0,
      orders: 0,
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
