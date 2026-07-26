import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const adminApi = axios.create({ baseURL: BASE_URL, timeout: 10000 });

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

adminApi.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(new Error(err.response?.data?.error || 'Erreur serveur'));
  }
);

export const login = (data) => adminApi.post('/auth/login', data);

export const getStats = () => adminApi.get('/admin/stats');

export const getAdminArtisans    = ()         => adminApi.get('/admin/artisans');
export const createAdminArtisan  = (data)     => adminApi.post('/admin/artisans', data);
export const updateAdminArtisan  = (id, data) => adminApi.put(`/admin/artisans/${id}`, data);
export const deleteAdminArtisan  = (id)       => adminApi.delete(`/admin/artisans/${id}`);

export const getAdminCategories   = ()         => adminApi.get('/admin/categories');
export const createAdminCategorie = (data)     => adminApi.post('/admin/categories', data);
export const updateAdminCategorie = (id, data) => adminApi.put(`/admin/categories/${id}`, data);
export const deleteAdminCategorie = (id)       => adminApi.delete(`/admin/categories/${id}`);

export const getAdminSpecialites   = ()         => adminApi.get('/admin/specialites');
export const createAdminSpecialite = (data)     => adminApi.post('/admin/specialites', data);
export const updateAdminSpecialite = (id, data) => adminApi.put(`/admin/specialites/${id}`, data);
export const deleteAdminSpecialite = (id)       => adminApi.delete(`/admin/specialites/${id}`);

export const getAdminMessages   = ()   => adminApi.get('/admin/messages');
export const markAdminMessageLu = (id) => adminApi.patch(`/admin/messages/${id}/lu`);
export const deleteAdminMessage = (id) => adminApi.delete(`/admin/messages/${id}`);

export default adminApi;
