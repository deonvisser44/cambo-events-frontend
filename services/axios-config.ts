import axios, { AxiosRequestConfig } from 'axios';

const camboEventsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: { accept: '*/*', 'Access-Control-Allow-Origin': '*' },
});

export const addAccessTokenToInterceptor = (token: string) => {
  camboEventsApi.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (token) {
        config!.headers!.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default camboEventsApi;
