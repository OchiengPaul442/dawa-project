'use client';

import React from 'react';
import { useSelector } from '@/redux-store/hooks';
import { useProductDetails } from '@/@core/hooks/useProductData';
import { ProductDetails } from './ProductDetails';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ProductSkeleton from './product-skeleton';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { decrypt } from '@/utils/crypto';

interface ProdPageProps {
  params: { slug: string[] };
}

const ProdPage: React.FC<ProdPageProps> = ({ params }) => {
  const { slug } = params;
  const selectedProductId = useSelector(
    (state) => state.product.selectedProductId,
  );
  const searchParams = useSearchParams();
  const encryptedId = searchParams.get('p');
  const productIdFromQuery = encryptedId ? decrypt(encryptedId) : null;

  // Use the product ID from Redux if available, otherwise from the query string.
  const effectiveProductId = productIdFromQuery || selectedProductId;

  const { productData, isLoading, isError } =
    useProductDetails(effectiveProductId);

  if (isLoading) return <ProductSkeleton />;

  if (isError) {
    return (
      <div className="text-center">
        <p className="text-red-600">
          Failed to load product details. Please try again later.
        </p>
      </div>
    );
  }

  // Remove the slug check; if productData exists, render it.
  if (!productData) {
    return (
      <div className="text-center">
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
    <>
      <Breadcrumbs
        categoryName={productData.category}
        subcategoryName={productData.subcategory}
        productName={productData.name}
      />
      <div>
        <ProductDetails product={productData} />
      </div>
    </>
  );
};

export default React.memo(ProdPage);
