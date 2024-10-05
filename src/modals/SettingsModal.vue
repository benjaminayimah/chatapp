<template>
    <Modal :opacity=".5" :zindex="500" :width="650">
        <template #header>
            <h3>Settings</h3>
        </template>
        <template #body>
            <p class="flex gap-8">
                <button :class="{'is-active' : currentTheme === 'dark-theme' }" @click="$store.commit('setTheme', 'dark-theme')">dark</button>
                <button :class="{'is-active' : currentTheme === 'light-theme' }" @click="$store.commit('setTheme', 'light-theme')">light</button>
                <button :class="{'is-active' : currentTheme === 'device-theme' }" @click="$store.commit('setDeviceTheme')">Device</button>
            </p>
        </template>
    </Modal>
</template>

<script>
import { mapState } from 'vuex';
import Modal from './Modal.vue'

export default {
    name: 'SettingsModal',
    components: { Modal },
    computed: {
        ...mapState({
            currentTheme: (state) => state.currentTheme
        }),
    }
}
</script>

<style lang="scss" scoped>
.is-active {
  background-color: #06d40d;
  color: #fff;
}
</style>