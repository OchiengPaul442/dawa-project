'use client';

import React, { useState, useMemo, useCallback } from 'react';
import WishlistHeader from './WishlistHeader';
import ProductList from './ProductList';
import Button from '@/components/shared/Button';
import { useWishlistActions } from '@core/hooks/useWishlistActions';

const WishlistPage = () => {
  // Use the central hook to fetch wishlist data and state flags.
  const { rawWishlist, isLoading } = useWishlistActions();

  // Local state for selection, sorting, and pagination.
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('date-added');
  const [visibleProducts, setVisibleProducts] = useState<number>(10);

  // Transform the wishlist data from the hook into a shape suitable for Product components.
  const products = useMemo(() => {
    if (!rawWishlist) return [];
    return rawWishlist.map((item: any) => ({
      id: item.id,
      name: item.item_name,
      price: item.item_price,
      originalPrice: '',
      discount: 0,
      image: item.images?.[0]?.image || '',
      rating: 0,
      orders: 0,
      dateAdded: item.created_at,
      description: item.item_description,
    }));
  }, [rawWishlist]);

  // Sorting logic based on selected sort option.
  const sortedProducts = useMemo(() => {
    const productsCopy = [...products];
    switch (sortBy) {
      case 'price-low':
        return productsCopy.sort(
          (a, b) => parseInt(a.price) - parseInt(b.price),
        );
      case 'price-high':
        return productsCopy.sort(
          (a, b) => parseInt(b.price) - parseInt(a.price),
        );
      case 'orders':
        return productsCopy.sort((a, b) => b.orders - a.orders);
      case 'date-added':
      default:
        return productsCopy.sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
        );
    }
  }, [products, sortBy]);

  // Paginate products
  const displayedProducts = useMemo(
    () => sortedProducts.slice(0, visibleProducts),
    [sortedProducts, visibleProducts],
  );

  // Handler for selecting/deselecting an item.
  const handleSelectItem = useCallback((productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  // Single item removal handler
  const handleRemoveItem = useCallback((productId: string) => {
    setSelectedItems((prev) => prev.filter((id) => id !== productId));
    // Optionally: Use a wishlist action from the hook to remove the item server-side.
  }, []);

  // Multi-item removal handler
  const handleRemoveSelected = useCallback(() => {
    // Optionally remove selected items from the server via the hook.
    setSelectedItems([]);
  }, []);

  // Handler for selecting/deselecting all displayed items.
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedItems(displayedProducts.map((p) => p.id));
      } else {
        setSelectedItems([]);
      }
    },
    [displayedProducts],
  );

  // Load more products handler.
  const handleLoadMore = useCallback(() => {
    setVisibleProducts((prev) => prev + 10);
  }, []);

  // Check if all currently displayed products are selected.
  const allSelected = useMemo(
    () =>
      displayedProducts.length > 0 &&
      displayedProducts.every((p) => selectedItems.includes(p.id)),
    [displayedProducts, selectedItems],
  );

  return (
    <div className="my-8">
      <WishlistHeader
        totalItems={sortedProducts.length}
        allSelected={allSelected}
        onSelectAll={handleSelectAll}
        sortBy={sortBy}
        onSortChange={setSortBy}
        selectedCount={selectedItems.length}
        onRemoveSelected={handleRemoveSelected}
      />

      <ProductList
        products={displayedProducts}
        selectedItems={selectedItems}
        onSelectItem={handleSelectItem}
        onRemoveItem={handleRemoveItem}
        isLoading={isLoading}
      />

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
    </div>
  );
};

export default WishlistPage;
