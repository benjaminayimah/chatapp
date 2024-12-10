<template>
  <transition name="slide">
    <div v-if="alert" class="alert-container">
      <div class="error-snack-container bg-surface-inverse-2">
        <div class="flex ai-c gap-10" role="alert">
          <span v-html="statusIcon(this.alert.type, 21)" class="flex"></span>
          <div class="flex-1 text-left">{{ alert.message }}</div>
          <button @mousedown="$store.commit('dismissAlert')" class="bg-transparent btn-inverted jc-c ai-c flex-shrink-0" data-type="modal">
              <svg height="12" viewBox="0 0 13.587 13.587">
                  <path id="close_alert" d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)"/>
              </svg>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import statusIconsMixin from '@/mixins/statusIconsMixin';
import { mapState } from 'vuex'
export default {
    name: 'AlertBar.vue',
    mixins: [statusIconsMixin],
    computed: {
      ...mapState({
        alert: (state => state.alert)
      })
    }
}
</script>
<style scoped lang="scss">
.alert-container {
  position: fixed;
  z-index: 9999;
  top: 7px;
  width: 100%;
  text-align: center;
  padding: 0 20px;
  height: 0;
}
.error-snack-container {
  padding: 10px 10px 10px 16px;
  border-radius: 40px;
  box-shadow: var(--box-shadow-1);
  max-width: 800px;
  display: inline-block;
}

button {
  height: 32px;
  width: 32px;
  &:hover {
    background-color: var(--alert-close-button-hover);
  }
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