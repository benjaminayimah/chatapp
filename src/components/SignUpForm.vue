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
                :errors="errors"
            />
            <input-reactive
                v-model="form.password"
                :id="'password'"
                :type="'password'"
                :label="'Password'"
                :autocomplete="'on'"
                :errors="errors"
            />
            <button-submit
                :classes="'button-primary default fs-09 fw-600'"
                :content="formType === 'signup' ? 'Sign up' : 'Sign in'"
                :type="'submit'"
                :processing="processing"
                :disabled="processing"
            />
            <button @click.prevent="" v-if="formType === 'signin'" class="transparent-button fw-600 fs-09 jc-c ai-c" data-type="modal">Forgot password?</button>
        </div>
    </form>
</template>

<script>
import api from '@/services/apis';
import formMixin from '@/mixins/formMixin';
import InputReactive from './InputReactive.vue';
import ButtonSubmit from './ButtonSubmit.vue';

export default {
    components: { InputReactive, ButtonSubmit },
    name: 'SignUpForm',
    mixins: [formMixin],
    props: {
        formType: String
    },
    data () {
        return {
            form: {
                email: 'johndoe@example.com',
                password: '123456#@!'
            }
        }
    },
    methods: {
        handleSubmit() {
            this.formType === 'signup' ? this.SignUp() : this.SignIn()
        },
        async SignIn() {
            this.startProcessing()
            try {
                const response = await api.post('/auth/signin', this.form)
                this.signInSuccess(response.data.token)
            } catch (err) {
                this.stopProcessing()
                this.handleError(err)
            }
        },
        async signInSuccess(token) {
            await this.$store.commit('setAuth', token)
            location.reload()
        },
        async SignUp() {
            this.startProcessing()
            try {
                const response = await api.post('/auth/signup', this.form);
                this.signUpSuccess(response.data)
            } catch (err) {
                this.stopProcessing()
                this.handleError(err)
            }
        },
        async signUpSuccess(res) {
            this.stopProcessing()
            console.log(res)
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