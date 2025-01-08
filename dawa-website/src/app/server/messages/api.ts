import apiClient from '@/utils/apiClient';

// Generic request function to handle API calls
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

// Send a message
export const sendMessage = async <T = any>(message: any): Promise<T> => {
  return apiRequest<T>(true, 'post', '/sendmessage', message);
};

// Get messages
export const getMessages = async <T = any>(): Promise<T> => {
  return apiRequest<T>(true, 'get', '/getmessages');
};
