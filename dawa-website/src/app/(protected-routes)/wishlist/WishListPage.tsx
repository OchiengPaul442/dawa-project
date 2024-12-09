'use client';

import React, { useState, useMemo, useCallback } from 'react';
import WishlistHeader from '@/components/Main/wishlist/WishlistHeader';
import ProductList from '@/components/Main/wishlist/ProductList';
import Button from '@/components/common/Button';

// Sample product data
const sampleProducts: any[] = [
  {
    id: 1,
    name: 'Professional Gaming Headset with Noise Cancelling Mic - 7.1 Surround Sound',
    description:
      'High-quality gaming headset featuring 7.1 surround sound, memory foam ear cups, and RGB lighting. Perfect for long gaming sessions.',
    price: 'UGX 89,000',
    originalPrice: 'UGX 178,000',
    discount: 50,
    image:
      'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fFByb2Zlc3Npb25hbCUyMEdhbWluZyUyMEhlYWRzZXQlMjB3aXRoJTIwTm9pc2UlMjBDYW5jZWxsaW5nJTIwTWljJTIwJTIwJTIwNy4xJTIwU3Vycm91bmQlMjBTb3VuZHxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.8,
    orders: 2536,
    dateAdded: '2024-03-15',
  },
  {
    id: 2,
    name: 'Wireless Bluetooth Speaker with Deep Bass and Long Battery Life',
    description:
      'Portable Bluetooth speaker with impressive sound quality, deep bass, and up to 12 hours of playtime. Ideal for outdoor gatherings.',
    price: 'UGX 45,000',
    originalPrice: 'UGX 90,000',
    discount: 50,
    image:
      'https://images.unsplash.com/photo-1531104985437-603d6490e6d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fFdpcmVsZXNzJTIwQmx1ZXRvb3RoJTIwU3BlYWtlciUyMHdpdGglMjBEZWVwJTIwQmFzcyUyMGFuZCUyMExvbmclMjBCYXR0ZXJ5JTIwTGlmZXxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.5,
    orders: 1800,
    dateAdded: '2024-04-10',
  },
  {
    id: 3,
    name: 'Smart Fitness Watch with Heart Rate Monitor and GPS',
    description:
      'Track your fitness goals with this smart watch featuring heart rate monitoring, built-in GPS, and multiple sport modes.',
    price: 'UGX 120,000',
    originalPrice: 'UGX 240,000',
    discount: 50,
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFNtYXJ0JTIwRml0bmVzcyUyMFdhdGNoJTIwd2l0aCUyMEhlYXJ0JTIwUmF0ZSUyME1vbml0b3IlMjBhbmQlMjBHUFN8ZW58MHx8MHx8fDA%3D',
    rating: 4.7,
    orders: 3200,
    dateAdded: '2024-02-20',
  },
];

const WishlistPage = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>('date-added');
  const [visibleProducts, setVisibleProducts] = useState<number>(10);

  // Handle selecting a single item
  const handleSelectItem = useCallback((productId: number) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  // Handle removing selected items
  const handleRemoveSelected = useCallback(() => {
    console.log('Removing items:', selectedItems);
    setSelectedItems([]);
  }, [selectedItems]);

  // Handle sorting
  const sortedProducts = useMemo(() => {
    const productsCopy = [...sampleProducts];
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
  }, [sortBy]);

  // Handle selecting all items
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

  // Get the currently visible products
  const displayedProducts = useMemo(() => {
    return sortedProducts.slice(0, visibleProducts);
  }, [sortedProducts, visibleProducts]);

  // Handle loading more products
  const handleLoadMore = useCallback(() => {
    setVisibleProducts((prev) => prev + 10);
  }, []);

  // Determine if all currently visible products are selected
  const allSelected = useMemo(() => {
    return (
      displayedProducts.length > 0 &&
      displayedProducts.every((p) => selectedItems.includes(p.id))
    );
  }, [displayedProducts, selectedItems]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 py-6 max-w-6xl">
        {/* Header Section */}
        <WishlistHeader
          totalItems={sortedProducts.length}
          allSelected={allSelected}
          onSelectAll={handleSelectAll}
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedCount={selectedItems.length}
          onRemoveSelected={handleRemoveSelected}
        />

        {/* Products List */}
        <ProductList
          products={displayedProducts}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onRemoveItem={handleRemoveSelected}
        />

        {/* Load More Button */}
        {visibleProducts < sortedProducts.length && (
          <div className="flex justify-center mt-8">
            <Button onClick={handleLoadMore} className="min-w-[200px]">
              Load More
            </Button>
          </div>
        )}

        {/* No Items Message */}
        {sortedProducts.length === 0 && (
          <div className="flex justify-center mt-8">
            <p className="text-gray-500">Your wishlist is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
