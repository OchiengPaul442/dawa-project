import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProductCardSkeleton = ({
  ITEMS_PER_PAGE = 8,
}: {
  ITEMS_PER_PAGE?: number;
}) => {
  return (
    <>
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <Card key={index} className="w-full h-full overflow-hidden">
          <div className="relative w-full pt-[100%]">
            <Skeleton className="absolute top-0 left-0 w-full h-full" />
          </div>
          <div className="p-2">
            <Skeleton className="h-3 w-full mb-1" />
            <Skeleton className="h-3 w-3/4 mb-1" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </Card>
      ))}
    </>
  );
};

export default ProductCardSkeleton;
