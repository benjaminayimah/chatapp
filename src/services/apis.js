// import router from '@/router';
import store from '@/store';
import axios from 'axios';
import { decryptToken } from '@/middlewares/encryptMiddleware'


const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
    (config) => {
        const token = decryptToken(store.state.auth.token);

        if (!token) return config;

        // const { exp } = JSON.parse(atob(token.split('.')[1]));

        // // Check if the token is expired
        // if (Date.now() >= exp * 1000) {
        //     store.commit('setTokenExpired')
        //     return Promise.reject(new Error("Token expired")); // Reject the request
        // }

        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle other errors
    }
);



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
            store.commit('setTokenExpired')
        }
        return Promise.reject(error);
    }
);

export default api
