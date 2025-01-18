'use client';

import React from 'react';
import ImageCarousel from './ImageCarousel';
import ProductTabs from './ProductTabs';
import ShareSection from './ShareSection';
import { ProductDetails } from './ProductDetails';
import { useProductDetails } from '@/@core/hooks/useProductData';
import { useSelector } from '@/redux-store/hooks';
import ProductSkeleton from './product-skeleton';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import Link from 'next/link';

interface ProdPageProps {
  slug: string[];
}

const ProdPage: React.FC<ProdPageProps> = ({ slug }) => {
  const selectedProductId = useSelector(
    (state) => state.product.selectedProductId,
  );

  const { productData, isLoading, isError } =
    useProductDetails(selectedProductId);

  // Handle loading state
  if (isLoading) {
    return <ProductSkeleton />;
  }

  // Handle error state
  if (isError) {
    return (
      <div className="container mx-auto py-10 px-5 text-center">
        <p className="text-red-600">
          Failed to load product details. Please try again later.
        </p>
      </div>
    );
  }

  // Handle missing product or invalid slug
  if (!productData || !slug || slug.length === 0) {
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
    <div className="flex flex-col gap-10">
      <section className="container mx-auto py-10 px-5">
        {/* Use the refactored Breadcrumbs component */}
        <Breadcrumbs
          categoryName={productData.category}
          subcategoryName={productData.subcategory}
          productName={productData.name}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images Carousel */}
          {productData.images && productData.images.length > 0 ? (
            <ImageCarousel images={productData.images} />
          ) : (
            <p className="text-gray-500">
              No images available for this product.
            </p>
          )}

          {/* Product Details */}
          <ProductDetails product={productData} />
        </div>

        {/* Share Section */}
        <ShareSection />
      </section>

      <section className="container mx-auto mb-12">
        <ProductTabs product={productData} />
      </section>
    </div>
  );
};

export default ProdPage;
