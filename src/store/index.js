import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import DeviceWindow from './modules/window'
import playback from './modules/playback'
import preferences from './modules/preferences'
import dropdown from './modules/dropdown'
import auth from './modules/auth'

import { decryptToken } from '@/middlewares/encryptMiddleware'


export default createStore({
  state: {
    userProfile: null,
    recents: [],
    favourites: [],
    agents: [],
    creators: [],
    alert: null,
    deleteModal: null,
    changePasswordModal: null,
    newChat: null
  },
  mutations: {
    setUserProfile(state, payload) {
      state.userProfile = payload
    },
    updateCurrentProfile(state, payload) {
      Object.assign(state.userProfile, payload);
    },
    //Agents
    addToAgents(state, payload) {
      state.userProfile.agents = [...state.userProfile.agents, ...payload]
    },
    removeAgent(state, payload) {
      let index = state.userProfile?.agents?.findIndex(obj => obj.id === payload)
      if (index !== -1) {
        state.userProfile.agents.splice(index, 1);
      }
    },
    //Creators
    setUsers(state, payload) {
      state.creators = payload
    },
    //favourites
    setFavourites(state, payload) {
      state.favourites = payload
    },
    addFavourite(state, payload) {
      let agent = { agent: payload }
      state.favourites = [...state.favourites, agent]
    },
    removeFavourite(state, id) {
      let index = state.favourites.findIndex(obj => obj.agent.id === id)
      if (index !== -1) {
        state.favourites.splice(index, 1);
      }
    },

    showAlert(state, payload) {
      state.alert = payload
    },
    dismissAlert(state) {
      state.alert = null
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
    setChangePasswordModal(state, payload) {
      state.changePasswordModal = payload
    },
    closeChangePasswordModal(state) {
      state.changePasswordModal = null
    },
    deleteChat(state, payload) {
      let recents = state.recents
      let index = recents.findIndex(obj => obj.id === payload)
      if (index !== -1) {
        state.recents.splice(index, 1);
      }
      localStorage.removeItem(payload + '_images')
      localStorage.removeItem(payload)
    },
    deleteAllChats() {
      //
    },

    setAgents(state, payload) {
      state.agents = payload
    },

    setNewChat(state, payload) {
      state.newChat = payload
    },
    clearNewChat(state) {
      state.newChat = null
    },
    renameChat(state, payload) {
      let recents = state.recents
      let index = recents.findIndex(obj => obj.id === payload.id)
      if (index !== -1) {
        recents[index].title = payload.title
      }
      state.recents = recents
    }
  },
  actions: {
    showAlert({ commit }, payload) {
      commit('showAlert', payload);

      if (payload.autoDismiss) {
        setTimeout(() => {
          commit('dismissAlert');
        }, 4000);
      }
    }
  },
  getters: {
    auth(state) {
      return !!decryptToken(state.auth.token)
    }
  },
  modules: {
    auth,
    DeviceWindow,
    dropdown,
    playback,
    preferences,
  },
  plugins: [
    createPersistedState({
        key: 'ARTEMIS_STORAGE',
        storage: window.localStorage,
        paths: [
          'auth.token',
          'auth.user',
          'preferences.currentTheme',
          // 'preferences.ad',
          'recents',
          'newChat'
        ]
    })
  ]
})
