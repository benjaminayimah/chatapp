<template>
    <div class="flex flex-1 jc-c chat-container">
        <div class="main-wrapper flex-1">
            <div class="flex jc-sb pd-t-4 pb-b-4 sticky top-0">
                <button @click="goBack" class="gap-4 default button-outline ai-c fs-09">
                    <svg xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 14.677 13">
                        <path d="M14.943,11.5a.885.885,0,0,1,.007,1.246l-4.11,4.123H21.686a.88.88,0,0,1,0,1.76H10.841l4.116,4.123A.891.891,0,0,1,14.95,24a.877.877,0,0,1-1.239-.007L8.133,18.372h0a.988.988,0,0,1-.183-.278.84.84,0,0,1-.068-.339.882.882,0,0,1,.251-.616l5.579-5.619A.862.862,0,0,1,14.943,11.5Z" transform="translate(-7.882 -11.252)" fill="#fff"/>
                    </svg>
                    Back
                </button>
                <button class="button-outline back-btn ai-c jc-c">
                    <svg height="3" viewBox="0 0 10 2">
                        <path d="M-1990,9a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-1990,9Zm0-4a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-1990,5Zm0-4a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1,1,1,0,0,1-1-1Z" transform="translate(0 -1988) rotate(-90)"/>
                    </svg>
                </button>
            </div>
            <div class="flex jc-c">
                <agent-page-skeleton v-if="!(agent && user) && fetching" />
                <div v-else-if="agent && user " class="flex ai-c flex-column gap-4 text-center">
                    <profile-avatar
                        :image="agent.image"
                        :width="80"
                        :height="80"
                        :color="agent.color"
                        :name="agent.agentName"
                        :fontSize="1.5"
                        :radius="50"
                        :upload="false"
                    />
                    <div class="fs-102">{{ agent.agentName }}</div>
                    <router-link :to="{ name: 'PublicProfile', params: { username: user } }" class="h-2 a-link fs-09">By @{{ user }}</router-link>
                    <div class="h-2">{{ agent.headline }}</div>
                </div>
                <div v-else class="centered gap-24">
                    <agent-page-skeleton />
                    <empty-state
                        :message="computedMessage"
                        :button="false"
                    />
                    <router-link :to="{ name: 'Home' }" class="a-button button-primary default ai-c jc-c fw-600  fs-09">Back home</router-link>
                </div>
            </div>
            <div class="chat-body">
               
            </div>
        </div>
    </div>
    <div class="flex jc-c">
        <div class="main-wrapper flex-1 relative">
            <div id="chat_info_container" class="centered absolute gap-8">
                <scroll-bottom-buttton v-if="showScrollButton" @do-scroll="doScroll('smooth')" />
                <chat-alert-box v-if="showChatAlert" />
            </div>
            <div class="bg-surface-1">
                <chat-input @submit-prompt="submitPrompt" />
                <div class="footnote">
                    <div>
                        artemis ai may display inaccurate info, including about people, so double-check its responses.
                    </div>
                </div>
            </div>
        </div>
    </div>
    <teleport to='body'>
        <transition name="modal-fade">
            <image-preview-modal
                v-if="imagePreview"
                @close-preview="closePreview"
                :image="imagePreview"
                />
        </transition>
    </teleport>
</template>

<script>
import ImagePreviewModal from '@/modals/ImagePreviewModal.vue'
import ChatInput from '@/components/ChatInput.vue'
import ChatAlertBox from '@/components/ChatAlertBox.vue'
import ScrollBottomButtton from '@/components/ScrollBottomButtton.vue'
import ProfileAvatar from '@/components/ProfileAvatar.vue'
import errorHandlerMixin from '@/mixins/errorHandlerMixin';
import api from '@/services/apis'
import AgentPageSkeleton from '@/loaders/AgentPageSkeleton.vue'
import EmptyState from '@/components/EmptyState.vue'
export default {
    components: { ImagePreviewModal, ChatInput, ChatAlertBox, ScrollBottomButtton, ProfileAvatar, AgentPageSkeleton, EmptyState },
    name: 'AgentChat',
    mixins: [errorHandlerMixin],
    computed: {
        computedMessage() {
            const message = {
                heading: this.responseStatusText,
                body: 'An error occurred while fetching this page',
            }
            return message
        }
    },
    data() {
        return {
            imagePreview: null,
            showScrollButton: false,
            showChatAlert: false,
            agent: null,
            user: null
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        submitPrompt(e) {
            console.log(e.prompt)
        },
        async fetchThisAgent(agent) {
            try {
                const res = await api.get('/agent/'+ agent)
                this.user = res.data.username
                this.agent = res.data.agent
            } catch (err) {
                this.handleError(err)
            } finally {
                this.stopFetching()
            }
        }
    },
    mounted() {
        this.fetchThisAgent(this.$route.params.id)
    }
}
</script>

<style lang="scss" scoped>
.main-wrapper {
    max-width: 732px;
    padding: 0 16px;
}
.chat-body {
    padding: 40px 0;
}
button.back-btn {
    width: 40px;
    height: 40px;
}

.chat-container {
    min-height: calc(100% - (var(--nav-height) + 96px));
}

</style>