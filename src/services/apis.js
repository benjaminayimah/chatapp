import router from '@/router';
import store from '@/store';
import axios from 'axios';
import { decryptToken } from '@/middlewares/encryptMiddleware'


const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
    const token = decryptToken(store.state.auth.token);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        if (response.status === 200 && store.state.alert?.type === 'error') {
            store.commit('dismissAlert')
        }
        return response;
    },
    (error) => {
        if (error.response?.status === 401 && error.response?.data?.tokenExpired) {
            store.commit('setTokenExpired');
            const currentRoute = router.currentRoute.value;
            router.push({
                query: { ...currentRoute.query, m: 'token-expired' },
            });
        }
        return Promise.reject(error);
    }
);

export default api
