// components/ProductList.tsx
'use client';

import React, { FC, useCallback } from 'react';
import ProductCard from './ProductCard';

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
}

const ProductList: FC<ProductListProps> = ({
  products,
  selectedItems,
  onSelectItem,
  onRemoveItem,
}) => {
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
