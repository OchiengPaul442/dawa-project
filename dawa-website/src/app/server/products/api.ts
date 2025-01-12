'use server';
import { secureApiClient, openApiClient } from '@/utils/apiClient';

// Fetch categories
export const getCategoriesList = async (): Promise<any> => {
  try {
    const response = await openApiClient.get('/getcategories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Fetch categories for a specific category
export const getCategoryData = async (body: any): Promise<any> => {
  try {
    const response = await openApiClient.post('/getitems/', body);
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Fetch products
export const getTrendingProductsList = async (): Promise<any> => {
  try {
    const response = await openApiClient.post('/getitems/');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Add or remove an item from the wishlist
export const addOrRemoveItemToWishlist = async (data: {
  item_id: number;
}): Promise<any> => {
  try {
    const response = await secureApiClient.post('/wishunwish/', data);
    return response.data;
  } catch (error) {
    console.error('Error updating wishlist:', error);
    throw error;
  }
};

// get user wishlist
export const getUserWishlist = async (): Promise<any> => {
  try {
    const response = await secureApiClient.get('/getuserwishlist/');
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

// Add a new product
export const addNewProduct = async (data: any): Promise<any> => {
  try {
    const response = await secureApiClient.post('/additem/', data);
    return response.data;
  } catch (error) {
    console.error('Error adding new product:', error);
    throw error;
  }
};
