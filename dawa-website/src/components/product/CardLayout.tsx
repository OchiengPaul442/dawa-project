'use client';
import React from 'react';
import { AiOutlineCheck, AiOutlineHeart } from 'react-icons/ai';
import CustomImage from '../common/CustomImage';
import Button from '@/components/common/Button';
import StarRating from '@/components/common/StarRating';

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
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-md ${
        viewType === 'grid' ? 'w-full sm:max-w-xs' : 'w-full'
      }`}
    >
      {viewType === 'grid'
        ? renderGridLayout(product, onViewMore)
        : renderListLayout(product, onViewMore)}
    </div>
  );
};

// Render method for the grid layout
const renderGridLayout = (
  product: Product,
  onViewMore: (id: number) => void,
) => (
  <div className="flex flex-col w-full h-[415px] gap-4">
    <div className="relative w-full h-[370px]">
      <CustomImage
        src={product.imageUrl}
        alt={product.name}
        fill
        style={{
          objectFit: 'cover',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      />
    </div>
    <div className="flex flex-col justify-between gap-2 p-2 h-full">
      <div className="space-y-2">
        <h3 className="font-semibold text-md sm:text-lg line-clamp-2">
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
        className="w-full h-10 sm:h-12 bg-transparent hover:bg-transparent border-2 border-primary_1 text-primary_1 py-2 rounded-md mt-2"
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
) => (
  <div className="flex flex-col md:flex-row gap-4">
    <div className="relative w-full h-48 md:w-48 md:h-auto flex-shrink-0">
      <CustomImage
        src={product.imageUrl}
        alt={product.name}
        fill
        style={{
          objectFit: 'cover',
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
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

        <h3 className="font-semibold text-lg sm:text-xl">{product.name}</h3>

        {product.sku && (
          <p className="text-xs sm:text-sm text-gray-500">SKU {product.sku}</p>
        )}

        {product.features && (
          <ul className="text-sm sm:text-base text-gray-600 mt-2 space-y-1">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <AiOutlineCheck className="text-orange-500" />
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
            className="bg-primary_1 text-white py-2 px-4 sm:px-6 h-10 rounded-md"
          >
            View more
          </Button>
          <Button
            className="bg-transparent hover:bg-transparent border border-primary_1 text-primary_1 py-2 px-4 sm:px-6 h-10 rounded-md"
            onClick={() => {
              // TODO: Add to wishlist functionality
            }}
            icon={AiOutlineHeart}
          />
        </div>
      </div>
    </div>
  </div>
);

export default CardLayout;
