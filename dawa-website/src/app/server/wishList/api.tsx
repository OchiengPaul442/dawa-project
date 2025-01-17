import { apiRequest } from '@/utils/apiClient';

// Fetch user wishlist
export const getUserWishList = async (): Promise<any> => {
  return apiRequest('get', '/getuserwishlist/').then(
    (response) => response.wishlist,
  );
};

// Add or remove item from wishlist
export const toggleWishlistItem = async (
  url: string,
  { arg }: { arg: { item_id: string } },
): Promise<any> => {
  return apiRequest('post', url, arg).then((response) => response.data);
};
