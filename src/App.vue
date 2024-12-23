<template>
  <side-bar-toggle v-if="auth" />
  <div class="main-page flex-1">
    <side-bar v-if="auth" />
    <main class="right-page bg-surface-1 overflow-y-scroll custom-scrollbar">
      <!-- <div class="h-100 flex flex-column"> -->
        <top-bar :auth="auth" :user="user" />
        <ads-bar v-if="auth && ad" />
        <router-view/>
      <!-- </div> -->
    </main>
  </div>
  <about-float />
  <transition name="modal-fade">
    <component v-if="isModalOpen" :is="modalContent" :auth="auth"></component>
  </transition>
  <transition name="modal-fade">
    <component v-if="isDeleteOpen && auth" :is="deleteContent"></component>
  </transition>
  <div v-if="toolTip.body" class="tooltip-container fs-08 absolute bg-surface-inverse" :style="{ top: toolTip.top + toolTip.height + 5 + 'px', left: toolTip.left + 'px'}">{{ toolTip.body }}</div>
  <alert-bar />
</template>
<script>
import api from './services/apis'
import formMixin from './mixins/formMixin'
import TopBar from '@/components/TopBar'
import SideBarToggle from './components/SideBarToggle.vue'
import SideBar from './components/SideBar.vue'
import SettingsModal from './modals/SettingsModal.vue'
import DeleteModal from './modals/DeleteModal.vue'
import SignUpModal from './modals/SignUpModal.vue'
import TokenExpiredModal from './modals/TokenExpiredModal.vue'
import AlertBar from './components/AlertBar.vue'
import { mapGetters, mapState } from 'vuex';
import AboutFloat from './components/AboutFloat.vue'
import AdsBar from './components/AdsBar.vue'
export default {
  components: { 
    TopBar,
    SideBarToggle,
    SideBar,
    SettingsModal,
    DeleteModal,
    SignUpModal,
    TokenExpiredModal,
    AboutFloat,
    AlertBar,
    AdsBar
  },
  name: 'AppView',
  mixins: [formMixin],
  computed: {
    ...mapGetters(['auth']),
    ...mapState({
      deleteState: (state) => state.deleteModal,
      toolTip: (state) => state.dropdown.tooltip,
      user: (state) => state.auth.user,
      ad: (state) => state.preferences.ad
    }),
    isDeleteOpen() {
      return !!this.deleteState;
    },
    isModalOpen() {
      return !!this.$route.query.m;
    },
    modalType() {
      return this.$route.query.m;
    },
    modalContent() {
      switch (this.modalType) {
        case 'settings':
          return 'SettingsModal';
        case 'signup':
          return 'SignUpModal'
        case 'signin':
          return 'SignUpModal'
        case 'token-expired':
          return 'TokenExpiredModal'
        default:
          return 'DefaultContent';
      }
    },
    deleteContent() {
      return this.isDeleteOpen ? 'DeleteModal' : ''
    }
  },
  created() {
    this.$store.commit('setInitialTheme')
    this.$store.commit('computeWindow')
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.handleThemeChange);
    this.auth ? this.getuser(): ''
    this.getAgents()
    this.getUsers()
    window.addEventListener('resize', this.windowSize)
  },
  methods: {
    async getuser() {
      try {
          const res = await api.get('/user')
          this.$store.commit('setUser', res.data)
          // console.log(res.data)
      } catch (err) {
          this.handleError(err)
      }
    },
    async getAgents() {
      try {
          const res = await api.get('/agent')
          this.$store.commit('setAgents', res.data)
      } catch (err) {
          this.handleError(err)
      }
    },
    async getUsers() {
      try {
          const res = await api.get('/user/all')
          this.$store.commit('setUsers', res.data)
          console.log(res.data)
      } catch (err) {
          this.handleError(err)
      }
    },
    windowSize() {
      setTimeout(()=> {
        this.$store.commit('computeWindow')
      }, 100)
    },
    handleThemeChange(e) {
      this.$store.commit('handleThemeChange', e.matches)
    }
  },
  beforeUnmount() {
    document.removeEventListener('resize', this.windowSize);
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.handleThemeChange);
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/index.scss';
.main-page {
  display: flex;
}
.right-page {
  flex: 1;
  height: 100dvh;
}
.tooltip-container {
  padding: 4px 8px;
  z-index: 300;
  border-radius: 6px;
}
</style>