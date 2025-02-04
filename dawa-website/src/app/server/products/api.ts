import {
  secureApiClient,
  openApiClient,
  secureMultipartApiClient,
} from '@/utils/apiClient';
import { ProductUploadProps } from '@/types/product';
import { ReportAbuseProps } from '@/types/reportAbuse';

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
    const response = await openApiClient.post('/getitems/', {});
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// get product details
export const getProductDetails = async (body: any): Promise<any> => {
  try {
    const response = await openApiClient.post('/getitemdetails/', body);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

//get promoted products
export const getPromotedProductsList = async (): Promise<any> => {
  try {
    const response = await openApiClient.get('/getitemspromoted/');
    return response.data;
  } catch (error) {
    console.error('Error fetching promoted products:', error);
    throw error;
  }
};

// Add a new product
export const addNewProduct = async (
  url: string,
  { arg }: { arg: ProductUploadProps },
): Promise<any> => {
  return secureMultipartApiClient
    .post(url, arg)
    .then((response) => response.data);
};

// report abuse
export const reportAbuse = async (
  url: string,
  { arg }: { arg: ReportAbuseProps },
): Promise<any> => {
  console.log(arg);
  return secureApiClient.post(url, arg).then((response) => response.data);
};

// send review
export const sendReview = async (
  url: string,
  { arg }: { arg: any },
): Promise<any> => {
  return secureApiClient.post(url, arg).then((response) => response.data);
};
