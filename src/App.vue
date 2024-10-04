<template>
  <side-bar-toggle />
  <div class="main-page flex-1">
    <side-bar />
    <section class="right-page bg-surface-1">
      <div class="h-100">
        <!-- <div class="fixed sticky-top show">
            <button :class="{'is-active' : currentTheme === 'dark-theme' }" @click="$store.commit('setTheme', 'dark-theme')">dark</button>
          <button :class="{'is-active' : currentTheme === 'light-theme' }" @click="$store.commit('setTheme', 'light-theme')">light</button>
          <button :class="{'is-active' : currentTheme === 'device-theme' }" @click="$store.commit('setDeviceTheme')">Device</button>
        </div> -->
        <nav-bar />
        <router-view/>
      </div>
    </section>
  </div>
</template>
<script>

import NavBar from '@/components/NavBar'
import SideBarToggle from './components/SideBarToggle.vue'
import SideBar from './components/SideBar.vue'
import { mapState } from 'vuex'
export default {
  components: { NavBar, SideBarToggle, SideBar },
  name: 'AppView',
  computed: {
    ...mapState({
      currentTheme: (state) => state.currentTheme
    })
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
  // overflow-y: auto;
}
.is-active {
  background-color: #06d40d;
  color: #fff;
}
.show {
  position: fixed;
  z-index: 99;
}
</style>