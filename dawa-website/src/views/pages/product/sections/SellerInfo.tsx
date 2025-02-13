import React, { useState, useEffect } from 'react';
import { FaStore } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import CustomImage from '@/components/shared/CustomImage';
import { SellerType } from '@/types/product';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { useDispatch } from '@/redux-store/hooks';
import { setSelectedUserId } from '@/redux-store/slices/myshop/selectedUserSlice';

function getValidImageUrl(
  url: string | null | undefined,
  fallback: string,
): string {
  if (!url) return fallback;
  try {
    new URL(url);
    return url;
  } catch {
    return fallback;
  }
}

interface SellerInfoProps {
  seller: SellerType;
  reviews: any[];
}

export const SellerInfo: React.FC<SellerInfoProps> = ({ seller, reviews }) => {
  const dispatch = useDispatch();
  // Initialize the image source using the helper function.
  const initialSrc = getValidImageUrl(
    seller.seller_profile_picture,
    '/placeholder-avatar.png',
  );
  const [imgSrc, setImgSrc] = useState(initialSrc);

  // When the seller profile changes, update the src accordingly.
  useEffect(() => {
    setImgSrc(
      getValidImageUrl(
        seller.seller_profile_picture,
        '/placeholder-avatar.png',
      ),
    );
  }, [seller.seller_profile_picture]);

  // onError handler to switch to the fallback image if loading fails.
  const handleImageError = () => {
    // Only update if the current src isn't already the fallback.
    if (imgSrc !== '/placeholder-avatar.png') {
      setImgSrc('/placeholder-avatar.png');
    }
  };

  return (
    <div className="flex items-center space-x-6">
      <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden">
        <CustomImage
          src={imgSrc}
          alt={seller.seller_name}
          fill
          style={{ objectFit: 'cover' }}
          onError={handleImageError}
        />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold">{seller.seller_name}</h3>
        <p className="text-gray-600 mb-2">{seller.seller_address}</p>
        <div className="flex items-center space-x-2 mb-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium">
            ({reviews.length} review{reviews.length > 1 && 's'})
          </span>
        </div>

        <Link href="/my-shop">
          <Button
            type="button"
            onClick={() => {
              dispatch(setSelectedUserId(seller?.seller_id as any));
            }}
            variant="outline"
            size="sm"
            className="text-primary_1"
          >
            <FaStore className="mr-2" /> View Store
          </Button>
        </Link>
      </div>
    </div>
  );
};
