import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';
const API_KEY  = import.meta.env.VITE_API_KEY  || '';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  }
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      'Une erreur est survenue. Veuillez réessayer.';
    return Promise.reject(new Error(message));
  }
);

export const getCategories      = ()       => api.get('/categories');
export const getCategorieBySlug = (slug)   => api.get(`/categories/${slug}`);
export const getArtisans        = (params) => api.get('/artisans', { params });
export const getArtisanById     = (id)     => api.get(`/artisans/${id}`);
export const getArtisansVedette = ()       => api.get('/artisans/vedette');
export const sendContact        = (data)   => api.post('/contact', data);

export default api;
