import axios, { AxiosRequestConfig } from 'axios';

const camboEventsApi = axios.create({
  baseURL: 'http://127.0.0.1:3009',
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
