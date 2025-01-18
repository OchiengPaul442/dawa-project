'use client';

import React, { FC, useCallback } from 'react';
import { Trash2, ExternalLink, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Button from '@/components/shared/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import CustomImage from '@/components/shared/CustomImage';
import { useRouter } from 'next/navigation';
import { slugify } from '@/utils/slugify';
import { useDispatch } from '@redux-store/hooks';
import { setSelectedProduct } from '@/redux-store/slices/products/productSlice';
import { useWishlistActions } from '@core/hooks/useWishlistActions';

import { ProductCardProps } from '@/types/wishList';

const ProductCard: FC<ProductCardProps> = React.memo(({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { removeItem } = useWishlistActions();

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: product.description ?? '',
          url: window.location.href,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.error('Error sharing', error));
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => console.error('Error copying link', error));
    }
  }, [product]);

  const handleViewDetails = useCallback(() => {
    dispatch(setSelectedProduct(product.id));
    router.push(`/prod/${slugify(product.name)}`);
  }, [dispatch, router, product]);

  const handleRemoveFromWishlist = useCallback(() => {
    removeItem(product.id);
  }, [removeItem, product.id]);

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="relative w-full sm:w-48 h-48 flex-shrink-0">
            <div className="w-full h-full rounded-lg overflow-hidden">
              <CustomImage
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex justify-between gap-2">
              <div className="space-y-2 flex-1 min-w-0">
                <h2 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-2">
                  {product.name}
                </h2>
                {product.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 hidden sm:block">
                    {product.description}
                  </p>
                )}
              </div>

              <div className="flex sm:flex-col gap-2 flex-shrink-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        icon={Share2}
                        variant="ghost"
                        className="w-8 h-8"
                        onClick={handleShare}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share Product</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        icon={Trash2}
                        variant="ghost"
                        className="w-8 h-8 text-red-500 hover:text-red-600"
                        onClick={handleRemoveFromWishlist}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove from Wishlist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
              <span className="text-gray-500 text-xs sm:text-sm">
                Added {new Date(product.dateAdded).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xl sm:text-2xl font-semibold text-primary_1">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Button
                variant="outline"
                icon={ExternalLink}
                className="flex items-center gap-1 text-xs sm:text-sm"
                onClick={handleViewDetails}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
