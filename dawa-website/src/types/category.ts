export interface Subcategory {
  id: string;
  name: string;
  count: number;
  icon: React.ElementType;
  href: string;
  subcategory_name: string;
}

export interface Category {
  id: string;

  name: string;
  count: number;
  icon: React.ElementType;
  href: string;
  subcategories: Subcategory[];
  category_name: string;
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
