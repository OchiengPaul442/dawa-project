import React from 'react';
import { FaStore } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomImage from '@/components/shared/CustomImage';

interface SellerInfoProps {
  seller: {
    seller_name: string;
    seller_profile_picture: string | null;
    seller_address: string;
  };
}

export const SellerInfo: React.FC<SellerInfoProps> = ({ seller }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-xl md:text-2xl">Seller Information</CardTitle>
    </CardHeader>
    <CardContent className="flex items-center space-x-6">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-300 overflow-hidden">
        <CustomImage
          src={seller.seller_profile_picture}
          alt={seller.seller_name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-bold">{seller.seller_name}</h3>
        <p className="text-gray-600 mb-2">{seller.seller_address}</p>
        <Button variant="link" className="text-primary_1 p-0 h-auto">
          <FaStore className="mr-2" /> View Store
        </Button>
      </div>
    </CardContent>
  </Card>
);
