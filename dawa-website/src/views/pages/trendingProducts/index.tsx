'use client';

import React, { useState, useCallback } from 'react';

import { useTrendingProducts } from '@core/hooks/useProductData';
import { toggleWishlistItem } from '@/app/server/wishList/api';
import ProductCard from '@/components/ProductCards/GridCardLayout';
import CustomPagination from '@/components/shared/CustomPagination';
import Loader from '@/components/Loader';

interface Product {
  id: string;
  name: string;
  price: number;
  images: any[];
  liked: boolean;
}

const ITEMS_PER_PAGE = 16;

const ProductPage: React.FC = () => {
  const { productsData, isLoading, isError, mutate } = useTrendingProducts();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  //=====================//
  //   LOADING / ERROR   //
  //=====================//
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div className="text-red-500">Failed to load products.</div>;
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
        {currentProducts.map((product: Product) => (
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
