<template>
    <Modal :opacity=".5" :zindex="500" :width="400" :minHeight="20">
        <template #header>
            <span>
                <div v-if="emailSignUp">
                    <button @click="useEmail" class="gap-4 button-outline back-btn fs-09 ai-c">
                        <svg xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 14.677 13">
                            <path d="M14.943,11.5a.885.885,0,0,1,.007,1.246l-4.11,4.123H21.686a.88.88,0,0,1,0,1.76H10.841l4.116,4.123A.891.891,0,0,1,14.95,24a.877.877,0,0,1-1.239-.007L8.133,18.372h0a.988.988,0,0,1-.183-.278.84.84,0,0,1-.068-.339.882.882,0,0,1,.251-.616l5.579-5.619A.862.862,0,0,1,14.943,11.5Z" transform="translate(-7.882 -11.252)" fill="#fff"/>
                        </svg>
                        Back
                    </button>
                </div>
            </span>
        </template>
        <template #body>
            <div class="centered signup-wrapper">
                <div class="su-inner text-center flex flex-column gap-32">
                        <div class="flex flex-column gap-8">
                            <div class="fs-105">{{ computedQuery === 'signup' ? 'Create a new account' : 'Sign in'  }}</div>
                            <div v-if="!emailSignUp">{{ computedQuery === 'signup' ? 'Choose a sign up method.' : 'Choose a sign in method below.'  }}</div>
                            <div v-else>Please fill out the form</div>
                        </div>
                        <div v-if="!emailSignUp" class="flex flex-column gap-32">
                            <div class="flex flex-column gap-10">
                                <button @click="loginWithGoogle" class="button-outline jc-c ai-c fs-09 fw-600 gap-8">
                                    <svg height="16" viewBox="0 0 31.341 32.021">
                                        <g transform="translate(26.754 -39.239)">
                                            <path class="invert-fill-color" d="M.576,52.268a18.55,18.55,0,0,0-.254-3.029H-14.754v6.017h8.632a7.433,7.433,0,0,1-3.2,4.777v4h5.15A15.654,15.654,0,0,0,.576,52.268Z" transform="translate(4.011 3.342)" fill="#4285f4"/>
                                            <path class="invert-fill-color" d="M-11.174,66.484A15.251,15.251,0,0,0-.594,62.6l-5.15-4a9.659,9.659,0,0,1-5.43,1.548,9.562,9.562,0,0,1-8.979-6.618h-5.31v4.123A15.987,15.987,0,0,0-11.174,66.484Z" transform="translate(0.431 4.776)" fill="#34a853"/>
                                            <path class="invert-fill-color" d="M-19.723,56.093a9.291,9.291,0,0,1-.507-3.055,9.652,9.652,0,0,1,.507-3.055V45.859h-5.31a15.825,15.825,0,0,0-1.721,7.178,15.825,15.825,0,0,0,1.721,7.178Z" transform="translate(0 2.213)" fill="#fbbc05"/>
                                            <path class="invert-fill-color" d="M-11.174,45.577a8.687,8.687,0,0,1,6.137,2.4l4.563-4.563a15.308,15.308,0,0,0-10.7-4.176,15.987,15.987,0,0,0-14.29,8.833l5.31,4.123A9.562,9.562,0,0,1-11.174,45.577Z" transform="translate(0.431)" fill="#ea4335"/>
                                        </g>
                                    </svg>
                                    Continue with Google
                                </button>
                                <button class="button-outline jc-c fs-09 ai-c fw-600 gap-8">
                                    <svg height="23" viewBox="0 0 24 25" fill="black">
                                        <path d="M17.6643 21.4713C16.5658 22.474 15.3665 22.3157 14.212 21.8407C12.9903 21.3552 11.8695 21.3341 10.5805 21.8407C8.96647 22.4951 8.11462 22.3051 7.15069 21.4713C1.68095 16.1626 2.48796 8.07803 8.69746 7.78251C10.2106 7.85639 11.2642 8.56352 12.1497 8.62685C13.4723 8.37355 14.7388 7.64531 16.1511 7.7403C17.8436 7.86695 19.1214 8.5002 19.962 9.64006C16.4649 11.6137 17.2944 15.9515 20.5 17.1652C19.8611 18.7484 19.0317 20.3209 17.653 21.4819L17.6643 21.4713ZM12.0376 7.71919C11.8695 5.3656 13.8982 3.42362 16.2296 3.23364C16.5546 5.95663 13.6068 7.98304 12.0376 7.71919Z" fill="black"></path>
                                    </svg>
                                    Continue with Apple
                                </button>
                                <div class="or-divider relative fs-08">OR</div>
                                <button @click="useEmail" class="button-outline ai-c jc-c fs-09 fw-600 gap-8">
                                    <svg width="17.88" height="14" viewBox="0 0 17.88 14">
                                        <path d="M15.7,12.089H2.184A2.372,2.372,0,0,0,0,14.608V23.57a2.372,2.372,0,0,0,2.184,2.519H15.7A2.372,2.372,0,0,0,17.88,23.57V14.608A2.372,2.372,0,0,0,15.7,12.089Zm-1.067,1.643L8.94,17.959,3.251,13.732ZM15.7,24.446H2.184a.825.825,0,0,1-.759-.876V14.655L8.5,19.9c.009.007.02.012.029.018l.031.019a.759.759,0,0,0,.169.076l.018,0a.731.731,0,0,0,.192.028h0a.72.72,0,0,0,.192-.028l.018,0a.764.764,0,0,0,.169-.076l.031-.019c.01-.006.02-.011.029-.018l7.076-5.248V23.57A.825.825,0,0,1,15.7,24.446Z" transform="translate(0 -12.089)"/>
                                    </svg>
                                    Email
                                </button>
                            </div>
                        </div>
                        <sign-up-form v-else :formType="computedQuery" @use-email="useEmail"/>
                    <!-- </div> -->
                    <div class="foot-text fs-09">By continuing, you agree to our <a href="#" class="a-link">Terms & Conditions</a> and our <a href="#" class="a-link">Privacy Policy</a>.</div>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script>
import Modal from './Modal.vue'
import randomIdGenMixin from '@/mixins/randomIdGenMixin';
import errorHandlerMixin from '@/mixins/errorHandlerMixin';
import SignUpForm from '@/components/SignUpForm.vue';
export default {
    name: 'SignUpModal',
    components: { Modal, SignUpForm },
    mixins: [randomIdGenMixin, errorHandlerMixin],
    props: {
        auth: Boolean
    },
    computed: {
        computedQuery() {
            return this.$route.query.m
        }
    },
    data () {
        return {
            emailSignUp: false,
        }
    },
    methods: {
        useEmail() {
            this.emailSignUp = !this.emailSignUp
        },
        loginWithGoogle() {
            const width = 500;
            const height = 600;
            const left = (window.screen.width / 2) - (width / 2);
            const top = (window.screen.height / 2) - (height / 2);

            const popup = window.open('http://localhost:3000/api/auth/google', 'oauthPopup', `width=${width},height=${height},top=${top},left=${left}`);
            popup.name = 'oauth_popup';
            if (!popup) {
                alert('Popup blocked. Please allow popups for this website.');
            }
            // this.openWebsocket()
            // window.addEventListener('message', this.handleAuthResponse, false);
        },
        handleAuthResponse(event) {

            // Ensure the message is from your backend
            const trustedOrigin = 'http://localhost:3000';

            if (event.origin === trustedOrigin) {
                if (event.data.success) {
                    // On success, store the token and set the user as logged in
                    // const token = event.data.token;
                    // this.signInSuccess(token)
                    console.log(event.data)
                    // this.$router.push('/dashboard'); // Redirect to a protected route
                } 
            }
            // Remove the event listener to prevent multiple triggers
            window.removeEventListener('message', this.handleAuthResponse, false);
        },
    },
    mounted() {
        this.auth ? this.$router.push({ query: { ...this.$route.query, m: null }}) : ''
    },
    unmounted() {
        window.removeEventListener('message', this.handleAuthResponse, false);
    }
}
</script>

<style lang="scss" scoped>
.signup-wrapper {
    padding: 16px 20px 32px 20px;
}
.su-inner {
    width: 70%;
}
.foot-text {
    color: var(--main-font-color-2);
}
button:not(.back-btn) {
    height: 40px;
}
button.back-btn {
  height: 32px;
  padding-left: 11px;
  padding-right: 11px;
}

.or-divider {
    color: var(--font-color-2);
    &::before {
        content: '';
        height: 1px;
    }
    &::after {
        content: '';
        height: 1px;
    }
}
.button-outline {
    border-color: var(--button-press-bg);
}
</style>