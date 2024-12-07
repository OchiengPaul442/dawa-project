import { IconType } from 'react-icons';

export interface Subcategory {
  name: string;
  count: number;
  icon: IconType;
}

export interface Category {
  name: string;
  count: number;
  icon: IconType;
  subcategories: Subcategory[];
}

export interface ProductCarouselItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  discountPercentage?: number;
  ctaText: string;
  ctaUrl: string;
}
