import React from 'react';
import { FaStore } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import CustomImage from '@/components/shared/CustomImage';
import { SellerType } from '@/types/product';
import { Star } from 'lucide-react';

interface SellerInfoProps {
  seller: SellerType;
  reviews: any[];
}

export const SellerInfo: React.FC<SellerInfoProps> = ({ seller, reviews }) => (
  <div className="flex items-center space-x-6">
    <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden">
      <CustomImage
        src={seller.seller_profile_picture || '/placeholder-avatar.png'}
        alt={seller.seller_name}
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
    <div className="flex-1">
      <h3 className="text-xl font-bold">{seller.seller_name}</h3>
      <p className="text-gray-600 mb-2">{seller.seller_address}</p>
      <div className="flex items-center space-x-2 mb-2">
        <Star className="w-4 h-4 text-yellow-400" />
        <span className="text-sm font-medium">
          4.8 ({reviews.length} review{reviews.length > 1 && 's'})
        </span>
      </div>
      <Button variant="outline" size="sm" className="text-primary_1">
        <FaStore className="mr-2" /> View Store
      </Button>
    </div>
  </div>
);
