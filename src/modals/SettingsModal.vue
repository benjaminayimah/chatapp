<template>
    <Modal :opacity=".5" :zindex="500" :width="650">
        <template #header>
            <h3>Settings</h3>
        </template>
        <template #body>
            <p class="flex gap-8">
                <button :class="{'is-active' : currentTheme === 'dark-theme' }" @click="$store.commit('setTheme', 'dark-theme')">dark</button>
                <button :class="{'is-active' : currentTheme === 'light-theme' }" @click="$store.commit('setTheme', 'light-theme')">light</button>
                <button :class="{'is-active' : currentTheme === 'system-theme' }" @click="$store.commit('setSystemTheme')">System</button>
            </p>
            <p>
                Yes, humans have been to the moon. The first humans to walk on the moon were Neil Armstrong and Buzz Aldrin, who landed on the lunar surface on July 20, 1969, as part of the Apollo 11 mission. Five subsequent Apollo missions also landed astronauts on the moon, with the last human to walk on the moon being Eugene Cernan in 1972.

There is a large amount of evidence that humans have been to the moon, including:

Photographs and video footage: There are numerous photographs and videos of astronauts on the moon, as well as of the lunar lander and other equipment.
Lunar samples: Astronauts brought back over 840 pounds of lunar samples, which have been extensively studied by scientists.
Independent verification: Scientists and engineers from around the world have independently verified the authenticity of the Apollo missions and the lunar samples.
The moon landing is one of the most well-documented events in human history, and there is no credible evidence to suggest that it was faked.
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