import React from 'react';
import { useRouter } from 'next/navigation';
import CustomImage from '../common/CustomImage';
import { Progress } from '../ui/progress';
import Button from '../common/Button';
import { LikeButton } from '../common/LikeButton';
import { Product } from '@/types/product';

interface HotSaleProductCardProps {
  product: Product;
  onLike: (id: number) => void;
}

export const HotSaleProductCard: React.FC<HotSaleProductCardProps> = ({
  product,
  onLike,
}) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full flex flex-col justify-between">
      <div className="relative w-full h-[266px] mb-2">
        <CustomImage
          src={product.imageUrl}
          alt={product.name}
          fill
          style={{
            objectFit: 'cover',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
        <div className="absolute top-2 right-2 h-12 w-12 flex justify-center items-center bg-primary_1 text-white text-xs font-bold px-2 py-1 rounded-full">
          SALE
        </div>
        <LikeButton
          isLiked={product.liked || false}
          onLike={() => onLike(product.id)}
          className="absolute bottom-2 right-2"
        />
      </div>

      <div className="flex flex-col justify-between h-full p-3">
        <div className="text-center mb-2">
          <p className="text-primary_1 font-bold text-lg">{product.price}</p>
          {product.originalPrice && (
            <p className="text-gray-400 line-through text-sm">
              {product.originalPrice}
            </p>
          )}
          <h3 className="text-black font-bold text-md mt-2 truncate">
            {product.name}
          </h3>
        </div>
        <Progress
          value={((product?.stockLeft ?? 0) / (product?.totalStock ?? 1)) * 100}
          className="mt-1 bg-primary_2"
          indicatorClassName="bg-primary_1"
        />

        <div className="text-center text-xs text-gray-400 my-2">
          {product.stockLeft} Left Stock
        </div>

        <Button
          onClick={() => router.push(`/prod/${product.id}`)}
          className="w-full mt-4 h-12 text-primary_1 bg-transparent hover:text-white border-2 border-primary_1 rounded-lg"
        >
          View more
        </Button>
      </div>
    </div>
  );
};
