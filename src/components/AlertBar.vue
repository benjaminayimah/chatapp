<template>
  <transition name="slide">
    <div v-if="alert" class="error-snack-container bg-modal-surface">
      <div class="flex ai-c gap-10">
        <span v-html="icon(this.alert.type)" class="flex"></span>
        <div class="flex-1">{{ alert.message }}</div>
        <button @mousedown="$store.commit('dismissAlert')" class="transparent-button jc-c ai-c flex-shrink-0" data-type="modal">
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
    name: 'AlertBar.vue',
    computed: {
      ...mapState({
        alert: (state => state.alert)
      })
    },
    methods: {
      icon(param) {
        switch (param) {
          case 'error':
            return `
              <svg height="18" viewBox="0 0 20.003 18">
                  <path class="invert-fill-color" d="M11.14,4.494a1,1,0,0,1,1.72,0l7,12.008A1,1,0,0,1,19,18H5a1,1,0,0,1-.86-1.5Zm3.447-1.007a2.994,2.994,0,0,0-5.174,0l-7,12.007A3,3,0,0,0,5,20H19a3,3,0,0,0,2.587-4.506ZM13,9.019a1,1,0,0,0-2,0v2.994a1,1,0,0,0,2,0V9.02ZM12,13.75A1.25,1.25,0,1,0,13.25,15,1.25,1.25,0,0,0,12,13.75Z" transform="translate(-1.998 -2)" fill="#f22121" fill-rule="evenodd"/>
              </svg>
            `
            case 'success':
              return `
                <svg height="20" viewBox="0 0 18 18.001">
                  <path class="invert-fill-color" d="M-2972.294-699.625a9,9,0,0,1,9-9,9,9,0,0,1,9,9,9,9,0,0,1-9,9A9,9,0,0,1-2972.294-699.625Zm3.492-5.509a7.737,7.737,0,0,0-2.281,5.509,7.737,7.737,0,0,0,2.281,5.508,7.737,7.737,0,0,0,5.508,2.281,7.74,7.74,0,0,0,5.508-2.281,7.737,7.737,0,0,0,2.281-5.508,7.737,7.737,0,0,0-2.281-5.509,7.739,7.739,0,0,0-5.508-2.28A7.737,7.737,0,0,0-2968.8-705.134Zm3.326,8.832-2.423-2.423a.173.173,0,0,1,0-.247l.771-.77a.17.17,0,0,1,.122-.052.167.167,0,0,1,.121.052l1.921,1.921,5.279-5.317a.156.156,0,0,1,.122-.052.16.16,0,0,1,.12.052l.762.783a.185.185,0,0,1,0,.247l-5.785,5.816h0a.809.809,0,0,1-.5.238A.77.77,0,0,1-2965.476-696.3Z" transform="translate(2972.294 708.626)" fill="#07b923"/>
                </svg>
              `
          default:
            break;
        }
      }
    }
}
</script>
<style scoped lang="scss">
.error-snack-container {
  position: fixed;
  top: 20px;
  left: 50%;
  translate: -50%;
  z-index: 999;
  padding: 10px 10px 10px 16px;
  border-radius: 8px;
  box-shadow: var(--box-shadow-1);
  max-width: 400px;
}
.mobile {
  .error-snack-container {
    width: 80vw;
  }
}
button {
  height: 32px;
  width: 32px;
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