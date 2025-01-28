<template>
    <div class="modal-overlay centered fixed h-100 w-100" @click.self="closeModal">
        <div class="modal-container flex flex-column gap-8 bg-modal-surface ov-hidden">
            <div class="modal-header">
                <h4>Change password</h4>
            </div>
            <div class="modal-body">
                <div class="body-wrapper delete-modal-body flex flex-column gap-8">
                    <span class="h-2">{{ changePassword?.state === 'default' ? 'If you want to change your password, we will send you a code in your email to verify that this is your account.' : 'Enter the code you received in your email to change your password.' }}</span>
                </div>
                <form v-if="changePassword?.state === 'enter-code'" class="mb-24">
                    <div class="form-wrapper flex flex-column gap-16">
                        <input-reactive
                            v-model="form.resetCode"
                            :id="'resetCode'"
                            :type="'text'"
                            :label="'Reset code'"
                            :errors="errors"
                        />
                        <input-reactive
                            v-model="form.password"
                            :id="'password'"
                            :type="'password'"
                            :label="'New password'"
                            :errors="errors"
                        />
                    </div>
                </form>
                <div class="flex flex-column gap-8 mt-4">
                    <button v-if="changePassword?.state === 'default'" @click="enterCode" class="transparent-button default fw-500 fs-09 jc-c ai-c" data-type="modal">Already have a code?</button>
                    <button-submit
                        @handle-button-click="handleRequest"
                        :classes="'button-primary default fs-09 fw-600 w-100'"
                        :label="changePassword?.state === 'default' ? 'Request code' : 'Change password'"
                        :type="'submit'"
                        :processing="processing"
                        :disabled="processing"
                    />
                    <button-submit
                        @handle-button-click="closeModal"
                        :classes="'button-outline default fs-09 fw-600 w-100'"
                        :label="'Cancel'"
                        :type="'button'"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import formMixin from '@/mixins/formMixin';
import ButtonSubmit from '@/components/ButtonSubmit.vue';
import InputReactive from '@/components/InputReactive.vue';

export default {
    components: { ButtonSubmit, InputReactive },
    mixins: [formMixin],
    props: {
        changePassword: Object
    },
    data() {
        return {
            form: {
                resetCode: '',
                password: ''
            }
        }
    },
    methods: {
        async closeModal() {
            this.$store.commit('closeChangePasswordModal')
        },
        async handleEsc(e) {
            if (e.key === 'Escape') {
                this.$store.commit('closeChangePasswordModal')
            }
        },
        enterCode() {
            this.$store.commit('setChangePasswordModal', { state: 'enter-code' })
        },
        async handleRequest() {
            this.startProcessing()
            if(this.changePassword?.state === 'default') {
                //make api call to send code
                setTimeout(() => {
                    this.stopProcessing()
                    this.$store.commit('setChangePasswordModal', { state: 'enter-code' })
                }, 1000);
            } else if (this.changePassword?.state === 'enter-code') {
                //make api call to submit password
                setTimeout(() => {
                    this.$store.commit('closeChangePasswordModal')
                    this.$store.dispatch('showAlert', { type: 'success', autoDismiss: true, message: 'Your password has been updated!' })
                }, 1000);
            }
        }
    },
    mounted() {
        document.addEventListener('keydown', this.handleEsc);
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.handleEsc);
    }
}
</script>
<style lang="scss" scoped>
.modal-overlay {
    background-color: rgba($color: #000000, $alpha: 0.6);
    z-index: 500;
    inset: 0 auto auto 0;
}

.modal-container {
    width: 420px;
    max-height: 90dvh;
    padding: 24px 26px 26px 26px;
}

.modal-header {
    justify-content: space-between;
    align-items: center;
}

.desktop, .tablet {
  .transparent-button {
    &:hover {
      background-color: var(--modal-close-button-hover);

    }
  }
}

.body-wrapper {
    padding: 6px 0 16px 0;
    
}
</style>