import { secureApiClient } from '@/utils/apiClient';

// Generic request function to handle API calls
async function apiRequest<T>(
  method: 'get' | 'post',
  url: string,
  data?: any,
): Promise<T> {
  try {
    const response =
      method === 'get'
        ? await secureApiClient.get<T>(url)
        : await secureApiClient.post<T>(url, data);
    return response.data;
  } catch (error) {
    console.error(
      `Error in API request [${method.toUpperCase()} ${url}]:`,
      error,
    );
    throw error;
  }
}

// Send a message
export const sendMessage = async <T = any>(message: any): Promise<T> => {
  return apiRequest<T>('post', '/sendmessage', message);
};

// Get messages
export const getMessages = async <T = any>(): Promise<T> => {
  return apiRequest<T>('get', '/getmessages');
};
