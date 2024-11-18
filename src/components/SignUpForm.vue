<template>
    <form @submit.prevent="handleSubmit">
        <div role="alert" class="error-msg-container fs-095 flex ai-c gap-8" v-if="responseErrorMessage || networkError">
            <svg height="16" viewBox="0 0 30 30">
                <path d="M16.5,22.5h3v3h-3Zm0-12h3v9h-3ZM17.985,3A15,15,0,1,0,33,18,14.993,14.993,0,0,0,17.985,3ZM18,30A12,12,0,1,1,30,18,12,12,0,0,1,18,30Z" transform="translate(-3 -3)"/>
            </svg>
            {{ responseErrorMessage || networkError }}
        </div>
        <div class="form-wrapper flex flex-column gap-16">
            <div class="form-row flex flex-column gap-4">
                <div id="email_input_wrapper" class="input-wrapper relative">
                    <label for="email_input" class="input-label">Email</label>
                    <input 
                        v-model="form.email"
                        @focusin="isFocusIn('email_input_wrapper')"
                        @focusout="isFocusOut('email_input_wrapper', 'email_input')"
                        :aria-invalid="emailHasErrors"
                        :aria-describedby="emailDescribedBy"
                        class="w-100 form-control"
                        type="email"
                        id="email_input"
                        name="email"
                        maxlength="100"
                        autofocus
                        autocomplete="on"
                    >
                </div>
                <div v-if="emailErrors.length" class="validation-errors">
                    <li :id="`email_error_${index + 1}`" role="alert" v-for="(error, index) in emailErrors" :key="index" class="fs-09">
                        {{ error.msg }}
                    </li>
                </div>
            </div>
            <div class="form-row flex flex-column gap-4">
                <div id="password_input_wrapper" class="input-wrapper relative">
                    <label for="password_input" class="input-label">Password</label>
                    <input 
                        v-model="form.password"
                        @focusin="isFocusIn('password_input_wrapper')"
                        @focusout="isFocusOut('password_input_wrapper', 'password_input')"
                        :type="showPass ? 'text' : 'password'"
                        :aria-invalid="passwordHasErrors"
                        :aria-describedby="passwordDescribedBy"
                        class="w-100 form-control error-border"
                        id="password_input"
                        name="password"
                    >
                    <span class="hide-show-pass transparent-button absolute centered br-50 a-button" :class="{ 'hide-pass-active' : showPass }" @click.prevent="togglePass" data-type="modal">
                        <svg height="18" viewBox="0 0 26.364 26.364">
                            <g transform="translate(1.182 1.182)">
                                <path d="M16027.619-15079.234a21.431,21.431,0,0,1-4.111-4.4,2.816,2.816,0,0,1,0-3.226,21.339,21.339,0,0,1,4.111-4.406,11.5,11.5,0,0,1,7.129-2.734,11.516,11.516,0,0,1,7.132,2.734,21.4,21.4,0,0,1,4.107,4.4,2.822,2.822,0,0,1,0,3.229,21.4,21.4,0,0,1-4.107,4.4,11.51,11.51,0,0,1-7.132,2.734A11.492,11.492,0,0,1,16027.619-15079.234Zm.927-10.853a19.948,19.948,0,0,0-3.813,4.087,1.32,1.32,0,0,0,0,1.5,19.8,19.8,0,0,0,3.81,4.084,10.018,10.018,0,0,0,6.2,2.412,10.015,10.015,0,0,0,6.2-2.412,19.886,19.886,0,0,0,3.814-4.088,1.322,1.322,0,0,0,0-1.5,19.9,19.9,0,0,0-3.81-4.083,10.011,10.011,0,0,0-6.2-2.413A10.013,10.013,0,0,0,16028.546-15090.087Zm1.454,4.836a4.754,4.754,0,0,1,4.748-4.748,4.758,4.758,0,0,1,4.752,4.748,4.758,4.758,0,0,1-4.752,4.752A4.754,4.754,0,0,1,16030-15085.251Zm1.5,0a3.253,3.253,0,0,0,3.25,3.25,3.253,3.253,0,0,0,3.249-3.25,3.253,3.253,0,0,0-3.249-3.25A3.253,3.253,0,0,0,16031.5-15085.251Z" transform="translate(-16022.748 15097.25)" fill="#000"/>
                                <path id="pass_icon_stroke" v-if="!showPass" d="M0,22.121-2.121,20,20-2.121,22.121,0Z" transform="translate(2 2)" stroke-linecap="round" stroke-width="1.5"/>
                            </g>
                        </svg>
                    </span>
                </div>
                <div v-if="passwordErrors.length" class="validation-errors">
                    <li :id="`password_error_${index + 1}`" role="alert" v-for="(error, index) in passwordErrors" :key="index" class="fs-09" >
                        {{ error.msg }}
                    </li>
                </div>
            </div>
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
import inputMixin from '@/mixins/inputMixin';
import Spinner from './Spinner.vue';
export default {
    components: { Spinner },
    name: 'SignUpForm',
    mixins: [errorHandlerMixin, inputMixin],
    props: {
        formType: String
    },
    computed: {
        emailErrors() {
            return this.errors && this.errors.filter(err => err.path === 'email')
        },
        passwordErrors() {
            return this.errors && this.errors.filter(err => err.path === 'password')
        },
        emailHasErrors() {
            return !!this.emailErrors.length
        },
        passwordHasErrors() {
            return !!this.passwordErrors.length
        },
        emailDescribedBy() {
            return this.emailErrors.map((_, index) => `email_error_${index + 1}`).join(" ");
        },
        passwordDescribedBy() {
            return this.passwordErrors.map((_, index) => `password_error_${index + 1}`).join(" ");
        }
    },
    data () {
        return {
            form: {
                email: '',
                password: ''
            }
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
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    height: 40px;
}
.hide-show-pass{
    right: 6px;
    height: 30px;
    width: 30px;
    top: 50%;
    transform: translateY(-50%);
}
.hide-pass-active{
    background-color: var(--modal-close-button-hover) !important;
}
#pass_icon_stroke {
    stroke: var(--main-background-primary)
}
.error-msg-container {
  margin-bottom: 32px;
}
input {
    border-radius: 80px;
    height: 42px;
    padding: 0 16px;
}
</style>