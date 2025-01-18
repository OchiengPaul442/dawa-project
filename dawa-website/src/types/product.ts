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

export interface SellerType {
  seller_id: string;
  seller_name: string;
  seller_profile_picture: string | null;
  seller_address: string;
  seller_contact: string;
  seller_email: string;
}

export interface ProductType {
  id: string;
  name: string;
  price: string;
  location: string;
  item_negotiable: boolean;
  status: string;
  description: string;
  subcategory: string;
  category: string;
  images: {
    image_id: string;
    image_url: string;
  }[];
  seller: SellerType;
  reviews: any[];
  created_at: string;
  updated_at: string;
}

export interface Review {
  name: string;
  avatar?: string;
  rating?: number;
  review: string;

  reviewer_profile_picture: string;
  reviewer_name: string;
  created_at: string;
}
