'use client';

import React, { useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LikeButton } from '@/components/shared/LikeButton';
import CustomImage from '@/components/shared/CustomImage';
import { Product } from '@/types/product';

interface HotSaleProductCardProps {
  product: Product;
  onLike: (id: number) => void;
}

export const HotSaleProductCard = memo(function HotSaleProductCard({
  product,
  onLike,
}: HotSaleProductCardProps) {
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

  const stockPercentage =
    ((product.stockLeft ?? 0) / (product.totalStock ?? 1)) * 100;

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer bg-white"
      onClick={handleCardClick}
    >
      <div className="absolute top-3 left-3 z-20 bg-black text-white text-xs font-bold px-3 py-1 rounded-lg">
        SALE
      </div>

      <div className="relative w-full h-[200px]">
        <CustomImage
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
        <LikeButton
          productId={product.id as any}
          className="absolute bottom-3 right-3 z-20"
        />
      </div>

      <div className="p-3 space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-primary_1 font-bold text-base">
            {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-xs">
              {product.originalPrice}
            </span>
          )}
        </div>

        <h3 className="font-medium text-sm truncate">{product.name}</h3>

        <Progress
          value={stockPercentage}
          className="h-1.5 bg-gray-100"
          indicatorClassName="bg-primary_1"
        />

        <div className="flex items-center justify-between text-xs">
          <span className="text-primary_1">{product.stockLeft} Left</span>
          <span className="text-muted-foreground">
            Total: {product.totalStock}
          </span>
        </div>
      </div>
    </Card>
  );
});

HotSaleProductCard.displayName = 'HotSaleProductCard';
