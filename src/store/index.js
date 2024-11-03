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
    recents: JSON.parse(localStorage.getItem('recents')) || [],
    deleteModal: null
  },
  mutations: {
    setAuth(state, payload) {
      localStorage.setItem('token', payload)
      state.token = payload
    },
    setUser(state, payload) {
      localStorage.setItem('user', JSON.stringify(payload))
      state.user = payload
    },
    setTokenExpired(state) {
      state.tokenExpired = true
    },
    destroyToken() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      location.reload()
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
      } catch (error) {
        state.commit('destroyToken')
      }
    }
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
