<template>
    <h4 class="settings-tab-title">Public profile</h4>
    <div class="flex flex-column gap-16">
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
        <input-reactive
            v-model="form.username"
            :id="'username'"
            :type="'text'"
            :label="'Username'"
            :errors="errors"
            :maxLength="20"
            :placeholder="'e.g. johnsmith123'"
        />
        <input-reactive
            v-model="form.name"
            :id="'name'"
            :type="'text'"
            :label="'Display name'"
            :errors="errors"
            :maxLength="50"
            :placeholder="'e.g. John Smith'"
        />
        <input-reactive
            v-model="form.description"
            :id="'bio'"
            :type="'text'"
            :label="'Bio'"
            :errors="errors"
            :maxLength="400"
            :isTextarea="true"
            :rows="3"
            :placeholder="'e.g. I\'m a UX Designer and Front-end developer.'"
        />
    </div>
</template>

<script>
import errorHandlerMixin from '@/mixins/errorHandlerMixin';
import uploadMixin from '@/mixins/uploadMixin';
import ProfileAvatar from '@/components/ProfileAvatar.vue';
import InputReactive from '@/components/InputReactive.vue';

export default {
    components: { ProfileAvatar, InputReactive },
    name: 'SettingsProfile',
    mixins: [errorHandlerMixin, uploadMixin],
    props: {
        user: Object
    },
    data() {
        return {
            uploading: false,
            deleting: false,
            form: {
                username: '',
                name: '',
                bio: '',
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
            this.form.name = this.user.name
            this.form.bio = this.user.bio
            this.form.color = this.user.color
            this.form.image = this.user.picture || null
            this.form.oldImage = this.user.picture || null
        }
    },
    mounted() {
        this.prefillForm()
    }
}
</script>

<style lang="scss" scoped>

</style>