<template>
    <nav class="bg-surface-1 flex jc-c ai-c">
        <div class="top-bar-wrapper flex flex-1 ai-c jc-sb">
            <h3 class="fw-500">Xirion</h3>
            <button @click="getStarted" class="button-primary fw-600 fs-09">Get started</button>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'TopBar',
    props: {
        auth: Boolean
    },
    methods: {
        getStarted() {
            this.$router.push({ query: { m: 'signup' }}) 
        }
    }
}
</script>
<style lang="scss" scoped>
.top-bar-wrapper {
    max-width: 1080px;
    height: 65px;
    padding: 0 20px;
}

nav {
    // outline: 1px hotpink solid;
}
button {
    height: 40px;
    padding: 16px
}

</style>