'use client';

import React, { useRef } from 'react';
import { useProductsData } from '@core/hooks/useProductData';
import ProductCard from '@/components/ProductCards/GridCardLayout';
import { OopsComponent } from '@/components/shared/oops-component';
import { SimilarItem } from '@/types/product';
import { normalizeProducts } from '@/utils/normalizeProductData';
import useInfiniteScroll from '@/@core/hooks/useInfiniteScroll';
import SingleSkeletonCard from '@/components/loaders/SingleSkeletonCard';
import ProductCardSkeleton from '@/components/loaders/ProductCardSkeleton';

const ProductPage: React.FC = () => {
  const { productsData, isLoading, isError, nextPageUrl, size, setSize } =
    useProductsData({});
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Normalize the raw product data.
  const normalizedProductsData = normalizeProducts(productsData);

  // Use the custom infinite scroll hook.
  useInfiniteScroll(
    loadMoreRef,
    () => {
      setSize((prevSize: number) => prevSize + 1);
    },
    { threshold: 1, enabled: !!nextPageUrl && !isLoading },
  );

  // While the first page is loading, display a full grid of skeletons.
  if (isLoading && size === 1) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary_1">
          Trending Products
        </h2>
        <ProductCardSkeleton ITEMS_PER_PAGE={16} />
      </div>
    );
  }

  // If an error occurred, show an error component.
  if (isError) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary_1">
          Trending Products
        </h2>
        <OopsComponent />
      </div>
    );
  }

  // Assume a 4-column grid layout.
  const columns = 4;
  const productCount = normalizedProductsData.length;
  const remainder = productCount % columns;
  const fillCount = remainder > 0 ? columns - remainder : 0;
  // Additionally, add one extra full row of skeleton cards.
  const additionalSkeletonCount = columns;
  const totalSkeletonCount = fillCount + additionalSkeletonCount;

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold text-primary_1">Trending Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {normalizedProductsData.map((product, index) => (
          <ProductCard
            key={`${product.id}-${index}`}
            product={product as unknown as SimilarItem}
          />
        ))}
        {isLoading &&
          size > 1 &&
          Array.from({ length: totalSkeletonCount }).map((_, index) => (
            <SingleSkeletonCard key={`skeleton-${index}`} />
          ))}
      </div>
      {/* Sentinel element: when visible, triggers loading the next page */}
      <div ref={loadMoreRef} className="h-1" />
    </div>
  );
};

export default ProductPage;
