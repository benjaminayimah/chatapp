<template>
  <side-bar-toggle />
  <div class="main-page flex-1">
    <side-bar />
    <section class="right-page bg-surface-1">
      <div class="h-100 flex flex-column">
        <nav-bar />
        <router-view/>
      </div>
    </section>
  </div>
  <transition name="modal-fade">
    <component v-if="isModalOpen" :is="modalContent"></component>
  </transition>
  <component v-if="isDeleteOpen" :is="deleteContent"></component>

</template>
<script>

import NavBar from '@/components/NavBar'
import SideBarToggle from './components/SideBarToggle.vue'
import SideBar from './components/SideBar.vue'
import SettingsModal from './modals/SettingsModal.vue'
import DeleteModal from './modals/DeleteModal.vue'
import { mapState } from 'vuex';
export default {
  components: { NavBar, SideBarToggle, SideBar, SettingsModal, DeleteModal },
  name: 'AppView',
  computed: {
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