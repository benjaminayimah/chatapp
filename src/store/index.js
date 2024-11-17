import { createStore } from 'vuex'
import DeviceWindow from './modules/window'
import playback from './modules/playback'
import theme from './modules/theme'
import dropdown from './modules/dropdown'
import api from '@/services/apis'

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    tokenExpired: false,
    user: JSON.parse(localStorage.getItem('user')) || null,
    userProfile: null,
    recents: JSON.parse(localStorage.getItem('recents')) || [],
    error: null,
    deleteModal: null
  },
  mutations: {
    setAuth(state, payload) {
      state.token = payload
      localStorage.setItem('token', payload)
    },
    setUser(state, payload) {
      state.user = payload
      localStorage.setItem('user', JSON.stringify(payload))
    },
    setUserProfile(state, payload) {
      state.userProfile = payload
    },
    setTokenExpired(state) {
      state.tokenExpired = true
    },
    setError(state, payload) {
      state.error = payload
    },
    dismissError(state) {
      state.error = null
    },
    destroyToken(state) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      state.token = null
      state.user = null
    },
    saveCurrentTheme(state, payload) {
      localStorage.setItem('theme', payload)
    },
    addToRecents(state, payload) {
      state.recents.push(payload)
    },
    setDeleteModal(state, payload) {
      state.deleteModal = payload
    },
    closeDeleteModal(state) {
      state.deleteModal = null
    },
    deleteChat(state, payload) {
      let recents = JSON.parse(localStorage.getItem('recents'))
      let index = recents.findIndex(obj => obj.id === payload)
      if (index !== -1) {
        recents.splice(index, 1);
        state.recents.splice(index, 1);
      }
      localStorage.setItem('recents', JSON.stringify(recents));
      localStorage.removeItem(payload + '_images')
      localStorage.removeItem(payload)
    },
    deleteAllChats() {
      //
    },
    renameChat(state, payload) {
      let recents = JSON.parse(localStorage.getItem('recents'))
      let index = recents.findIndex(obj => obj.id === payload.id)
      if (index !== -1) {
        recents[index].title = payload.title
      }
      localStorage.setItem('recents', JSON.stringify(recents));
      state.recents = recents
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
    async logoutMe() {
      try {
        const res = await api.get('/auth/me-logout')
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    },
  },
  getters: {
    auth(state) {
      return state.token !== null
    },
  },
  modules: {
    DeviceWindow,
    dropdown,
    playback,
    theme,
  }
})
