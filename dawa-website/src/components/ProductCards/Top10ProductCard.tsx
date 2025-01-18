'use client';

import React, { useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { LikeButton } from '@/components/shared/LikeButton';
import StarRating from '@/components/shared/StarRating';
import CustomImage from '@/components/shared/CustomImage';
import { Product } from '@/types/product';

interface Top10ProductCardProps {
  product: Product;
  onLike: (id: number) => void;
}

const Top10ProductCard = memo(function Top10ProductCard({
  product,
  onLike,
}: Top10ProductCardProps) {
  const router = useRouter();

  const handleCardClick = useCallback(() => {
    router.push(`/prod/${product.id}`);
  }, [router, product.id]);

  const handleLike = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onLike(product.id);
    },
    [onLike, product.id],
  );

  return (
    <Card
      onClick={handleCardClick}
      className="overflow-hidden cursor-pointer transition-shadow hover:shadow-lg h-full"
    >
      <CardContent className="p-0">
        <AspectRatio ratio={4 / 3} className="bg-muted">
          <CustomImage
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <LikeButton
            productId={product.id as any}
            className="absolute bottom-2 right-2 z-10"
          />
        </AspectRatio>
      </CardContent>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.sold} sold</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 pt-0">
        <p className="text-primary_1 font-bold text-lg">
          {product.price}
          {product.originalPrice && (
            <span className="text-muted-foreground font-normal line-through text-sm ml-2">
              {product.originalPrice}
            </span>
          )}
        </p>
        <StarRating
          initialRating={product.rating}
          maxRating={4}
          starSize={16}
          readOnly
        />
      </CardFooter>
    </Card>
  );
});

export default Top10ProductCard;
