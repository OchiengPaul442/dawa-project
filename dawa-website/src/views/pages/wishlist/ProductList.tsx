'use client';

import React, { FC } from 'react';
import ProductCard from './ProductCard';
import SkeletonProductCard from './SkeletonProductCard';
import { Product } from '@/types/wishList';

interface ProductListProps {
  products: Product[];
  selectedItems: string[];
  onSelectItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
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
        />
      ))}
    </div>
  );
};

export default React.memo(ProductList);
