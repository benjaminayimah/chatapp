<template>
  <button @click="$store.commit('toggleSideBar')" class="fixed transparent-button">
    <svg height="13" viewBox="0 0 27 18">
      <path id="menu_toggler" d="M4.5,27h27V24H4.5Zm0-7.5h27v-3H4.5ZM4.5,9v3h27V9Z" transform="translate(-4.5 -9)"/>
    </svg>
  </button>
</template>

<script>
export default {
    name: 'SideBarToggle'
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