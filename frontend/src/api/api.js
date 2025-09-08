import axios from 'axios';

const api = axios.create({
 
  baseURL: 'https://ats-resume-builder-8xjfahqko-pavan-s-projects-ee943b68.vercel.app/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
