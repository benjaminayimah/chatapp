<template>
    <h4>Public profile</h4>
    <div class="flex flex-column gap-14">
        <div class="form-row pd-b-16">
            <profile-avatar
                :image="form.image"
                :width="100"
                :height="100"
                :color="form.color"
                :name="form.username"
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
            <div id="username_input_wrapper" class="input-wrapper relative">
                <label for="username_input" class="input-label">Username</label>
                <input 
                    v-model="form.username"
                    @focusin="isFocusIn('username_input_wrapper')"
                    @focusout="isFocusOut('username_input_wrapper', 'username_input')"
                    :aria-invalid="usernameHasErrors"
                    :aria-describedby="usernameDescribedBy"
                    class="w-100 form-control custom-input"
                    type="text"
                    id="username_input"
                    name="username"
                    maxlength="20"
                    autocomplete="off"
                >
            </div>
            <div class="flex jc-fe"><span class="fs-08 sub-label">0/20</span></div>
            <div v-if="usernameErrors.length" class="validation-errors">
                <li :id="`username_error_${index + 1}`" role="alert" v-for="(error, index) in usernameErrors" :key="index" class="fs-09">
                    {{ error.msg }}
                </li>
            </div>
        </div>

        <div class="form-row flex flex-column gap-4">
            <div id="name_input_wrapper" class="input-wrapper relative">
                <label for="name_input" class="input-label">Display name</label>
                <input 
                    v-model="form.name"
                    @focusin="isFocusIn('name_input_wrapper')"
                    @focusout="isFocusOut('name_input_wrapper', 'name_input')"
                    :aria-invalid="nameHasErrors"
                    :aria-describedby="nameDescribedBy"
                    class="w-100 form-control custom-input"
                    type="text"
                    id="name_input"
                    name="name"
                    maxlength="50"
                    autocomplete="off"
                >
            </div>
            <div class="flex jc-fe"><span class="fs-08 sub-label">0/50</span></div>
            <div v-if="nameErrors.length" class="validation-errors">
                <li :id="`name_error_${index + 1}`" role="alert" v-for="(error, index) in nameErrors" :key="index" class="fs-09">
                    {{ error.msg }}
                </li>
            </div>
        </div>
    </div>
</template>

<script>
import errorHandlerMixin from '@/mixins/errorHandlerMixin';
import inputMixin from '@/mixins/inputMixin';
import uploadMixin from '@/mixins/uploadMixin';
import ProfileAvatar from '@/components/ProfileAvatar.vue';

export default {
  components: { ProfileAvatar },
    name: 'SettingsProfile',
    mixins: [inputMixin, errorHandlerMixin, uploadMixin],
    props: {
        user: Object
    },
    computed: {
        usernameHasErrors() {
            return !!this.usernameErrors.length
        },
        usernameErrors() {
            return this.errors?.filter(err => err.path === 'username')
        },
        usernameDescribedBy() {
            return this.usernameErrors.map((_, index) => `username_error_${index + 1}`).join(" ");
        },

        nameHasErrors() {
            return !!this.nameErrors.length
        },
        nameErrors() {
            return this.errors?.filter(err => err.path === 'name')
        },
        nameDescribedBy() {
            return this.nameErrors.map((_, index) => `name_error_${index + 1}`).join(" ");
        },
    },
    data() {
        return {
            uploading: false,
            deleting: false,
            form: {
                username: '',
                name: '',
                image: null,
                oldImage: null,
                color: ''
            }
        }
    },
    methods: {
        prefillForm() {
            if(!this.user) return
            this.form.username = this.user.username
            this.isFocusIn('username_input_wrapper')
            this.form.color = this.user.color
            this.form.image = this.user.picture ?? null
            this.form.oldImage = this.user.picture ?? null
        }
    },
    mounted() {
        this.prefillForm()
    }
}
</script>

<style lang="scss" scoped>

</style>