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
</template>
<script>

import NavBar from '@/components/NavBar'
import SideBarToggle from './components/SideBarToggle.vue'
import SideBar from './components/SideBar.vue'
import SettingsModal from './modals/SettingsModal.vue'
export default {
  components: { NavBar, SideBarToggle, SideBar, SettingsModal },
  name: 'AppView',
  computed: {
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