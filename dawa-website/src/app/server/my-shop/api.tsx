import { openApiClient } from '@/utils/apiClient';

// get myshop data take in a body
export const getShopData = async (
  url: string,
  body: { user_id: number },
): Promise<any> => {
  const response = await openApiClient.post(url, body);
  return response.data;
};
