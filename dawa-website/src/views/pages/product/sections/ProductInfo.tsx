import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ProductType } from '@/types/product';
import { CalendarDays, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { CurrencyFormatter } from '@/utils/CurrencyFormatter';

interface ProductInfoProps {
  product: ProductType;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      <div className="flex justify-between items-center space-x-4">
        <div className="flex flex-col items-start gap-2">
          <Badge
            variant={product.item_negotiable ? 'secondary' : 'default'}
            className="text-sm"
          >
            {product.item_negotiable ? 'Negotiable' : 'Fixed Price'}
          </Badge>
          <Badge
            className={`text-sm ${product.status === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {product.status}
          </Badge>
        </div>
        <span className="text-sm text-gray-500 flex items-center">
          <CalendarDays className="w-4 h-4 mr-1" />
          Posted {format(new Date(product.created_at), 'MMMM d, yyyy')}
        </span>
      </div>
      <h2 className="text-4xl font-bold text-primary_1">
        <CurrencyFormatter price={product.price as any} />
      </h2>
      <p className="text-sm text-gray-600 flex items-center">
        <MapPin className="w-4 h-4 mr-1" />
        {product.location}
      </p>
    </div>
  );
};
