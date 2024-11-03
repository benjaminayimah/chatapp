<template>
    <nav class="bg-surface-1 flex jc-c ai-c">
        <div class="top-bar-wrapper flex flex-1 ai-c jc-sb">
            <h3 class="fw-500">Xirion</h3>
            <div v-if="!auth" class="flex gap-8">
                <button @click="signUp" class="button-primary fw-600 fs-09">Sign up</button>
                <button @click="signIn" class="button-outline fw-600 fs-09">Log in</button>
            </div>
            <button v-else @click="logout" class="button-primary fw-600 fs-09">Logout</button>

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
        signUp() {
            this.$router.push({ query: { m: 'signup' }}) 
        },
        signIn() {
            this.$router.push({ query: { m: 'signin' }}) 
        },
        async logout() {
            this.$store.dispatch('logout')
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