<template>
    <nav class="sticky sticky-top bg-surface-1">
        <router-link to="/">Home</router-link> |
        <router-link to="/gemini-pro">Gemini-Pro</router-link> |
        <router-link to="/gemini-chat">Chat</router-link> |
        <router-link to="/vision-pro">Vision-Pro</router-link> |
        <router-link to="/streaming">Streaming</router-link> |
        <router-link to="/gemini-start">Gemini Start</router-link>
    </nav>
</template>
<script>
export default {
    name: 'NavBar'
}
</script>
<style lang="scss" scoped>
nav {
    
}

</style>