import router from '@/router';
import store from '@/store';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        store.commit('setTokenExpired')
        router.push({ query: { m: 'token-expired' }})
      }
      return Promise.reject(error);
    }
);



export default api
