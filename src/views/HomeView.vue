<template>
  <div class="flex chat-body-wrapper flex-1 jc-c overflow-y-scroll">
    <div class="chat-wrapper flex-1">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Get answers. Find inspiration. Be more productive."/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {HelloWorld},
  data() {
    return {
      prompt: 'hi'
    }
  },
  methods: {
    
  }

}
</script>
<style lang="scss" scoped>
.chat-wrapper {
    max-width: 1080px;
    padding: 0 20px;
}
</style>
