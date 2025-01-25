'use client';

import React from 'react';
import ImportedProductCard from './GridCardLayout';
import ListLayout from './ListCardLayout';
import { SimilarItem } from '@/types/product';

interface CardLayoutProps {
  product: SimilarItem;
  viewType: 'grid' | 'list';
}

// 1) Extract the prop types from the imported grid card
type ProductCardPropsType = React.ComponentProps<typeof ImportedProductCard>;

// 2) Re-assign to maintain correct prop types for the grid card
const ProductCard = ImportedProductCard as React.FC<ProductCardPropsType>;

const CardLayout: React.FC<CardLayoutProps> = ({ product, viewType }) => {
  // Prepare a common object for both layouts
  const transformedProduct = {
    ...product,
  };

  if (viewType === 'grid') {
    return <ProductCard product={transformedProduct} />;
  } else {
    return <ListLayout product={transformedProduct} />;
  }
};

export default CardLayout;
