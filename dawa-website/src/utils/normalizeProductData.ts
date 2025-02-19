export interface NormalizedProduct {
  id: number;
  name: string;
  price: string;
  images: {
    id: number;
    image_url: string;
  }[];
  location?: string;
  negotiable?: boolean;
  status?: string;
  description?: string;
  category?: string;
  subcategory?: string;
}

export function normalizeProduct(product: any): NormalizedProduct {
  return {
    id: product.id,
    name: product.item_name,
    price: product.item_price,
    images: (product.images || []).map((img: any) => ({
      id: img.id,
      image_url: img.image,
    })),
    location: product.item_location,
    negotiable: product.item_negotiable,
    status: product.item_status,
    description: product.item_description,
    category: product.category,
    subcategory: product.subcategory,
  };
}

export function normalizeProducts(products: any[]): NormalizedProduct[] {
  return products.map(normalizeProduct);
}
