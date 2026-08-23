import axios from 'axios';
import { getApiUrl } from '../config/api';

const api = axios.create({
  baseURL: getApiUrl('/api'),
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
