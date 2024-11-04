<template>
  <side-bar-toggle v-if="auth" />
  <div class="main-page flex-1">
    <side-bar v-if="auth" />
    <section class="right-page bg-surface-1">
      <div class="h-100 flex flex-column">
        <top-bar :auth="auth" />
        <router-view/>
      </div>
    </section>
  </div>
  <about-float />
  <transition name="modal-fade">
    <component v-if="isModalOpen" :is="modalContent" :auth="auth"></component>
  </transition>
  <transition name="modal-fade">
    <component v-if="isDeleteOpen && auth" :is="deleteContent"></component>
  </transition>
  <div v-if="toolTip.body" class="tooltip-container fs-08 absolute bg-surface-inverse" :style="{ top: toolTip.top + 50 + 'px', left: toolTip.left + 'px'}">{{ toolTip.body }}</div>
  <error-snack-bar />
</template>
<script>
import api from './services/apis'
import errorHandlerMixin from './mixins/errorHandlerMixin'
import TopBar from '@/components/TopBar'
import SideBarToggle from './components/SideBarToggle.vue'
import SideBar from './components/SideBar.vue'
import SettingsModal from './modals/SettingsModal.vue'
import DeleteModal from './modals/DeleteModal.vue'
import SignUpModal from './modals/SignUpModal.vue'
import TokenExpiredModal from './modals/TokenExpiredModal.vue'
import ErrorSnackBar from './components/ErrorSnackBar.vue'
import { mapGetters, mapState } from 'vuex';
import AboutFloat from './components/AboutFloat.vue'
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
    ErrorSnackBar
  },
  name: 'AppView',
  mixins: [errorHandlerMixin],
  computed: {
    ...mapGetters(['auth']),
    ...mapState({
      deleteState: (state) => state.deleteModal,
      toolTip: (state) => state.dropdown.tooltip
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
    localStorage.getItem('token') ? this.getuser(): ''
    window.addEventListener('resize', this.windowSize)
    !this.auth ? this.$router.push({ query: { m: 'signin' }}) : ''
    
  },
  methods: {
    async getuser() {
      try {
        const response = await api.get('/user')
        this.$store.commit('setUser', response.data)
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