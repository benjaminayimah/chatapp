export default {
    state: {
        isSpeaking: false,
        isPaused: false,
        index: null,
    },
    mutations: {
        storeSpeaking(state, payload) {
            state.isSpeaking = payload
        },
        storePaused(state, payload) {
            state.isPaused = payload
        },
        storeIndex(state, payload) {
            state.index = payload
        }
    }
}