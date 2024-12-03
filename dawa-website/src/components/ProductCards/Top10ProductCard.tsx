import React from 'react';
import { useRouter } from 'next/navigation';
import CustomImage from '../common/CustomImage';
import StarRating from '../common/StarRating';
import { LikeButton } from '../common/LikeButton';
import { Product } from '@/types/product';

interface Top10ProductCardProps {
  product: Product;
  onLike: (id: number) => void;
}

export const Top10ProductCard: React.FC<Top10ProductCardProps> = ({
  product,
  onLike,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/prod/${product.id}`);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative w-full h-3/4">
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
          onLike={(e) => {
            e.stopPropagation();
            onLike(product.id);
          }}
          className="absolute bottom-2 right-2"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold truncate">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.sold} sold</p>
        </div>
        <div className="flex flex-col items-start mt-4">
          <p className="text-primary_1 font-bold text-lg mt-2">
            {product.price}
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm ml-2">
                {product.originalPrice}
              </span>
            )}
          </p>
          <StarRating
            initialRating={product.rating}
            maxRating={4}
            starSize={16}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};
