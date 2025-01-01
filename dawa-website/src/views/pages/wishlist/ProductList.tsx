'use client';

import React, { FC } from 'react';
import ProductCard from './ProductCard';
import SkeletonProductCard from './SkeletonProductCard';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: number;
  image: string;
  rating: number;
  orders: number;
  shipping: string;
  store: string;
  dateAdded: string;
  description?: string;
}

interface ProductListProps {
  products: Product[];
  selectedItems: number[];
  onSelectItem: (id: number) => void;
  onRemoveItem: (id: number) => void;
  isLoading?: boolean;
}

const ProductList: FC<ProductListProps> = ({
  products,
  selectedItems,
  onSelectItem,
  onRemoveItem,
  isLoading = false,
}) => {
  if (isLoading) {
    return <SkeletonProductCard />;
  }
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={selectedItems.includes(product.id)}
          onSelect={onSelectItem}
          onRemove={onRemoveItem}
        />
      ))}
    </div>
  );
};

export default React.memo(ProductList);
