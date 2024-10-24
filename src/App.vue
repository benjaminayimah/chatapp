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
  <transition name="modal-fade">
    <component v-if="isModalOpen && auth" :is="modalContent"></component>
  </transition>
  <transition name="modal-fade">
    <component v-if="isDeleteOpen && auth" :is="deleteContent"></component>
  </transition>

</template>
<script>

import TopBar from '@/components/TopBar'
import SideBarToggle from './components/SideBarToggle.vue'
import SideBar from './components/SideBar.vue'
import SettingsModal from './modals/SettingsModal.vue'
import DeleteModal from './modals/DeleteModal.vue'
import { mapGetters, mapState } from 'vuex';
export default {
  components: { TopBar, SideBarToggle, SideBar, SettingsModal, DeleteModal },
  name: 'AppView',
  computed: {
    ...mapGetters(['auth']),
    ...mapState({
      deleteState: (state) => state.deleteModal
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
    // localStorage.getItem('auth') ? this.$store.dispatch('getAuthUser', localStorage.getItem('auth')) : ''
    window.addEventListener('resize', this.windowSize)
  },
  methods: {
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

</style>