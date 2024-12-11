'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CustomImage from '../common/CustomImage';
import StarRating from '@/components/common/StarRating';
import { LikeButton } from '../common/LikeButton';
import { AiOutlineCheck } from 'react-icons/ai';
import { cn } from '@/lib/utils';

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
  };

  return (
    <Card
      className={cn(
        'overflow-hidden transition-shadow hover:shadow-lg',
        viewType === 'grid' ? 'w-full' : 'w-full',
      )}
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
    </Card>
  );
};

const renderGridLayout = (
  product: Product,
  onViewMore: (id: number) => void,
  isLiked: boolean,
  onLike: (e: React.MouseEvent<HTMLButtonElement>) => void,
) => (
  <>
    <div className="relative aspect-square w-full">
      <CustomImage
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      <LikeButton
        isLiked={isLiked}
        onLike={onLike}
        className="absolute bottom-2 right-2 z-10 hover:scale-110 transition-transform"
      />
    </div>
    <CardContent className="p-3">
      <h3 className="font-semibold text-sm sm:text-base truncate mb-1">
        {product.name}
      </h3>
      <p className="text-primary_1 font-bold text-base sm:text-lg mb-1">
        UGX {product.price.toLocaleString()}
      </p>
      <div className="flex items-center">
        <StarRating
          initialRating={product.rating || 0}
          maxRating={5}
          starSize={12}
          readOnly
        />
        <span className="ml-1 text-xs text-muted-foreground">
          ({product.reviews || 0})
        </span>
      </div>
    </CardContent>
    <CardFooter className="p-3 pt-0">
      <Button
        onClick={() => onViewMore(product.id)}
        className="w-full text-xs sm:text-sm"
        variant="outline"
      >
        View more
      </Button>
    </CardFooter>
  </>
);

const renderListLayout = (
  product: Product,
  onViewMore: (id: number) => void,
  isLiked: boolean,
  onLike: (e: React.MouseEvent<HTMLButtonElement>) => void,
) => (
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
    <CardContent className="flex flex-col sm:flex-row justify-between w-full p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-sm text-primary font-medium">
          <StarRating
            initialRating={product.rating || 0}
            maxRating={5}
            starSize={16}
            readOnly
          />
          <span className="ml-1 text-muted-foreground">
            ({product.reviews || 0})
          </span>
        </div>

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
    </CardContent>
  </div>
);

export default CardLayout;
