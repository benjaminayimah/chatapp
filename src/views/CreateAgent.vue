<template>
    <div v-if="isEditMode && !computedAgent" class="centered pd-16 empty-state">
        <empty-state
            :message="computedMessage"
            :button="true"
            @empty-btn-event="redirectBack"
        />
    </div>
    <div v-else>
        <div class="flex jc-c sticky bg-surface-1 page-top-wrapper" style="z-index: 2">
            <div class="section-wrapper page-top flex-1 pd-b-16 pd-t-4">
                <button @click="goBack" class="gap-4 default button-outline ai-c fs-09">
                    <svg xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 14.677 13">
                        <path d="M14.943,11.5a.885.885,0,0,1,.007,1.246l-4.11,4.123H21.686a.88.88,0,0,1,0,1.76H10.841l4.116,4.123A.891.891,0,0,1,14.95,24a.877.877,0,0,1-1.239-.007L8.133,18.372h0a.988.988,0,0,1-.183-.278.84.84,0,0,1-.068-.339.882.882,0,0,1,.251-.616l5.579-5.619A.862.862,0,0,1,14.943,11.5Z" transform="translate(-7.882 -11.252)" fill="#fff"/>
                    </svg>
                    Back
                </button>
                <ul v-if="device === 'mobile'" class="flex pd-t-16 tab-default">
                    <button @click="switchTab('editor-mode')" class="flex-1 bg-transparent default jc-c ai-c br-0">
                        <span :class="{ 'active-tab' : tab === 'editor-mode'}">Editor</span>
                    </button>
                    <button @click="switchTab('preview-mode')" class="flex-1 jc-c bg-transparent default ai-c br-0">
                        <span :class="{ 'active-tab' : tab === 'preview-mode'}">Preview</span>
                    </button>
                </ul>
            </div>
        </div>
        <div class="flex jc-c">
            <div class="section-wrapper flex-1">
                <div class="flex gap-32" :class="device === 'mobile' ? tab : ''">
                    <div class="editor-container flex-1 pd-t-24">
                        <form @submit.prevent="" class="pd-b-32">
                            <div class="form-wrapper flex flex-column gap-8">
                                <div class="form-row pd-b-16">
                                    <profile-avatar
                                        :image="form.image"
                                        :width="100"
                                        :height="100"
                                        :color="form.color"
                                        :name="form.agentName"
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
                                <div class="form-row flex flex-column gap-4">
                                    <div class="input-wrapper flex flex-column gap-4">
                                        <label for="name"><strong>Agent name</strong></label>
                                        <input v-model="form.agentName" id="name" name="name" class="form-control" type="text" @input="markUnsaved" maxlength="20" placeholder="E.g. Cocoa farmer" autocomplete="off">
                                        <div class="flex jc-fe"><span class="fs-08 sub-label">0/20</span></div>
                                    </div>
                                </div>
                                <div class="form-row flex flex-column gap-4">
                                    <div class="input-wrapper flex flex-column gap-4">
                                        <label for="headline"><strong>Headline</strong></label>
                                        <input v-model="form.headline" id="headline" name="headline" class="form-control" type="text" @input="markUnsaved" maxlength="50" placeholder="E.g. A short headline about what your Agent does" autocomplete="off">
                                        <div class="flex jc-fe"><span class="fs-08 sub-label">0/50</span></div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="input-wrapper flex flex-column gap-4">
                                        <label for="greeting"><strong>Greeting</strong></label>
                                        <textarea v-model="form.greeting" name="greeting" id="greeting" class="form-control textarea-no-resize" @input="markUnsaved" rows="5" maxlength="500" placeholder="E.g. Hello, I am your Cocoa farm AI Agent. Ask me anything about your cocoa farm."></textarea>
                                        <div class="flex jc-fe"><span class="fs-08 sub-label">0/500</span></div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="input-wrapper flex flex-column gap-4">
                                        <label for="description"><strong>Description</strong></label>
                                        <textarea v-model="form.description" name="description" id="description" class="form-control textarea-no-resize" @input="markUnsaved" rows="5" maxlength="500" placeholder="How would your Agent describe themselves?"></textarea>
                                        <div class="flex jc-fe"><span class="fs-08 sub-label">0/500</span></div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="input-wrapper flex flex-column gap-4">
                                        <label for="instructions"><strong>Instructions</strong></label>
                                        <textarea v-model="form.instructions" name="instructions" id="instructions" class="form-control textarea-no-resize" @input="markUnsaved" rows="5" maxlength="500" placeholder="E.g. You're an expert cocoa farm assistant located in Accra, Ghana. You provide"></textarea>
                                        <div class="flex jc-fe"><span class="fs-08 sub-label">0/500</span></div>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="input-wrapper">
                                        <p><strong>Visibility</strong></p>
                                        <button id="visibility_toggle" @click.prevent="handleDropdown('visibility_toggle', null)" class="gap-10 capitalize default ai-c button-outline visibility-toggle fs-095">
                                            <div class="flex ai-c gap-4">
                                                <span v-html="getVisibilityIcon(this.form.visibility)" class="flex"></span>
                                                {{ form.visibility }}
                                            </div>
                                            <svg height="12" viewBox="0 0 12.001 18">
                                                <path d="M-3208.707-741.293l-5-5a1,1,0,0,1,0-1.415,1,1,0,0,1,1.415,0l4.293,4.293,4.293-4.293a1,1,0,0,1,1.414,0,1,1,0,0,1,0,1.415l-5,5A1,1,0,0,1-3208-741,1,1,0,0,1-3208.707-741.293Zm-5-11a1,1,0,0,1,0-1.414l5-5a1,1,0,0,1,1.414,0l5,5a1,1,0,0,1,0,1.414A1,1,0,0,1-3203-752a.994.994,0,0,1-.707-.292l-4.293-4.293-4.293,4.293A1,1,0,0,1-3213-752,1,1,0,0,1-3213.708-752.293Z" transform="translate(3214 759)"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="preview-container flex flex-1 pd-t-24 flex-column sticky">
                        <p><strong>Preview</strong></p>
                        <div class="preview-wrapper pd-16 centered bg-surface-2 flex-1 br-12">
                            <span>Preview</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex jc-c sticky bottom-0 blur-to-bottom">
            <div class="section-wrapper flex-1 pd-t-16 pd-b-24">
                <div class="flex jc-fe ai-c">
                    <button-submit
                        @handle-button-click="submit"
                        :classes="'button-primary default fs-09 fw-600'"
                        :content="isEditMode ? 'Save Changes' : 'Create Agent'"
                        :type="'submit'"
                        :disabled="!isEditMode && !inputsHaveData"
                        :processing="processing"
                    />
                </div>
            </div>
        </div>
    </div>

    <teleport to="body">
        <backdrop @click="handleDropdown('visibility_toggle', null)" v-if="dropdownToggle" :opacity="0" :zindex="101" />
        <div v-if="dropdownToggle" class="dropdown fixed" :style="{ top: dropdown.top - 158 + 'px', left: dropdown.left + 'px'}">
            <div class="flex flex-column gap-4">
                <button v-for="(visibility, index) in visibilities" :key="index" @click.prevent="selectVisibility(visibility.name)" class="br-8 w-100 bg-transparent " :class="form.visibility == visibility.name ? 'selected' : ''">
                    <div class="flex gap-4 flex-column">
                        <div class="flex ai-c gap-8">
                            <span v-html="getVisibilityIcon(visibility.name)" class="flex"></span>
                            <strong class="capitalize">{{ visibility.name }}</strong>
                        </div>
                        <span class="text-left">{{visibility.description}}</span>
                    </div>
                </button>
            </div>
        </div>
    </teleport>
</template>
  
<script>
import { mapState } from 'vuex';
import dropdownMixin from '@/mixins/dropdownMixin';
import Backdrop from '@/components/Backdrop.vue';
import ProfileAvatar from '@/components/ProfileAvatar.vue';
const { getRandomColor } = require('@/utilities/ColorTrait');
import uploadMixin from '@/mixins/uploadMixin';
import formMixin from '@/mixins/formMixin';
import api from '@/services/apis';
import EmptyState from '@/components/EmptyState.vue';
import ButtonSubmit from '@/components/ButtonSubmit.vue';
const { visibilityIcon } = require('@/utilities/IconsTrait')

export default {
    name: 'CreateAgent',
    components: { Backdrop, ProfileAvatar, EmptyState, ButtonSubmit },
    mixins: [dropdownMixin, uploadMixin, formMixin],
    computed: {
        ...mapState({
            user: (state) => state.auth.user,
            device: (state) => state.DeviceWindow.device,
            agentArr: (state) => state.userProfile?.agents
        }),
        computedAgent() {
            return this.agentArr?.find(agent => agent.id == this.$route.query?.agent) || null
        },
        isEditMode() {
            return !!(this.$route.query?.mode === 'edit')
        },
        inputsHaveData() {
            const form = this.form
            return !!(form.agentName && form.headline && form.greeting && form.description && form.instructions)
        },
        computedMessage() {
            const message = {
                heading: 'Not Found',
                body: 'The user you\'re tring to access does not exist.',
                buttonText: 'Go back',
                icon: `
                    <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 14.677 13">
                        <path d="M14.943,11.5a.885.885,0,0,1,.007,1.246l-4.11,4.123H21.686a.88.88,0,0,1,0,1.76H10.841l4.116,4.123A.891.891,0,0,1,14.95,24a.877.877,0,0,1-1.239-.007L8.133,18.372h0a.988.988,0,0,1-.183-.278.84.84,0,0,1-.068-.339.882.882,0,0,1,.251-.616l5.579-5.619A.862.862,0,0,1,14.943,11.5Z" transform="translate(-7.882 -11.252)" fill="#fff"/>
                    </svg>
                `
            }
            return message
        },
    },
    data() {
        return {
            uploadInputId: 'agentImageUploadInput',
            uploading: false,
            deleting: false,
            dropdownToggle: false,
            tab: 'editor-mode',
            hasUnsavedChanges: false,
            visibilities: [
                { name: 'public', description: 'Available for others to discover and chat with.' },
                { name: 'private', description: 'Only available to you.' }
            ],
            newUpload: false,
            form: {
                agentName: '',
                headline: '',
                greeting: '',
                description: '',
                instructions: '',
                visibility: 'public',
                color: '',
                image: null
            }
        }
    },
    watch: {
        'form.image'(newImage, oldImage) {
            newImage && oldImage ? this.markUnsaved() : ''
        }
    },
    methods: {
        markUnsaved() {
            this.hasUnsavedChanges = true;
        },
        markSaved() {
            this.hasUnsavedChanges = false
        },
        handleBeforeUnload(event) {
            if (this.hasUnsavedChanges) {
                event.preventDefault();
                event.returnValue = ''; // Some browsers show a generic message with this
            }
        },
        goBack() {
            this.$router.push({ name: 'PublicProfile', params: { username: this.user?.username }})
        },
        switchTab(tabName) {
            this.tab = tabName
        },
        selectVisibility(param) {
            this.form.visibility = param
            this.dropdownToggle = false
        },
        getVisibilityIcon(type) {
            const param = { type: type, height: 15, class: null }
            return visibilityIcon(param)
        },
        submit() {
            this.isEditMode ? this.updateForm() : this.submitForm()
        },
        async submitForm() {
            this.startProcessing()
            try {
                const res = await api.post('/agent', this.form)
                await this.$store.dispatch('showAlert', { type: 'success', autoDismiss: true, message: res.data.message })
                this.markSaved()
                this.goBack()
            } catch (err) {
                this.handleError(err)
            } finally {
                this.stopProcessing()
            }
        },
        async updateForm() {
            this.startProcessing()
            try {
                const res = await api.put('/agent/' + this.computedAgent.id, this.form)
                // await this.$store.commit('updateAgent', res.data.agent)
                await this.$store.dispatch('showAlert', { type: 'success', autoDismiss: true, message: res.data.message })
                this.markSaved()
                this.goBack()

            } catch (err) {
                this.handleError(err)
            } finally {
                this.stopProcessing()
            }
        },
        getMode() {
            if(!this.computedAgent) return
            this.form.color = this.computedAgent.color
            this.form.image = this.computedAgent.image || null
            this.form.agentName = this.computedAgent.agentName
            this.form.headline = this.computedAgent.headline
            this.form.greeting = this.computedAgent.greeting
            this.form.description = this.computedAgent.description
            this.form.instructions = this.computedAgent.instructions
            this.form.visibility = this.computedAgent.visibility
        },
        redirectBack() {
            this.$router.push({ name: 'PublicProfile', params: { username: this.user?.username } })
        },
        handleImageDelete(image) {
            this.computedAgent && !this.newUpload ?
            (
                this.form.image = null,
                this.newUpload = true,
                this.markUnsaved()
            )
            : this.deleteImage(image)
        }
    },
    mounted() {
        document.querySelector('main').scrollTo(0,0)
        window.addEventListener('beforeunload', this.handleBeforeUnload);
        if(this.isEditMode) {
            this.getMode()
        }else {
            this.form.color = getRandomColor()
        }
    },

    unmounted() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    },
    beforeRouteLeave(to, from, next) {
        if (this.hasUnsavedChanges) {
            const answer = window.confirm(
                'You have unsaved changes. Do you really want to leave?'
            );
            if (answer) {
                next();
            } else {
                next(false);
            }
        } else {
            next();
        }
    }
};
</script>

<style lang="scss" scoped>
h2 {
    font-size: 2rem;
}
.section-wrapper {
    max-width: 1000px;
    padding-left: 16px;
    padding-right: 16px;
}

.page-top:has(ul) {
    padding-bottom: 0px;
}
input {
    height: 50px;
}
input, textarea {
    border-radius: 10px;
    padding: 12px 14px;
}
button.visibility-toggle {
    border-radius: 10px;
    padding: 0 10px;
}
.preview-container {
    height: 550px;
    top: calc(var(--header-height) + 30px);
}
.desktop, .tablet {
    .preview-container {
        max-width: 450px;
    }
}
ul {
    border-bottom: .5px solid var(--main-background-3);
}
.editor-mode {
    .preview-container {
        display: none;
    }
}
.preview-mode {
    .editor-container {
        display: none;
    }
}

.dropdown {
    padding: 8px;
    width: 250px;
    z-index: 102;
    background-color: var(--modal-main-background);

    button {
        padding: 8px 16px;
        font-size: .9rem;
        color: var(--main-font-primary);
    }
    button.selected {
        background-color: var(--modal-close-button-hover);
        outline: .6px solid var(--button-press-outline) ;
    }
}
.empty-state {
    height: 90dvh;
}
.page-top-wrapper {
    top: 65px
}

</style>
  