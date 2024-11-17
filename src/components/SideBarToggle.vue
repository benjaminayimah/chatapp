<template>
  <button @mousedown="hideToolTip" @mouseleave="hideToolTip" @mouseenter="showToolTip('main_menu')" id="main_menu" @click="$store.commit('toggleSideBar')" aria-label="Main menu" tooltip="Expand menu" class="fixed transparent-button jc-c ai-c">
    <svg height="13" viewBox="0 0 27 18">
      <path id="menu_toggler" d="M4.5,27h27V24H4.5Zm0-7.5h27v-3H4.5ZM4.5,9v3h27V9Z" transform="translate(-4.5 -9)"/>
    </svg>
  </button>
</template>

<script>
import tooltipMixin from '@/mixins/tooltipMixin';
export default {
  name: 'SideBarToggle',
  mixins: [tooltipMixin]
}
</script>

<style lang="scss" scoped>
button {
    z-index: 100;
    height: 48px;
    width: 48px;
    margin: 12px 0 0 10px;
}
</style>