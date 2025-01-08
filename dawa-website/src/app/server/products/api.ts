import apiClient from '@/utils/apiClient';

// get categories
export const getCategoriesList = async () => {
  const response = await apiClient(false).get('/getcategories');
  return response.data;
};

// get products
export const getProductsList = async () => {
  const response = await apiClient(false).get('/getitems');
  return response.data;
};

// add to whishlist
export const addToWishlist = async (data: { item_id: number }) => {
  const response = await apiClient(true).post('/addtowishlist', data);
  return response.data;
};

// add a product
export const addNewProduct = async (data: any) => {
  const response = await apiClient(true).post('/additem', data);
  return response.data;
};
