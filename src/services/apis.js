import router from '@/router';
import store from '@/store';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Set your base URL here
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Fetch the auth token
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
// Add a response interceptor
api.interceptors.response.use(
    (response) => response, // Pass through if response is successful
    (error) => {
      if (error.response && error.response.status === 401) {
        store.commit('setTokenExpired')
        router.push({ query: { m: 'token-expired' }})
      }
      return Promise.reject(error);
    }
);



export default api
