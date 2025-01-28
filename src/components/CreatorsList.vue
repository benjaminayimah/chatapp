<template>
    <router-link :to="{ name: 'PublicProfile', params: { username: creator.username } }" class="flex flex-column flex-shrink-0 ai-c gap-12 br-20 bg-transition">
        <profile-avatar
            :image="creator.image"
            :width="100"
            :height="100"
            :color="creator.color"
            :name="creator.displayName"
            :fontSize="1.5"
            :radius="50"
            :upload="false"
        />
        <div class="flex flex-column gap-8 w-100 ai-c">
            <div class="w-100">
                <div class="fs-101 text-ellipsis flex jc-c gap-4 ai-c">
                    <span>{{ creator.displayName }}</span>
                    <span v-if="creator.hasUpgraded" v-html="verifiedIcon(15)"></span>
                </div>
                <div class="h-2 fs-08 text-ellipsis text-center"><strong>@{{ creator.username }}</strong></div>
            </div>
            <button-submit
                :classes="'button-primary default fs-09 fw-600 w-100'"
                :label="label"
                :type="'button'"
                :prevent="true"
                :processing="processing"
                @handle-button-click="handleFollow"
            />
        </div>
    </router-link>
</template>

<script>
import ButtonSubmit from './ButtonSubmit.vue'
import ProfileAvatar from './ProfileAvatar.vue'
import userMixin from '@/mixins/userMixin';
import formMixin from '@/mixins/formMixin';
export default {
    components: { ProfileAvatar, ButtonSubmit },
    mixins: [userMixin, formMixin],
    props: {
        creator: Object,
        default: null
    },
    data() {
        return {
            label: 'Follow'
        }
    },
    methods: {
        handleFollow() {
            this.startProcessing()
            setTimeout(() => {
                this.stopProcessing()
                this.label = this.label === 'Follow' ? 'Following' : 'Follow';
            }, 1000);
        }
    }
}
</script>

<style lang="scss" scoped>
a {
    padding: 16px;
    width: 220px;
}
</style>