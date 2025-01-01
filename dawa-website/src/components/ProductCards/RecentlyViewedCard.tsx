'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import CustomImage from '@/components/shared/CustomImage';
import StarRating from '@/components/shared/StarRating';

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  rating: number;
  reviews: number;
}

interface RecentlyViewedCardProps {
  product: Product;
  onClick: () => void;
}

const RecentlyViewedCard: React.FC<RecentlyViewedCardProps> = ({
  product,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className="flex flex-col items-center p-2 w-full max-w-[273px] cursor-pointer transform transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
    >
      <div className="w-full h-[120px] sm:h-[139px] relative mb-2">
        <CustomImage
          src={product.imageUrl}
          alt={product.name}
          fill
          style={{ objectFit: 'cover', borderRadius: 10 }}
        />
      </div>

      <div className="w-full flex flex-col justify-between">
        <h3 className="text-sm font-semibold leading-tight line-clamp-2 mb-2">
          {product.name}
        </h3>

        <div className="flex flex-col items-start gap-1">
          <p className="text-primary_1 font-bold">{product.price}</p>
          <div className="flex items-center">
            <StarRating
              initialRating={product.rating}
              maxRating={4}
              starSize={14}
              readOnly
            />
            <span className="ml-1 text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecentlyViewedCard;
