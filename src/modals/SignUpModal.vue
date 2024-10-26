<template>
    <Modal :opacity=".5" :zindex="500" :width="400" :minHeight="20">
        <template #header>
            <span></span>
        </template>
        <template #body>
            <div class="centered signup-wrapper">
                <div class="su-inner text-center flex flex-column gap-24">
                    <div class="fs-105rem">No account creation is required</div>
                    <button @click="logIn" class="button-primary fw-600 fs-09 jc-c">Continue</button>
                    <div class="foot-text fs-09">By continuing, you agree to our Terms & Conditions and our Privacy Policy.</div>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script>
import Modal from './Modal.vue'
import randomIdGenMixin from '@/mixins/randomIdGenMixin';
export default {
    name: 'SignUpModal',
    components: { Modal },
    mixins: [randomIdGenMixin],
    props: {
        auth: Boolean
    },
    methods: {
        async logIn() {
            const token = this.generateUniqueId(16)
            const recents = JSON.parse(localStorage.getItem('recents'))
            !recents ? localStorage.setItem('recents', JSON.stringify([])) : ''
            localStorage.setItem('auth', token)
            await this.$store.commit('setAuth', token)
            this.$router.push({ name: 'Home'})
        }
    },
    mounted() {
        this.auth ? this.$router.push({ query: { m: null }}) : ''
    }
}
</script>

<style lang="scss" scoped>
.signup-wrapper {
    padding: 0 20px 32px 20px;
}
.su-inner {
    width: 70%;
}
.foot-text {
    color: var(--main-font-color-2);
}
button {
    height: 40px;
}
</style>