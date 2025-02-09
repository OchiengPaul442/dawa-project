'use client';
import React, { useCallback } from 'react';
import { Card } from '@/components/ui/card';
import CustomImage from '@/components/shared/CustomImage';
import StarRating from '@/components/shared/StarRating';
import { AiOutlineCheck } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { LikeButton } from '@/components/shared/LikeButton';
import { setSelectedProduct } from '@redux-store/slices/products/productSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from '@/redux-store/hooks';
import { slugify } from '@/utils/slugify';
import { CurrencyFormatter } from '@/utils/CurrencyFormatter';
import type { SimilarItem } from '@/types/product';

interface ListLayoutProps {
  product: SimilarItem;
}

const ListLayout: React.FC<ListLayoutProps> = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCardClick = useCallback(() => {
    dispatch(setSelectedProduct(product.id as any));
    router.push(`/prod/${slugify(product.name)}`);
  }, [router, dispatch, product.id, product.name]);

  const image = product.images[0]?.image_url || '/placeholder.jpg';

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg w-full">
      {/* Outer container: On mobile the sections stack vertically, on desktop they sit side by side */}
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="relative w-full sm:w-48 md:w-64 aspect-square sm:aspect-auto sm:h-48 md:h-64">
          <CustomImage
            src={image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
            priority={false}
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col sm:flex-row justify-between w-full p-4">
          {/* Left: Product Details */}
          <div className="flex flex-col gap-2">
            {product.rating !== undefined && (
              <div className="flex items-center gap-1 text-sm text-primary font-medium">
                <StarRating
                  initialRating={product.rating}
                  maxRating={5}
                  starSize={16}
                  readOnly
                />
                <span className="ml-1 text-gray-500">
                  ({product.reviews || 0})
                </span>
              </div>
            )}

            <h3 className="font-semibold text-lg truncate">{product.name}</h3>

            {product.features && (
              <ul className="text-sm text-gray-500 mt-2 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <AiOutlineCheck className="text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right: Price & Actions */}
          <div className="flex flex-col items-start justify-end mt-4 sm:mt-0 sm:ml-4">
            <div className="flex flex-col items-baseline gap-1">
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-sm">
                  UGX {product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-primary_1 text-xl font-bold">
                <CurrencyFormatter price={product.price as any} />
              </span>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <Button
                onClick={handleCardClick}
                className="bg-gray-700 text-white text-sm px-4 py-2 rounded"
              >
                View more
              </Button>

              <LikeButton
                productId={product.id}
                className="bg-transparent hover:bg-transparent border border-primary text-primary p-2 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ListLayout;
