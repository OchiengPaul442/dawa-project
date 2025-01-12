'use client';

import React, { useState, useCallback } from 'react';

import { useProducts } from '@core/hooks/useProductData';
import { addOrRemoveItemToWishlist } from '@/app/server/products/api';
import ProductCard from '@/components/ProductCards/GridCardLayout';
import CustomPagination from '@/components/shared/CustomPagination';
import ProductCardSkeleton from '@/views/pages/trendingProducts/ProductCardSkeleton';

interface Product {
  id: number;
  name: string;
  price: number;
  images: any[];
  liked: boolean;
}

const ITEMS_PER_PAGE = 16;

const ProductPage: React.FC = () => {
  const { productsData, isLoading, isError, mutate } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);

  //=====================//
  //   EVENT HANDLERS    //
  //=====================//
  const handleLike = useCallback(
    async (itemId: number) => {
      try {
        await addOrRemoveItemToWishlist({ item_id: itemId });

        // Optimistically update the SWR cache
        mutate((currentData: any) => {
          if (!currentData?.data) return currentData;
          return {
            ...currentData,
            data: currentData.data.map((product: Product) =>
              product.id === itemId
                ? { ...product, liked: !product.liked }
                : product,
            ),
          };
        }, false);
      } catch (err) {
        console.error('Error adding to wishlist:', err);
        alert('Failed to add product to wishlist. Please try again.');
      }
    },
    [mutate],
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  //=====================//
  //   LOADING / ERROR   //
  //=====================//
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <ProductCardSkeleton />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Failed to load products.</div>;
  }

  //=====================//
  //     PAGINATION      //
  //=====================//
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = productsData.slice(startIndex, endIndex);

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
          <ProductCard key={product.id} product={product} onLike={handleLike} />
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
