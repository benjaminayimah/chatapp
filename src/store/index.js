import { createStore } from 'vuex'
import DeviceWindow from './modules/window'

export default createStore({
  state: {
    currentTheme: localStorage.getItem('theme') || 'system-theme',
  },
  mutations: {
    setTheme(state, theme) {
      state.currentTheme = theme
      this.commit('applyClass', theme)
      this.commit('saveCurrentTheme', theme)
    },
    async setSystemTheme() {
      await this.commit('tiggerSystemTheme')
      this.commit('preSetSystemTheme')
    },
    tiggerSystemTheme(state) {
      state.currentTheme = 'system-theme'
      this.commit('saveCurrentTheme', 'system-theme')
    },
    preSetSystemTheme() {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      this.commit('checkTheme', prefersDarkScheme)
    },
    setInitialTheme(state) {
      const theme = state.currentTheme
      if(theme === 'system-theme') {
        this.commit('preSetSystemTheme')
      }else {
        this.commit('applyClass', theme)
      }
    },
    handleThemeChange(state, payload) {
      this.commit('checkTheme', payload)
    },
    applyClass(state, payload) {
      document.getElementsByTagName('body')[0].setAttribute('class', payload)
    },
    checkTheme(state, payload) {
      if(state.currentTheme === 'system-theme') {
        if(payload) {
          this.commit('applyClass', 'dark-theme')
        }else {
          this.commit('applyClass', 'light-theme')
        }
      }
    },
    saveCurrentTheme(state, payload) {
      localStorage.setItem('theme', payload)
    }
  },
  actions: {
  },
  modules: {
    DeviceWindow
  }
})
