import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ProductType } from '@/types/product';
import { CalendarDays, MapPin, Tag } from 'lucide-react';
import { CurrencyFormatter } from '@/utils/CurrencyFormatter';
import { formatDate } from '@/utils/dateFormatter';

interface ProductInfoProps {
  product: ProductType;
}

export const ProductInfo: React.FC<ProductInfoProps> = React.memo(
  ({ product }) => {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <div className="flex flex-col items-start gap-5">
          <div className="flex flex-wrap items-start gap-2">
            <Badge variant="secondary" className="text-xs">
              {product.item_negotiable ? (
                <span className="flex items-center">
                  <Tag className="h-3 w-3 mr-1" />
                  Negotiable
                </span>
              ) : (
                <span>Fixed Price</span>
              )}
            </Badge>
            <Badge
              variant="secondary"
              className={`text-xs ${
                product.status === 'Available'
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {product.status}
            </Badge>
          </div>
          <span className="text-sm text-gray-500 flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            Posted {formatDate(product.created_at)}
          </span>
        </div>
        <h2 className="text-4xl font-bold text-primary_1">
          <CurrencyFormatter price={Number(product.price)} />
        </h2>
        <p className="text-sm text-gray-600 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {product.location}
        </p>
      </div>
    );
  },
);

ProductInfo.displayName = 'ProductInfo';
