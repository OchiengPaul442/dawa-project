'use client';

import React from 'react';
import { useSelector } from '@/redux-store/hooks';
import { useProductDetails } from '@/@core/hooks/useProductData';
import { ProductDetails } from './ProductDetails';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ProductSkeleton from './product-skeleton';
import Link from 'next/link';

interface ProdPageProps {
  params: { slug: string[] }; // Ensured slug exists in params
}

const ProdPage: React.FC<ProdPageProps> = ({ params }) => {
  const { slug } = params; // Now correctly typed and always an array

  const selectedProductId = useSelector(
    (state) => state.product.selectedProductId,
  );
  const { productData, isLoading, isError } =
    useProductDetails(selectedProductId);

  if (isLoading) return <ProductSkeleton />;

  if (isError) {
    return (
      <div className="container mx-auto py-10 px-5 text-center">
        <p className="text-red-600">
          Failed to load product details. Please try again later.
        </p>
      </div>
    );
  }

  if (!productData || slug.length === 0) {
    return (
      <div className="container mx-auto py-10 px-5 text-center">
        <p className="text-gray-500">
          Product not found. Please check the URL or browse our catalog.
        </p>
        <Link href="/home" className="text-primary_1 hover:underline">
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <section className="container mx-auto h-screen py-10 px-5">
      <Breadcrumbs
        categoryName={productData.category}
        subcategoryName={productData.subcategory}
        productName={productData.name}
      />

      <div>
        <ProductDetails product={productData} />
      </div>
    </section>
  );
};

export default ProdPage;
