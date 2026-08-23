const DEFAULT_DEV_API_URL = 'http://localhost:5000';

export const getApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, '');
  }
  return DEFAULT_DEV_API_URL;
};

export const getApiUrl = (path = '/api') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
};
