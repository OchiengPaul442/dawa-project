'use client';

import React, { useCallback } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import CustomImage from '@/components/shared/CustomImage';
import { setSelectedProduct } from '@redux-store/slices/products/productSlice';
import { useDispatch } from '@/redux-store/hooks';
import { useRouter } from 'next/navigation';
import { slugify } from '@/utils/slugify';
import { LikeButton } from '@/components/shared/LikeButton';
import { CurrencyFormatter } from '@/utils/CurrencyFormatter';
import type { SimilarItem } from '@/types/product';

interface ProductCardProps {
  product: SimilarItem;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCardClick = useCallback(() => {
    dispatch(setSelectedProduct(product.id as any));
    router.push(`/prod/${slugify(product.name)}`);
  }, [router, dispatch, product.id, product.name]);

  // Get the first image URL from the images array.
  const image = product.images[0]?.image_url || '';

  return (
    <Card
      onClick={handleCardClick}
      className="overflow-hidden cursor-pointer w-full max-w-[280px] transition-shadow hover:shadow-lg h-full"
    >
      <CardContent className="p-0">
        {/* Product Image and Like Button */}
        <div className="relative aspect-square w-full">
          <CustomImage
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          {/* Pass the full product details to the LikeButton for optimistic update */}
          <LikeButton
            productId={product.id}
            product={product as any}
            className="absolute bottom-2 right-2 z-10"
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-start m-0 p-0">
        <div className="p-2">
          <h3 className="font-medium text-sm line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-primary_1 font-semibold text-sm">
            <CurrencyFormatter price={product.price as any} />
          </p>
        </div>
      </CardFooter>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
