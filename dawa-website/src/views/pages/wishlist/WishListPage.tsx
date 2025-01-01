'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import WishlistHeader from './WishlistHeader';
import ProductList from './ProductList';
import Button from '@/components/shared/Button';
import { sampleProducts } from '@/data/likes';

const WishlistPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>('date-added');
  const [visibleProducts, setVisibleProducts] = useState<number>(10);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await sampleProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSelectItem = useCallback((productId: number) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  const handleRemoveSelected = useCallback(() => {
    console.log('Removing items:', selectedItems);
    setSelectedItems([]);
  }, [selectedItems]);

  const sortedProducts = useMemo(() => {
    const productsCopy = [...products];
    switch (sortBy) {
      case 'price-low':
        return productsCopy.sort(
          (a, b) =>
            parseInt(a.price.replace(/[^0-9]/g, '')) -
            parseInt(b.price.replace(/[^0-9]/g, '')),
        );
      case 'price-high':
        return productsCopy.sort(
          (a, b) =>
            parseInt(b.price.replace(/[^0-9]/g, '')) -
            parseInt(a.price.replace(/[^0-9]/g, '')),
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

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedItems(
        checked
          ? sortedProducts.slice(0, visibleProducts).map((p) => p.id)
          : [],
      );
    },
    [sortedProducts, visibleProducts],
  );

  const displayedProducts = useMemo(() => {
    return sortedProducts.slice(0, visibleProducts);
  }, [sortedProducts, visibleProducts]);

  const handleLoadMore = useCallback(() => {
    setVisibleProducts((prev) => prev + 10);
  }, []);

  const allSelected = useMemo(() => {
    return (
      displayedProducts.length > 0 &&
      displayedProducts.every((p) => selectedItems.includes(p.id))
    );
  }, [displayedProducts, selectedItems]);

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
        onRemoveItem={handleRemoveSelected}
        isLoading={loading}
      />

      {visibleProducts < sortedProducts.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={handleLoadMore} className="min-w-[200px]">
            Load More
          </Button>
        </div>
      )}

      {sortedProducts.length === 0 && (
        <div className="flex justify-center mt-8">
          <p className="text-gray-500">Your wishlist is empty.</p>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
