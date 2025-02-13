'use client';

import React, { useCallback } from 'react';
import { Card } from '@/components/ui/card';
import CustomImage from '@/components/shared/CustomImage';
import { AiOutlineCheck } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { LikeButton } from '@/components/shared/LikeButton';
import { setSelectedProduct } from '@redux-store/slices/products/productSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from '@/redux-store/hooks';
import { slugify } from '@/utils/slugify';
import { CurrencyFormatter } from '@/utils/CurrencyFormatter';
import { Edit } from 'lucide-react';
import type { SimilarItem } from '@/types/product';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ListLayoutProps {
  product: SimilarItem;
  onEdit?: (product: SimilarItem) => void;
  isAdmin?: boolean;
}

const ListLayout: React.FC<ListLayoutProps> = ({
  product,
  onEdit,
  isAdmin = false,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCardClick = useCallback(() => {
    dispatch(setSelectedProduct(product.id as any));
    router.push(`/prod/${slugify(product.name)}`);
  }, [router, dispatch, product.id, product.name]);

  const image = product.images[0]?.image_url || '/placeholder.jpg';

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit && onEdit(product);
  };

  return (
    <Card
      className="overflow-hidden transition-shadow hover:shadow-lg w-full cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col sm:flex-row">
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

        <div className="flex flex-col sm:flex-row justify-between w-full p-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg capitalize truncate">
              {product.name}
            </h3>
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

          <div className="flex flex-col items-end justify-end mt-4 sm:mt-0 sm:ml-4">
            <div className="flex flex-col items-baseline gap-1">
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

              {isAdmin && onEdit && (
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleEditClick}
                        className="left-2 z-10 bg-white h-8 w-8 md:h-10 md:w-10 bg-transparent hover:bg-transparent border border-primary text-primary p-2 rounded transition-all duration-300"
                        aria-label="Edit"
                      >
                        <Edit className="h-4 w-4 text-gray-700" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="left"
                      align="center"
                      className="bg-gray-900 text-white text-xs px-2 py-1"
                    >
                      Edit product
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

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
