'use client';

import React, { useState, useCallback } from 'react';

import { useTrendingProducts } from '@core/hooks/useProductData';
import ProductCard from '@/components/ProductCards/GridCardLayout';
import CustomPagination from '@/components/shared/CustomPagination';
import { SimilarItem } from '@/types/product';
import ProductCardSkeleton from '@/components/loaders/ProductCardSkeleton';
import { OopsComponent } from '@/components/shared/oops-component';

const ITEMS_PER_PAGE = 16;

const ProductPage: React.FC = () => {
  const { productsData, isLoading, isError } = useTrendingProducts();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  //=====================//
  //   LOADING / ERROR   //
  //=====================//
  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary_1">
          Trending Products
        </h2>
        <ProductCardSkeleton ITEMS_PER_PAGE={ITEMS_PER_PAGE} />
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
  //     PAGINATION      //
  //=====================//
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = productsData?.slice(startIndex, endIndex);

  //=====================//
  //     MAIN RENDER     //
  //=====================//
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-primary_1">
        Trending Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {currentProducts.map((product: SimilarItem) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-6">
        <CustomPagination
          currentPage={currentPage}
          totalItems={productsData.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ProductPage;
