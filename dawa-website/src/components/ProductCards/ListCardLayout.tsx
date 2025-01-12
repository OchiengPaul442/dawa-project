'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import CustomImage from '../shared/CustomImage';
import StarRating from '@/components/shared/StarRating';
import { LikeButton } from '@/components/shared/LikeButton';
import { AiOutlineCheck } from 'react-icons/ai';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number; // Make rating optional
  reviews?: number;
  imageUrl: string;
  sku?: string;
  features?: string[];
}

interface ListLayoutProps {
  product: Product;
  onViewMore: (id: number) => void;
  isLiked: boolean;
  onLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ListLayout: React.FC<ListLayoutProps> = ({
  product,
  onViewMore,
  isLiked,
  onLike,
}) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg w-full">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-48 md:w-64 aspect-square sm:aspect-auto sm:h-48 md:h-64">
          <CustomImage
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
            priority={false}
          />
        </div>
        <div className="flex flex-row justify-between w-full p-4">
          <div className="flex flex-col gap-2">
            {/* Conditionally render the rating */}
            {product.rating !== undefined && (
              <div className="flex items-center gap-1 text-sm text-primary font-medium">
                <StarRating
                  initialRating={product.rating}
                  maxRating={5}
                  starSize={16}
                  readOnly
                />
                <span className="ml-1 text-muted-foreground">
                  ({product.reviews || 0})
                </span>
              </div>
            )}

            <h3 className="font-semibold text-lg truncate">{product.name}</h3>

            {product.sku && (
              <p className="text-sm text-muted-foreground">SKU {product.sku}</p>
            )}

            {product.features && (
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <AiOutlineCheck className="text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col items-start justify-end mt-4 sm:mt-0">
            <div className="flex flex-col items-baseline gap-1">
              {product.originalPrice && (
                <span className="text-muted-foreground line-through">
                  UGX {product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-primary_1 text-xl font-bold">
                UGX {product.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <Button
                onClick={() => onViewMore(product.id)}
                className="bg-gray-700 text-primary-foreground"
              >
                View more
              </Button>
              <LikeButton
                isLiked={isLiked}
                onLike={onLike}
                className="bg-transparent hover:bg-transparent border border-primary text-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ListLayout;
