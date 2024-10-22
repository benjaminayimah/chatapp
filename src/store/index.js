import { createStore } from 'vuex'
import DeviceWindow from './modules/window'
import playback from './modules/playback'
import theme from './modules/theme'
import dropdown from './modules/dropdown'

export default createStore({
  state: {
    token: localStorage.getItem('auth') || null,
    recents: JSON.parse(localStorage.getItem('recents')) || []
  },
  mutations: {
    saveCurrentTheme(state, payload) {
      localStorage.setItem('theme', payload)
    },
    addToRecents(state, payload) {
      state.recents.push(payload)
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
