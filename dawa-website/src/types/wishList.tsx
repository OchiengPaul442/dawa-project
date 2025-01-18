export interface ProductCardProps {
  product: Product;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: number;
  image: any;
  rating?: number;
  orders?: number;
  dateAdded: string;
  description?: string;
}
