import { SendMessagePayload } from '@/types/message';
import { secureApiClient } from '@/utils/apiClient';

// Generic request function to handle API calls
async function apiRequest(
  method: 'get' | 'post',
  url: string,
  data?: any,
): Promise<any> {
  try {
    const response =
      method === 'get'
        ? await secureApiClient.get(url)
        : await secureApiClient.post(url, data);
    return response.data;
  } catch (error: any) {
    console.error(
      `Error in API request [${method.toUpperCase()} ${url}]:`,
      error?.response?.data || error.message || 'Unknown error',
    );
    throw error?.response?.data || error.message || error;
  }
}

// Send a message
export const sendMessage = async (
  url: string,
  { arg }: { arg: SendMessagePayload },
): Promise<any> => {
  // Use the URL provided by SWR as the endpoint
  return apiRequest('post', url, arg);
};

// Get messages
export const getMessages = async (): Promise<any> => {
  return apiRequest('get', '/getmessages/');
};
