'use client';
import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import CustomImage from '../common/CustomImage';
import Button from '@/components/common/Button';
import StarRating from '@/components/common/StarRating';
import { LikeButton } from '../common/LikeButton';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  sku?: string;
  features?: string[];
}

interface CardLayoutProps {
  product: Product;
  viewType: 'grid' | 'list';
  onViewMore: (id: number) => void;
}

const CardLayout: React.FC<CardLayoutProps> = ({
  product,
  viewType,
  onViewMore,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // TODO: Add logic to save/remove from wishlist
  };

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow ${
        viewType === 'grid' ? 'w-full sm:max-w-xs' : 'w-full'
      }`}
    >
      {viewType === 'grid'
        ? renderGridLayout(
            product,
            onViewMore,
            isFavorite,
            handleToggleFavorite,
          )
        : renderListLayout(
            product,
            onViewMore,
            isFavorite,
            handleToggleFavorite,
          )}
    </div>
  );
};

// Render method for the grid layout
const renderGridLayout = (
  product: Product,
  onViewMore: (id: number) => void,
  isLiked: boolean,
  onLike: (e: React.MouseEvent<HTMLButtonElement>) => void,
) => (
  <div className="flex flex-col w-full h-[415px] gap-2">
    <div className="relative w-full h-56 p-2 flex-shrink-0">
      <CustomImage
        src={product.imageUrl}
        alt={product.name}
        fill
        style={{
          objectFit: 'cover',
          borderRadius: 10,
        }}
      />
      <LikeButton
        isLiked={isLiked}
        onLike={onLike}
        className="absolute bottom-3 right-3 hover:scale-110 transition-transform"
      />
    </div>
    <div className="flex flex-col justify-between gap-2 p-2 h-full">
      <div className="space-y-2">
        <h3 className="font-semibold text-md sm:text-lg truncate">
          {product.name}
        </h3>
        <p className="text-primary_1 font-bold text-base sm:text-lg">
          UGX {product.price.toLocaleString()}
        </p>
        <div className="flex items-center">
          <StarRating
            initialRating={product.rating || 0}
            maxRating={5}
            starSize={16}
            readOnly
          />
          <span className="ml-1 text-xs sm:text-sm text-gray-500">
            ({product.reviews || 0})
          </span>
        </div>
      </div>
      <Button
        onClick={() => onViewMore(product.id)}
        className="w-full h-10 sm:h-12 bg-transparent hover:text-white border-2 border-primary_1 text-primary_1 py-2 rounded-lg mt-2"
      >
        View more
      </Button>
    </div>
  </div>
);

// Render method for the list layout
const renderListLayout = (
  product: Product,
  onViewMore: (id: number) => void,
  isLiked: boolean,
  onLike: (e: React.MouseEvent<HTMLButtonElement>) => void,
) => (
  <div className="flex flex-col md:flex-row gap-2">
    <div className="relative w-full h-56 md:w-72 p-2 flex-shrink-0">
      <CustomImage
        src={product.imageUrl}
        alt={product.name}
        fill
        style={{
          objectFit: 'cover',
          borderRadius: 10,
        }}
      />
    </div>
    <div className="flex flex-col lg:flex-row gap-4 justify-between w-full p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-sm sm:text-base text-primary_1 font-medium">
          <StarRating
            initialRating={product.rating || 0}
            maxRating={5}
            starSize={16}
            readOnly
          />
          <span className="ml-1 text-gray-500">({product.reviews || 0})</span>
          <span className="ml-2 text-primary_1 font-semibold">Laptop</span>
        </div>

        <h3 className="font-semibold text-lg sm:text-xl truncate">
          {product.name}
        </h3>

        {product.sku && (
          <p className="text-xs sm:text-sm text-gray-500">SKU {product.sku}</p>
        )}

        {product.features && (
          <ul className="text-sm sm:text-base text-gray-600 mt-2 space-y-1">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <AiOutlineCheck className="text-primary_1" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col items-start justify-end mt-4">
        <div className="flex flex-col items-baseline gap-1 sm:gap-2">
          {product.originalPrice && (
            <span className="text-gray-400 line-through">
              UGX {product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-primary_1 text-xl sm:text-2xl font-bold">
            UGX {product.price.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Button
            onClick={() => onViewMore(product.id)}
            className="bg-primary_1 text-white py-2 px-4 sm:px-6 h-10 rounded-lg"
          >
            View more
          </Button>
          <LikeButton
            isLiked={isLiked}
            onLike={onLike}
            className="bg-transparent hover:bg-transparent border border-primary_1 text-primary_1 py-2 px-4 sm:px-6 h-10 rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
);

export default CardLayout;
