<template>
  <button
    id="main_menu" 
    class="fixed transparent-button jc-c ai-c"
    aria-label="Main menu"
    :tooltip="menu ? 'Collapse menu' : 'Expand menu'"
    @click="$store.commit('toggleSideBar')"
    @mouseenter="showToolTip('main_menu')"
    @focus="showToolTip('main_menu')"
    @mouseleave="hideToolTip"
    @mousedown="hideToolTip"
    @blur="hideToolTip"
    >
    <svg height="12" viewBox="0 0 27 18">
      <path id="menu_toggler" d="M4.5,27h27V24H4.5Zm0-7.5h27v-3H4.5ZM4.5,9v3h27V9Z" transform="translate(-4.5 -9)"/>
    </svg>
  </button>
</template>

<script>
import tooltipMixin from '@/mixins/tooltipMixin';
import { mapState } from 'vuex';
export default {
  name: 'SideBarToggle',
  mixins: [tooltipMixin],
  computed: {
      ...mapState({
        menu: (state) => state.DeviceWindow.menu
      }),
    }
}
</script>

<style lang="scss" scoped>
button {
    z-index: 100;
    height: 48px;
    width: 48px;
    margin: 10px 0 0 10px;
}
</style>