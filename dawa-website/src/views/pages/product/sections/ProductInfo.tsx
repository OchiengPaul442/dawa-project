import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ProductInfoProps {
  product: {
    name: string;
    price: string;
    item_negotiable: boolean;
  };
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
      {product.name}
    </h1>
    <h2 className="text-3xl md:text-4xl font-bold text-primary_1 mb-6">
      UGX {product.price}
    </h2>
    <Badge variant={product.item_negotiable ? 'secondary' : 'default'}>
      {product.item_negotiable ? 'Negotiable' : 'Fixed Price'}
    </Badge>
  </div>
);
