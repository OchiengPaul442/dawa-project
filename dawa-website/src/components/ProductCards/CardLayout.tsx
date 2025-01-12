'use client';

import React, { useState } from 'react';
import ImportedProductCard from './GridCardLayout';
import ListLayout from './ListCardLayout';

interface Image {
  image_id: number;
  image_url: string;
}

interface Product {
  id: number;
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
  onViewMore: (id: number) => void;
}

// Define the expected props for ProductCard
type ProductCardPropsType = React.ComponentProps<typeof ImportedProductCard>;

// Assert the imported ProductCard with the expected prop types
const ProductCard = ImportedProductCard as React.FC<ProductCardPropsType>;

const CardLayout: React.FC<CardLayoutProps> = ({
  product,
  viewType,
  onViewMore,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  if (viewType === 'grid') {
    const transformedProduct = {
      ...product,
      imageUrl: product.images[0]?.image_url || '',
      liked: isFavorite,
    };

    return (
      <ProductCard
        product={transformedProduct}
        onLike={(id: number) => setIsFavorite((prev) => !prev)}
      />
    );
  } else {
    return (
      <ListLayout
        product={{
          ...product,
          imageUrl: product.images[0]?.image_url || '',
        }}
        onViewMore={onViewMore}
        isLiked={isFavorite}
        onLike={handleToggleFavorite}
      />
    );
  }
};

export default CardLayout;
