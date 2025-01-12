'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { LikeButton } from '@/components/shared/LikeButton';
import CustomImage from '@/components/shared/CustomImage';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    images: any[];
    liked: boolean;
  };
  onLike: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ product, onLike }) => {
    const router = useRouter();

    const handleCardClick = useCallback(() => {
      router.push(`/prod/${product.id}`);
    }, [router, product.id]);

    const handleLikeClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onLike(product.id);
      },
      [onLike, product.id],
    );

    // get the first item from the images array
    const image = product.images[0].image_url;

    return (
      <Card
        onClick={handleCardClick}
        className="overflow-hidden cursor-pointer transition-shadow hover:shadow-lg h-full"
      >
        <CardContent className="p-0">
          {/* Product Image and Like Button */}
          <div className="relative aspect-square w-full">
            <CustomImage
              src={image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />

            <LikeButton
              isLiked={product.liked}
              onLike={handleLikeClick}
              className="absolute bottom-2 right-2 z-10"
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-start m-0 p-0">
          <div className="p-2">
            <h3 className="font-medium text-sm line-clamp-2 mb-1">
              {product.name}
            </h3>
            <p className="text-primary_1 font-semibold text-sm">
              UGX {product.price.toLocaleString()}
            </p>
          </div>
        </CardFooter>
      </Card>
    );
  },
);

ProductCard.displayName = 'ProductCard';

export default ProductCard;
