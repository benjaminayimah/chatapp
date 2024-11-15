<template>
<transition name="slide">
  <div v-if="error" class="error-snack-container bg-modal-surface">
    <div class="flex ai-c gap-10">
      <svg height="18" viewBox="0 0 30 30">
          <path d="M16.5,22.5h3v3h-3Zm0-12h3v9h-3ZM17.985,3A15,15,0,1,0,33,18,14.993,14.993,0,0,0,17.985,3ZM18,30A12,12,0,1,1,30,18,12,12,0,0,1,18,30Z" transform="translate(-3 -3)"/>
      </svg>
      <span>{{ error }}</span>
      <button @click="$store.commit('dismissError')" class="transparent-button jc-c flex-shrink-0" data-type="modal">
          <svg height="12" viewBox="0 0 13.587 13.587">
              <path id="close_modal" d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)"/>
          </svg>
      </button>
    </div>
  </div>
</transition>
</template>

<script>

import { mapState } from 'vuex'
export default {
    name: 'ErrorSnackBar',
    computed: {
      ...mapState({
        error: (state => state.error)
      })
    }
}
</script>
<style scoped lang="scss">
.error-snack-container{
  position: fixed;
  top: 30px;
  left: 50%;
  translate: -50%;
  z-index: 999;
  padding: 10px 10px 10px 16px;
  border-radius: 8px;
  box-shadow: var(--box-shadow-1);
  max-width: 400px;
}
button {
  height: 36px;
  width: 36px;
}
.slide-enter-active {
  transition: all 0.4s;
}
.slide-leave-active {
  transition: all 0.4s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-90px);
}
</style>