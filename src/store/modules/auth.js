import { encryptToken } from '@/middlewares/encryptMiddleware'
import router from '@/router'
import api from '@/services/apis'

export default {
    state: {
        token: null,
        user: null,
        tokenExpired: false,
    },
    mutations: {
        setAuth(state, payload) {
            const token = encryptToken(payload)
            state.token = token
        },
        setUser(state, payload) {
            state.user = payload
        },
        destroyToken(state) {
            state.token = null
            state.user = null
        },
        setTokenExpired(state) {
            state.tokenExpired = true
            const currentRoute = router.currentRoute.value;
            router.push({
                query: { ...currentRoute.query, m: 'token-expired' },
            });
        }
    },
    actions: {
        async logout(state) {
            try {
              await api.post('/auth/logout')
              state.commit('destroyToken')
              window.location = '/'
      
            } catch (error) {
              state.commit('destroyToken')
              window.location = '/'
            }
        },
    }
}