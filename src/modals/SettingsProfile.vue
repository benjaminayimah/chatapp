<template>
    <h4 class="settings-tab-title">Public profile</h4>
    <div class="flex flex-column gap-24">
        <div class="form-row pd-b-8">
            <profile-avatar
                :image="form.image"
                :width="100"
                :height="100"
                :color="form.color"
                :name="form.displayName || form.username"
                :fontSize="2"
                :upload="true"
                :uploadInputId="uploadInputId"
                :deleting="deleting"
                :uploading="uploading"
                @upload-click="uploadClick"
                @delete-image="handleImageDelete"
            />
            <input class="hide" @change="uploadImage" name="image" :id="uploadInputId" type="file" ref="img">
        </div>
        <input-reactive
            v-model="form.username"
            :id="'username'"
            :type="'text'"
            :label="'Username'"
            :errors="errors"
            :maxLength="20"
            :placeholder="'e.g. johnsmith123'"
            :required="true"
            :checkUsername="checkUsername"
            :hasUnsavedChanges="hasUnsavedChanges"
        />
        <input-reactive
            v-model="form.displayName"
            :id="'displayName'"
            :type="'text'"
            :label="'Display name'"
            :errors="errors"
            :maxLength="50"
            :placeholder="'e.g. John Smith'"
            :required="true"
            :hasUnsavedChanges="hasUnsavedChanges"
        />
        <input-reactive
            v-model="form.bio"
            :id="'bio'"
            :type="'text'"
            :label="'Bio'"
            :errors="errors"
            :maxLength="400"
            :isTextarea="true"
            :rows="3"
            :placeholder="'e.g. I\'m a UX Designer and Front-end developer.'"
            :hasUnsavedChanges="hasUnsavedChanges"
        />
        <div v-show="computedMarkUnsaved" class="flex gap-8 jc-fe sticky pd-t-24 pd-b-24 bottom-0">
            <button-submit
                @handle-button-click="doRevertChanges"
                :classes="'button-outline default fs-09 fw-600'"
                :content="'Revert'"
            />
            <button-submit
                @handle-button-click="saveChanges"
                :classes="'button-primary default fs-09 fw-600'"
                :content="'Save changes'"
                :type="'submit'"
                :processing="processing"
                :disabled="processing"
            />
        </div>
    </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

import formMixin from '@/mixins/formMixin';
import uploadMixin from '@/mixins/uploadMixin';
import ProfileAvatar from '@/components/ProfileAvatar.vue';
import InputReactive from '@/components/InputReactive.vue';
import ButtonSubmit from '@/components/ButtonSubmit.vue';
import api from '@/services/apis';

export default {
    components: { ProfileAvatar, InputReactive, ButtonSubmit },
    name: 'SettingsProfile',
    mixins: [formMixin, uploadMixin, modalMixin],
    props: {
        user: Object
    },
    computed: {
        computedMarkUnsaved() {
            const fieldsToCompare = ['image', 'username', 'displayName', 'bio'];
            return fieldsToCompare.some(
                (field) => this.form[field] !== this.user[field]
            );
        }
    },
    watch: {
        computedMarkUnsaved(newValue) {
            this.resetRevertChangeStatus(newValue)
        }
    },
    data() {
        return {
            uploadInputId: 'updateUploadInput',
            uploading: false,
            deleting: false,
            newUpload: false,
            hasUnsavedChanges: false,
            form: {
                username: '',
                displayName: '',
                bio: '',
                image: null,
                color: '',
                id: null
            }
        }
    },
    methods: {
        prefillForm() {
            if (!this.user) return;
            const defaultValues = {
                username: '',
                displayName: '',
                bio: '',
                color: null,
                image: null,
                id: null,
            };
            Object.keys(defaultValues).forEach((key) => {
                this.form[key] = this.user[key] ?? defaultValues[key];
            });
        },
        handleImageDelete(image) {
            !this.newUpload ?
            (
                this.form.image = null,
                this.newUpload = true
            )
            : this.deleteImage(image)
        },
        async checkUsername(username) {
            this.errors ? this.errors = [] : ''
            const res = await api.get(`/user/validate-username/${username}`);
            return res.data; 
        },
        async saveChanges() {

            this.startProcessing()
            try {
                const res = await api.put('/user', this.form);
                await this.$store.commit('setUser', res.data.user)

                if (this.$route.name === 'PublicProfile') {
                    this.$router.replace({
                        name: 'PublicProfile',
                        params: { username: res.data.user.username },
                    });
                    await this.$store.commit('updateCurrentProfile', res.data.user)
                }else {
                    this.closeModal()
                }

                await this.$store.dispatch('showAlert', { type: 'success', autoDismiss: true, message: res.data.message })

            } catch (err) {
                this.handleError(err)
            } finally {
                this.stopProcessing()
            }
        },
        async doRevertChanges() {
            if(this.newUpload && this.form.image) {
                await this.deleteImage(this.form.image)
            }
            this.prefillForm()
            this.setRevertChangeStatus()
            this.errors ? this.errors = [] : ''
            this.newUpload = false
        },
        setRevertChangeStatus() {
            this.hasUnsavedChanges = true
        },
        resetRevertChangeStatus(status) {
            if(status) {
                this.hasUnsavedChanges = false 
            }
        }
    },
    mounted() {
        this.prefillForm()
    }
}
</script>

<style lang="scss" scoped>
.button-outline  {
    background-color: var(--modal-main-background);
}
.sticky {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, var(--modal-main-background) 30%);
}

</style>