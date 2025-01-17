'use client';

import React from 'react';
import ImportedProductCard from './GridCardLayout';
import ListLayout from './ListCardLayout';

interface Image {
  image_id: string;
  image_url: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  images: Image[];
  sku?: string;
  features?: string[];
}

interface CardLayoutProps {
  product: Product;
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
    // Ensure there's always an imageUrl even if images is empty
    imageUrl: product.images[0]?.image_url || '',
  };

  if (viewType === 'grid') {
    return <ProductCard product={transformedProduct} />;
  } else {
    return <ListLayout product={transformedProduct} />;
  }
};

export default CardLayout;
