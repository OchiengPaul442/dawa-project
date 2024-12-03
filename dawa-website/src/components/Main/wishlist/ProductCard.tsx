import React, { FC, useCallback } from 'react';
import { Trash2, ExternalLink, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Button from '../../common/Button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import CustomImage from '../../common/CustomImage';
import StarRating from '../../common/StarRating';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: number;
  image: string;
  rating: number;
  orders: number;
  shipping: string;
  store: string;
  dateAdded: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onRemove: (id: number) => void;
}

const ProductCard: FC<ProductCardProps> = React.memo(
  ({ product, isSelected, onSelect, onRemove }) => {
    const router = useRouter();
    const handleSelect = useCallback(() => {
      onSelect(product.id);
    }, [onSelect, product.id]);

    const handleRemove = useCallback(() => {
      onRemove(product.id);
    }, [onRemove, product.id]);

    return (
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-2 sm:p-4">
          {/* Main container with responsive flex direction */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Image container - Full width on mobile, fixed width on larger screens */}
            <div className="relative w-full sm:w-48 h-48 flex-shrink-0">
              <div className="absolute top-2 left-2 z-10">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={handleSelect}
                  className="bg-white"
                />
              </div>
              <div className="w-full h-full rounded-lg overflow-hidden">
                <CustomImage
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Product Info - Full width layout */}
            <div className="flex-1 min-w-0 space-y-3">
              {/* Header section with title and actions */}
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

                {/* Action buttons - Horizontal on mobile, vertical on desktop */}
                <div className="flex sm:flex-col gap-2 flex-shrink-0">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          icon={Share2}
                          variant="ghost"
                          className="w-8 h-8"
                        ></Button>
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
                          onClick={handleRemove}
                        ></Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove from Wishlist</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/* Product meta info - Stacked on mobile, inline on larger screens */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                <StarRating
                  initialRating={product.rating}
                  maxRating={5}
                  readOnly
                  starSize={16}
                  filledColor="fill-primary_1 text-primary_1"
                  emptyColor="text-gray-300"
                />
                <div className="hidden sm:block h-4 w-px bg-gray-200" />
                <span className="text-gray-500">{product.orders} orders</span>
                <div className="hidden sm:block h-4 w-px bg-gray-200" />
                <span className="text-gray-500 text-xs sm:text-sm">
                  Added {new Date(product.dateAdded).toLocaleDateString()}
                </span>
              </div>

              {/* Price section - Responsive layout */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl sm:text-2xl font-semibold text-primary_1">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs sm:text-sm text-white bg-primary_1 px-2 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Bottom action section */}
              <div className="pt-2 flex items-center justify-between">
                <Button
                  variant="outline"
                  icon={ExternalLink}
                  className="flex items-center gap-1 text-xs sm:text-sm"
                  onClick={() => {
                    router.push(`/prod/${product.id}`);
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
);

ProductCard.displayName = 'ProductCard';

export default ProductCard;
