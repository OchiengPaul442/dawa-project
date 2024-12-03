export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  rating?: number;
  sold?: string;
  liked?: boolean;
  stockLeft?: number | 0;
  totalStock?: number | 0;
}
