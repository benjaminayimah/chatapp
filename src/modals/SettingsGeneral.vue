<template>
    <div class="flex jc-sb">
        <div>Theme</div>
        <div class="flex flex-wrap gap-4">
            <button :class="{'is-active' : currentTheme === 'dark-theme' }" @click="$store.commit('setTheme', 'dark-theme')">dark</button>
            <button :class="{'is-active' : currentTheme === 'light-theme' }" @click="$store.commit('setTheme', 'light-theme')">light</button>
            <button :class="{'is-active' : currentTheme === 'system-theme' }" @click="$store.commit('setSystemTheme')">System</button>
        </div>
    </div>
    <p>
        Yes, humans have been to the moon. The first humans to walk on the moon were Neil Armstrong and Buzz Aldrin, who landed on the lunar surface on July 20, 1969, as part of the Apollo 11 mission. Five subsequent Apollo missions also landed astronauts on the moon, with the last human to walk on the moon being Eugene Cernan in 1972. There is a large amount of evidence that humans have been to the moon, including: Photographs and video footage: There are numerous photographs and videos of astronauts on the moon, as well as of the lunar lander and other equipment. Lunar samples: Astronauts brought back over 840 pounds of lunar samples, which have been extensively studied by scientists.
    </p>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'SettingsGeneral',
    computed: {
        ...mapState({
            currentTheme: (state) => state.theme.currentTheme
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