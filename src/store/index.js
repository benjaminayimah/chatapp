import { createStore } from 'vuex'
import DeviceWindow from './modules/window'

export default createStore({
  state: {
    currentTheme: localStorage.getItem('theme') || 'device-theme',
  },
  mutations: {
    setTheme(state, theme) {
      state.currentTheme = theme
      this.commit('applyClass', theme)
      this.commit('saveCurrentTheme', theme)
    },
    async setDeviceTheme() {
      await this.commit('tiggerDeviceTheme')
      this.commit('preSetDeviceTheme')
    },
    tiggerDeviceTheme(state) {
      state.currentTheme = 'device-theme'
      this.commit('saveCurrentTheme', 'device-theme')
    },
    preSetDeviceTheme() {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      this.commit('checkDevice', prefersDarkScheme)
    },
    setInitialTheme() {
      const theme = localStorage.getItem('theme')
      if(theme === 'device-theme') {
        this.commit('preSetDeviceTheme')
      }else {
        this.commit('applyClass', theme)
      }
    },
    handleThemeChange(state, payload) {
      this.commit('checkDevice', payload)
    },
    applyClass(state, payload) {
      document.getElementsByTagName('body')[0].setAttribute('class', payload)
    },
    checkDevice(state, payload) {
      if(state.currentTheme === 'device-theme') {
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
