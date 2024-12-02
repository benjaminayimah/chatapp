<template>
    <Modal :opacity=".5" :zindex="500" :width="450" :minHeight="20" :hasButton="false">
        <template #body>
            <div class="centered signup-wrapper">
                <div class="w-100 flex flex-column gap-16">
                    <div class="fs-104 flex ai-c gap-8">
                        <svg height="22" viewBox="0 0 20.003 18">
                            <path class="invert-fill-color" d="M11.14,4.494a1,1,0,0,1,1.72,0l7,12.008A1,1,0,0,1,19,18H5a1,1,0,0,1-.86-1.5Zm3.447-1.007a2.994,2.994,0,0,0-5.174,0l-7,12.007A3,3,0,0,0,5,20H19a3,3,0,0,0,2.587-4.506ZM13,9.019a1,1,0,0,0-2,0v2.994a1,1,0,0,0,2,0V9.02ZM12,13.75A1.25,1.25,0,1,0,13.25,15,1.25,1.25,0,0,0,12,13.75Z" transform="translate(-1.998 -2)" fill="#F08637" fill-rule="evenodd"/>
                        </svg>
                        Session expired
                    </div>
                    <div>Your login session has expired. Please login again.</div>
                    <div class="flex jc-fe">
                        <button @click="reLogin" class="button-primary fw-600 fs-09 ai-c jc-c pl-16 pr-16">Login</button>
                    </div>
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
            tokenExpired: (state) => state.auth.tokenExpired
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
            this.$router.push({ query: { m: 'signin' }}) 
        }
    },
    mounted() {
        (this.auth && !this.tokenExpired) ? 
            this.$router.push({ query: { ...this.$route.query, m: null }}) :
            ''
    }
}
</script>

<style lang="scss" scoped>
.signup-wrapper {
    padding: 16px 24px;
}
.mobile {
    .fs-105  {
        font-size: 1.3rem;
    }
}
button {
    height: 40px;
}
</style>