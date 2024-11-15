<template>
  <div class="flex chat-body-wrapper flex-1 jc-c overflow-y-scroll">
    <div class="chat-wrapper flex-1">
      <img alt="Vue logo" src="../assets/logo.png">
      <button class="flex jc-c ai-c br-50">Gradient Border</button>

      <HelloWorld msg="Get answers. Find inspiration. Be more productive."/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: { HelloWorld },
  mounted() {
    !this.auth ? this.$router.push({ query: { m: 'signin' }}) : ''
  }

}
</script>
<style lang="scss" scoped>
.chat-wrapper {
    max-width: 1080px;
    padding: 0 20px;
}


/* Basic button styling */
button {
  position: relative;
  padding: 12px 24px;
  background-color: #19191b;
  color: white; /* Text color */
  border: none;
  border-radius: 80px; /* Rounded corners */
}

button::after {
  content: '';
  position: absolute;
  height: 107%;
  width: 102%;
  border-radius: 99px;
  background-image: linear-gradient(to bottom right, #3159e9, #f747e8);
  z-index: -1;
}



</style>
