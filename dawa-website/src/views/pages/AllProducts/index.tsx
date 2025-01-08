'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { getProductsList, addToWishlist } from '@/app/server/products/api';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import Sidebar from '@views/pages/category/Sidebar';
import CustomPagination from '@/components/shared/CustomPagination';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  liked: boolean;
}

const ITEMS_PER_PAGE = 16;

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await getProductsList<{ data: Product[] }>();
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLike = useCallback(async (itemId: number) => {
    try {
      await addToWishlist({ item_id: itemId });
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === itemId
            ? { ...product, liked: !product.liked }
            : product,
        ),
      );
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      alert('Failed to add product to wishlist. Please try again.');
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return <div className="text-red-500 text-center">{error}</div>;
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = products.slice(startIndex, endIndex);

    return (
      <>
        <h2 className="text-2xl font-bold mb-4 text-primary_1">
          Trending Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onLike={handleLike}
            />
          ))}
        </div>
        <div className="mt-6">
          <CustomPagination
            currentPage={currentPage}
            totalItems={products.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </div>
      </>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex gap-4">
        <div className="hidden md:block w-72 flex-shrink-0">
          <div className="sticky top-6 z-40">
            <Sidebar />
          </div>
        </div>
        <div className="flex-grow min-w-0 z-30">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProductPage;
