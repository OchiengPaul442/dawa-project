import apiClient from '@/utils/apiClient';

// Generic request function to reduce repetition
async function apiRequest<T>(
  auth: boolean,
  method: 'get' | 'post',
  url: string,
  data?: any,
): Promise<T> {
  try {
    const client = apiClient(auth);
    const response =
      method === 'get'
        ? await client.get<T>(url)
        : await client.post<T>(url, data);
    return response.data;
  } catch (error) {
    console.error(
      `Error in API request [${method.toUpperCase()} ${url}]:`,
      error,
    );
    throw error;
  }
}

// Fetch categories
export const getCategoriesList = async <T = any>(): Promise<T> => {
  return apiRequest<T>(false, 'get', '/getcategories');
};

// Fetch products
export const getProductsList = async <T = any>(): Promise<T> => {
  return apiRequest<T>(false, 'get', '/getitems');
};

// Add an item to the wishlist
export const addToWishlist = async <T = any>(data: {
  item_id: number;
}): Promise<T> => {
  return apiRequest<T>(true, 'post', '/addtowishlist', data);
};

// Add a new product
export const addNewProduct = async <T = any>(data: any): Promise<T> => {
  return apiRequest<T>(true, 'post', '/additem', data);
};
