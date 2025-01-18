'use client';

import React, { memo } from 'react';
import { Progress } from '@/components/ui/progress';
import CustomImage from '@/components/shared/CustomImage';
import { Product } from '@/types/flash-sale';
import { CurrencyFormatter } from '@/utils/CurrencyFormatter';

interface FlashSaleCardProps {
  product: Product;
  onClick: () => void;
}
export const FlashSaleCard = memo(function FlashSaleCard({
  product,
  onClick,
}: FlashSaleCardProps) {
  const stockPercentage = (product.stockLeft / product.totalStock) * 100;

  return (
    <div
      className="bg-white rounded-xl p-3 h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-3">
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <CustomImage
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between py-1 flex-grow">
          <h3 className="font-medium text-sm text-black">{product.name}</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-primary_1 font-bold text-base">
                <CurrencyFormatter price={product.price as any} />
              </p>
            </div>
            <div className="space-y-1">
              <Progress
                value={stockPercentage}
                className="h-1 bg-primary_2"
                indicatorClassName="bg-primary_1"
              />
              <div className="flex justify-start">
                <span className="text-xs text-gray-500">
                  {product.stockLeft} left
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
