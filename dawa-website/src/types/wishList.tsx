interface WishlistItem {
  id: number;
  item_name: string;
  item_price: string;
  item_description: string;
  created_at: string;
  images: { id: number; image: string }[];
}

interface WishlistResponse {
  wishlist: WishlistItem[];
  status: number;
}

export interface ProductCardProps {
  product: Product;
  isSelected: boolean;
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
