'use client';

import React from 'react';
import { useTrendingProducts } from '@core/hooks/useProductData';
import ProductCard from '@/components/ProductCards/GridCardLayout';
import ProductCardSkeleton from '@/components/loaders/ProductCardSkeleton';
import { OopsComponent } from '@/components/shared/oops-component';
import { SimilarItem } from '@/types/product';

const ProductPage: React.FC = () => {
  const { productsData, isLoading, isError } = useTrendingProducts();

  //=====================//
  //   LOADING / ERROR   //
  //=====================//
  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary_1">
          Trending Products
        </h2>
        <ProductCardSkeleton ITEMS_PER_PAGE={16} />
      </div>
    );
  }

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

  //=====================//
  //     MAIN RENDER     //
  //=====================//
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-primary_1">
        Trending Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {productsData.map((product: SimilarItem) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductPage;
