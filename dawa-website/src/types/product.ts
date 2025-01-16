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

export interface ProductUploadProps {
  item_name: string;
  item_price: string;
  item_subcategory_id: string;
  item_description: string;
  item_location: string;
  item_negotiable: boolean | null;
  images: File[];
}
