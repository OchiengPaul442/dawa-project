import { ContactUsPayload, SubscribePayload } from '@/types/contact-us';
import { openApiClient } from '@/utils/apiClient';

// Get FAQs
export const getFaqs = async () => {
  const response = await openApiClient.get('/getfaqs/');
  return response.data;
};

// subscribe to newsletter
export const subscribeToNewsletter = async (
  key: string,
  { arg }: { arg: SubscribePayload },
): Promise<any> => {
  const response = await openApiClient.post('/subscribe/', arg);
  return response.data;
};

// contact us
export const contactUs = async (
  key: string,
  { arg }: { arg: ContactUsPayload },
): Promise<any> => {
  const response = await openApiClient.post('/contactus/', arg);
  return response.data;
};
