import axios from 'axios';
import { API_BASE_URL } from '../config/env';
import { localTokenStorage } from '../storage/LocalTokenStorage';
import { mapApiError } from './errors';

export const httpClient = axios.create({ baseURL: API_BASE_URL });

httpClient.interceptors.request.use((config) => {
  const token = localTokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response?.status === 401) {
      localTokenStorage.clear();
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(mapApiError(err));
  },
);
