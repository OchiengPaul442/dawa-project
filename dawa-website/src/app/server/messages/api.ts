import { SendMessagePayload } from '@/types/message';
import { apiRequest } from '@/utils/apiClient';

// Send a message
export const sendMessage = async (
  url: string,
  { arg }: { arg: SendMessagePayload },
): Promise<any> => {
  return apiRequest('post', url, arg);
};

// Get messages
export const getMessages = async (): Promise<any> => {
  return apiRequest('get', '/getmessages/');
};
