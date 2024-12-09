export interface Subcategory {
  name: string;
  count: number;
  icon: React.ElementType;
  href: string;
}

export interface Category {
  name: string;
  count: number;
  icon: React.ElementType;
  href: string;
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
