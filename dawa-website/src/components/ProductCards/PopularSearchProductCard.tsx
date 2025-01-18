'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { LikeButton } from '@/components/shared/LikeButton';
import CustomImage from '@/components/shared/CustomImage';
import { Product } from '@/types/product';

interface PopularSearchProductCardProps {
  product: Product;
  onLike: (id: number) => void;
}

export const PopularSearchProductCard: React.FC<PopularSearchProductCardProps> =
  React.memo(({ product, onLike }) => {
    const router = useRouter();

    const handleClick = useCallback(() => {
      router.push(`/prod/${product.id}`);
    }, [router, product.id]);

    const handleLike = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation();
        onLike(product.id);
      },
      [onLike, product.id],
    );

    return (
      <Card
        onClick={handleClick}
        className="overflow-hidden cursor-pointer transition-shadow hover:shadow-lg h-full"
      >
        <CardContent className="p-0">
          <div className="relative aspect-square w-full">
            <CustomImage
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <LikeButton
              productId={product.id as any}
              className="absolute bottom-2 right-2 z-10"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center p-4">
          <div className="flex items-center gap-2">
            <p className="text-primary_1 font-bold text-lg">{product.price}</p>
            {product.originalPrice && (
              <p className="text-gray-400 font-normal line-through text-sm">
                {product.originalPrice}
              </p>
            )}
          </div>
          <h3 className="text-foreground font-bold text-md mt-2 truncate w-full text-center">
            {product.name}
          </h3>
        </CardFooter>
      </Card>
    );
  });

PopularSearchProductCard.displayName = 'PopularSearchProductCard';
