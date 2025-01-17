import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

type ApiClientType = 'secure' | 'open';

type HeadersConfig = {
  isMultipart?: boolean;
};

const createApiClient = (
  type: ApiClientType,
  headersConfig?: HeadersConfig,
): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': headersConfig?.isMultipart
        ? 'multipart/form-data'
        : 'application/json',
    },
  });

  if (type === 'secure') {
    instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const session = await getSession();
        if (session?.accessToken) {
          config.headers.Authorization = `Token ${session.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  return instance;
};

// Generic request function to handle API calls
export async function apiRequest(
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

export const secureApiClient = createApiClient('secure');
export const openApiClient = createApiClient('open');
export const secureMultipartApiClient = createApiClient('secure', {
  isMultipart: true,
});
