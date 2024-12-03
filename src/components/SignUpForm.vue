<template>
    <form @submit.prevent="handleSubmit">
        <div role="alert" class="error-msg-container fs-095 flex ai-c gap-8" v-if="responseErrorMessage || networkError">
            <svg height="16" viewBox="0 0 20.003 18">
                  <path class="invert-fill-color" d="M11.14,4.494a1,1,0,0,1,1.72,0l7,12.008A1,1,0,0,1,19,18H5a1,1,0,0,1-.86-1.5Zm3.447-1.007a2.994,2.994,0,0,0-5.174,0l-7,12.007A3,3,0,0,0,5,20H19a3,3,0,0,0,2.587-4.506ZM13,9.019a1,1,0,0,0-2,0v2.994a1,1,0,0,0,2,0V9.02ZM12,13.75A1.25,1.25,0,1,0,13.25,15,1.25,1.25,0,0,0,12,13.75Z" transform="translate(-1.998 -2)" fill="#f22121" fill-rule="evenodd"/>
              </svg>
            {{ responseErrorMessage || networkError }}
        </div>
        <div class="form-wrapper flex flex-column gap-16">
            <input-reactive
                v-model="form.email"
                :id="'email'"
                :type="'email'"
                :label="'Email'"
                :autocomplete="'on'"
                :autofocus="true"
                :errors="errors"
            />
            <input-reactive
                v-model="form.password"
                :id="'password'"
                :type="'password'"
                :label="'Password'"
                :errors="errors"
            />
            <button type="submit" class="button-primary fw-600 fs-09 jc-c ai-c gap-8" :disabled="spinner">
                <spinner v-if="spinner" :size="18" />
                <span v-else>{{ formType === 'signup' ? 'Sign up' : 'Sign in' }}</span>
            </button>
            <button @click.prevent="" v-if="formType === 'signin'" class="transparent-button fw-600 fs-09 jc-c ai-c" data-type="modal">Forgot password?</button>
        </div>
    </form>
</template>

<script>
import api from '@/services/apis';
import errorHandlerMixin from '@/mixins/errorHandlerMixin';
import Spinner from './Spinner.vue';
import InputReactive from './InputReactive.vue';

export default {
    components: { Spinner, InputReactive },
    name: 'SignUpForm',
    mixins: [errorHandlerMixin],
    props: {
        formType: String
    },
    data () {
        return {
            form: {
                email: 'johndoe@example.com',
                password: '123456#@!'
            },
            spinner: false
        }
    },
    methods: {
        handleSubmit() {
            this.formType === 'signup' ? this.SignUp() : this.SignIn()
        },
        async SignIn() {
            this.showSpiner()
            try {
                const response = await api.post('/auth/signin', this.form)
                this.signInSuccess(response.data.token)
            } catch (err) {
                this.hideSpiner()
                this.handleError(err)
            }
        },
        async signInSuccess(token) {
            await this.$store.commit('setAuth', token)
            location.reload()
        },
        async SignUp() {
            this.showSpiner()
            try {
                const response = await api.post('/auth/signup', this.form);
                this.signUpSuccess(response.data.token)
            } catch (err) {
                this.hideSpiner()
                this.handleError(err)
            }
        },
        async signUpSuccess(res) {
            this.hideSpiner()
            console.log(res)
        },
        showSpiner() {
            this.spinner = true
        },
        hideSpiner() {
            this.spinner = false
        }
    }
   
}
</script>

<style lang="scss" scoped>
button {
    height: 40px;
}
.error-msg-container {
  margin-bottom: 32px;
}

</style>