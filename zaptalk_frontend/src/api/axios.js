import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://zaptalk-api-c46804cb19e0.herokuapp.com/api/'
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;