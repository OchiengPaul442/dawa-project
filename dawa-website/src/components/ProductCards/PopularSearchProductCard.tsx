import React from 'react';
import { useRouter } from 'next/navigation';
import CustomImage from '../common/CustomImage';
import { Product } from '@/types/product';
import { LikeButton } from '../common/LikeButton';

interface PopularSearchProductCardProps {
  product: Product;
  onLike: (id: number) => void;
}

export const PopularSearchProductCard: React.FC<
  PopularSearchProductCardProps
> = ({ product, onLike }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/prod/${product.id}`)}
      className="bg-white rounded-2xl shadow-md overflow-hidden h-full cursor-pointer"
    >
      <div className="relative w-full h-56">
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
        <LikeButton
          isLiked={product.liked || false}
          onLike={() => onLike(product.id)}
          className="absolute bottom-2 right-2"
        />
      </div>
      <div className="p-4 text-center">
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
    </div>
  );
};
