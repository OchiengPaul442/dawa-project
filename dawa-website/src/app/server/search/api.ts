import { openApiClient } from '@/utils/apiClient';

// Search API
export const search = async (query: string, signal?: AbortSignal) => {
  const response = await openApiClient.post(
    '/searchitems/',
    { search_query: query },
    { signal },
  );
  return response.data;
};
