import axios from 'axios';
import { getApiUrl } from '../config/api';

const adminApi = axios.create({
  baseURL: getApiUrl('/api/admin'),
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminApi;
