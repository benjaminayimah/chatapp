import { encryptToken } from '@/middlewares/encryptMiddleware'

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
        }
    }
}