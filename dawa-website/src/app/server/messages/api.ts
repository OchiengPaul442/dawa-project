import apiClient from '@/utils/apiClient';

// endpoint to send messages async
export const sendMessage = async (message: any) => {
  const response = await apiClient(true).post('/sendmessage', message);
  return response.data;
};

// get messages
export const getMessages = async () => {
  const response = await apiClient(true).get('/getmessages');
  return response.data;
};
