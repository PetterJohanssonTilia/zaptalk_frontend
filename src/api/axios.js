import axios from 'axios';

const api = axios.create({
  baseURL: 'https://zaptalk-api-c46804cb19e0.herokuapp.com/api/'
});

api.interceptors.request.use(
  (config) => {
    // Don't add the Authorization header for the Movies endpoint
    if (config.url !== 'movies/') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;