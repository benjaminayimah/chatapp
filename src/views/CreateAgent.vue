<template>
    <div class="overflow-y-scroll">
        <div class="flex jc-c sticky top-0 bg-surface-1" style="z-index: 2">
            <div class="section-wrapper page-top flex-1 pd-b-16 pd-t-4">
                <button @click="goBack" class="gap-4 default button-outline back-btn ai-c fs-09">
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
                        <form action="" class="pd-b-32">
                            <div class="form-wrapper flex flex-column gap-8">
                                <div class="form-row">
                                    <profile-avatar
                                        :picture="form.image"
                                        :color="form.color"
                                        :name="form.agentName"
                                        :dimension="100"
                                        :fontSize="2"
                                        :upload="true"
                                        :deleting="deleting"
                                        :uploading="uploading"
                                        @upload-click="uploadClick"
                                        @delete-image="deleteImage"
                                    />
                                <input class="hide" @change="uploadImage" name="image" id="imageUploadInput" type="file" ref="img">
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
                                        <input id="headline" name="headline" class="form-control" type="text" @input="markUnsaved" maxlength="20" placeholder="E.g. A short headline about what your Agent does" autocomplete="off">
                                        <div class="flex jc-fe"><span class="fs-08 sub-label">0/20</span></div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="input-wrapper flex flex-column gap-4">
                                        <label for="greeting"><strong>Greeting</strong></label>
                                        <textarea name="greeting" id="greeting" class="form-control textarea-no-resize" @input="markUnsaved" rows="5" maxlength="500" placeholder="E.g. Hello, I am your Cocoa farm AI Agent. Ask me anything about your cocoa farm."></textarea>
                                        <div class="flex jc-fe"><span class="fs-08 sub-label">0/500</span></div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="input-wrapper flex flex-column gap-4">
                                        <label for="description"><strong>Description</strong></label>
                                        <textarea name="description" id="description" class="form-control textarea-no-resize" @input="markUnsaved" rows="5" maxlength="500" placeholder="How would your Agent describe themselves?"></textarea>
                                        <div class="flex jc-fe"><span class="fs-08 sub-label">0/500</span></div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="input-wrapper flex flex-column gap-4">
                                        <label for="instructions"><strong>Instructions</strong></label>
                                        <textarea name="instructions" id="instructions" class="form-control textarea-no-resize" @input="markUnsaved" rows="5" maxlength="500" placeholder="E.g. You're an expert cocoa farm assistant located in Accra, Ghana. You provide"></textarea>
                                        <div class="flex jc-fe"><span class="fs-08 sub-label">0/500</span></div>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="input-wrapper">
                                        <p><strong>Visibility</strong></p>
                                        <button id="visibility_toggle" @click.prevent="handleDropdown('visibility_toggle', null)" class="gap-10 capitalize default ai-c button-outline visibility-toggle fs-095">
                                            <div class="flex ai-c gap-4">
                                                <span v-html="computedIcon(this.form.visibility)" class="flex"></span>
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
                    <div class="preview-container flex flex-1 pd-t-24 flex-column sticky top-24">
                        <p><strong>Preview</strong></p>
                        <div class="preview-wrapper pd-16 centered bg-surface-2 flex-1 br-12">
                            <span>Preview</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex jc-c sticky bottom-0 blur-to-bottom bg-transition">
            <div class="section-wrapper flex-1 pd-t-16 pd-b-24">
                <div class="flex jc-fe ai-c">
                    <button class="button-primary default ai-c fw-600 fs-09">Create Agent</button>
                </div>
            </div>
        </div>
    </div>


    <teleport to="body">
        <backdrop @click="handleDropdown('visibility_toggle', null)" v-if="dropdownToggle" :opacity="0" :zindex="101" />
        <div v-if="dropdownToggle" class="dropdown fixed" :style="{ top: dropdown.top - 164 + 'px', left: dropdown.left + 'px'}">
            <div class="flex flex-column gap-4">
                <button v-for="(visibility, index) in visibilities" :key="index" @click.prevent="selectVisibility(visibility.name)" class="br-8 w-100 bg-transparent " :class="form.visibility == visibility.name ? 'selected' : ''">
                    <div class="flex gap-4 flex-column">
                        <div class="flex ai-c gap-8">
                            <span v-html="computedIcon(visibility.name)" class="flex"></span>
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

export default {
    name: 'CreateAgent',
    components: { Backdrop, ProfileAvatar },
    mixins: [dropdownMixin, uploadMixin],
    computed: {
        ...mapState({
            user: (state) => state.user,
            device: (state) => state.DeviceWindow.device
        })
    },
    data() {
        return {
            uploading: false,
            deleting: false,
            dropdownToggle: false,
            tab: 'editor-mode',
            hasUnsavedChanges: false,
            visibilities: [
                { name: 'public', description: 'Available for others to discover and chat with.' },
                { name: 'private', description: 'Only available to you.' }
            ],
            form: {
                agentName: '',
                visibility: 'public',
                color: getRandomColor(),
                image: null
            }
        }
    },
    watch: {
        'form.image'() {
            this.markUnsaved();
        }
    },
    methods: {
        markUnsaved() {
            this.hasUnsavedChanges = true;
        },
        handleBeforeUnload(event) {
            if (this.hasUnsavedChanges) {
                event.preventDefault();
                event.returnValue = ''; // Some browsers show a generic message with this
            }
        },
        goBack() {
            this.$router.push({ name: 'PublicProfile', params: { username: this.user.username }})
        },
        switchTab(tabName) {
            this.tab = tabName
        },
        selectVisibility(param) {
            this.form.visibility = param
            this.dropdownToggle = false
        },
        computedIcon(param) {
            switch (param) {
                case 'public':
                    return `
                        <svg height="15" width="15" viewBox="0 0 32.999 33">
                            <path d="M-3165.29-587a16.393,16.393,0,0,1-6.423-1.3,16.433,16.433,0,0,1-5.243-3.535,16.441,16.441,0,0,1-3.536-5.244,16.4,16.4,0,0,1-1.3-6.423,16.4,16.4,0,0,1,1.3-6.422,16.431,16.431,0,0,1,3.536-5.244,16.433,16.433,0,0,1,5.243-3.535,16.393,16.393,0,0,1,6.423-1.3,16.391,16.391,0,0,1,6.423,1.3,16.437,16.437,0,0,1,5.244,3.535,16.428,16.428,0,0,1,3.535,5.244,16.4,16.4,0,0,1,1.3,6.422,16.4,16.4,0,0,1-1.3,6.423,16.438,16.438,0,0,1-3.535,5.244,16.437,16.437,0,0,1-5.244,3.535,16.391,16.391,0,0,1-6.423,1.3Zm3.41-3.432a13.418,13.418,0,0,0,6.136-3.522,13.4,13.4,0,0,0,3.872-8.046h-5.993A24.444,24.444,0,0,1-3161.88-590.432Zm-12.956-3.522a13.418,13.418,0,0,0,6.136,3.522A24.437,24.437,0,0,1-3172.715-602h-5.993A13.4,13.4,0,0,0-3174.836-593.954Zm9.545,3.128A21.443,21.443,0,0,0-3160.876-602h-8.827A21.45,21.45,0,0,0-3165.29-590.826ZM-3151.872-605a13.4,13.4,0,0,0-3.872-8.046,13.421,13.421,0,0,0-6.137-3.523A24.445,24.445,0,0,1-3157.865-605Zm-9,0a21.445,21.445,0,0,0-4.414-11.174A21.455,21.455,0,0,0-3169.7-605Zm-11.839,0a24.44,24.44,0,0,1,4.016-11.569,13.421,13.421,0,0,0-6.136,3.523,13.393,13.393,0,0,0-3.873,8.046Z" transform="translate(3181.79 620)"/>
                        </svg>
                    `;
                case 'private':
                    return `
                        <svg height="15" width="15" viewBox="0 0 18.013 19.977">
                            <path d="M-1985.5,19.977a4.274,4.274,0,0,1-4.5-4v-5a4.12,4.12,0,0,1,3.377-3.874V4.78a5.239,5.239,0,0,1,.772-2.353A5.37,5.37,0,0,1-1980.927,0a6.261,6.261,0,0,1,3.162.758,4.606,4.606,0,0,1,1.7,1.692,5.114,5.114,0,0,1,.689,2.363V7.1a4.122,4.122,0,0,1,3.387,3.876v5a4.274,4.274,0,0,1-4.5,4Zm-2.251-9v5a2.139,2.139,0,0,0,2.251,2h9.007a2.139,2.139,0,0,0,2.251-2v-5a2.139,2.139,0,0,0-2.251-2h-9.007A2.139,2.139,0,0,0-1987.748,10.977Zm10.123-4V4.828a3.4,3.4,0,0,0-.467-1.51A3.028,3.028,0,0,0-1980.927,2a3.169,3.169,0,0,0-2.951,1.392,3.552,3.552,0,0,0-.493,1.454V6.978Zm-4.494,8.059V11.963a1.069,1.069,0,0,1,1.126-1,1.069,1.069,0,0,1,1.126,1v3.074a1.069,1.069,0,0,1-1.126,1A1.069,1.069,0,0,1-1982.119,15.036Z" transform="translate(1990)"/>
                        </svg>
                    `
            }
        }
    },
    mounted() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
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
    },
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
        // &:hover {
        //     background-color: var(--modal-close-button-hover);
        // }
    }
    button.selected {
        background-color: var(--modal-close-button-hover);
        outline: .6px solid var(--button-press-outline) ;
    }
}

</style>
  