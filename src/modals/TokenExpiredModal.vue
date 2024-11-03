<template>
    <Modal :opacity=".5" :zindex="500" :width="400" :minHeight="20">
        <template #header>
            <span></span>
        </template>
        <template #body>
            <div class="centered signup-wrapper">
                <div class="su-inner text-center flex flex-column gap-24">
                    <div class="fs-105rem">Token has expired</div>
                    <div>Re-login to continue chating</div>
                    <button @click="reLogin" class="button-primary fw-600 fs-09 jc-c">Go to login</button>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script>
import { mapState } from 'vuex';
import Modal from './Modal.vue'

export default {
    name: 'TokenExpiredModal',
    components: { Modal },
    computed: {
        ...mapState({
            tokenExpired: (state) => state.tokenExpired
        })
    },
    props: {
        auth: Boolean
    },
    data () {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        async reLogin() {
            await this.$store.commit('destroyToken')
        }
    },
    mounted() {
        this.auth && !this.tokenExpired ? this.$router.push({ query: { m: null }}) : ''
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
button {
    height: 40px;
}
</style>