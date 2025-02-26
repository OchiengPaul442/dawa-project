export interface Product {
  id: number;
  name: string;
  price: string;
  stockLeft: number;
  totalStock: number;
  imageUrl: string;
}

export interface FlashSaleCardProps {
  product: Product;
}
