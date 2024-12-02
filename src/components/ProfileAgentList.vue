<template>
    <router-link :to="{ name: 'AgentChat', params: { id: agent.chatId }}" @click.prevent="" class="flex gap-16 br-20 bg-transition" :class="{'toggle-in' : dropdownToggle}">
        <profile-avatar
            :image="agent.image"
            :width="width"
            :height="height"
            :color="agent.color"
            :name="agent.agentName"
            :fontSize="1.3"
            :radius="radius"
            :upload="false"
        />
        <div class="flex flex-1 jc-sb">
            <div class="flex flex-column gap-4 jc-sb pd-t-4 pd-b-4">
                <div class="flex flex-column gap-4">
                    <div class="flex flex-column">
                        <span class="fs-101 wrap-text wrap-line-1">{{ agent.agentName }}</span>
                        <span v-if="creator" class="h-2 fs-08 wrap-text wrap-line-1"><strong>By {{ creator }}</strong></span>
                    </div>
                    <span class="h-2 wrap-text wrap-line-1">{{ agent.headline }}</span>
                </div>
                <div class="flex gap-8 ai-c">
                    <span class="h-2 fs-08 flex ai-c gap-4">
                        <svg height="12" width="14" viewBox="0 0 12.464 11">
                            <path class="invert-fill-color" d="M10.768,4A3.519,3.519,0,0,1,13.256,10L8.411,14.85a.5.5,0,0,1-.712,0L2.854,10A3.519,3.519,0,1,1,7.83,5.028l.225.225.225-.225A3.5,3.5,0,0,1,10.768,4ZM8.055,13.782l4.49-4.49A2.512,2.512,0,1,0,8.992,5.74l-.581.581a.5.5,0,0,1-.712,0L7.118,5.74A2.512,2.512,0,1,0,3.565,9.293Z" transform="translate(-1.823 -3.997)"/>
                        </svg>
                        120
                    </span>
                    <span class="fs-08 dot">&#8231;</span> 
                    <span class="h-2 fs-08 flex ai-c gap-4">
                        <svg height="12" width="14" viewBox="0 0 11.846 11.425">
                            <path class="invert-fill-color" d="M3.308,2.923h7.231a1.385,1.385,0,0,1,1.385,1.385V8.923a1.385,1.385,0,0,1-1.385,1.385H6.923a.461.461,0,0,0-.326.135L4.615,11.85v-1.08a.462.462,0,0,0-.462-.462H3.308A1.385,1.385,0,0,1,1.923,8.923V4.308A1.385,1.385,0,0,1,3.308,2.923ZM10.538,2H3.308A2.308,2.308,0,0,0,1,4.308V8.923a2.308,2.308,0,0,0,2.308,2.308h.385v1.733a.462.462,0,0,0,.788.326l2.634-2.059h3.424a2.308,2.308,0,0,0,2.308-2.308V4.308A2.308,2.308,0,0,0,10.538,2Z" transform="translate(-1 -2)" fill-rule="evenodd"/>
                        </svg>
                        310
                    </span>
                    <span class="fs-08 dot">&#8231;</span>
                    <span v-html="getVisibilityIcon(agent.visibility)" class="flex visibility"></span>
                </div>
            </div>
            <div v-if="actionMenu">
                <button :id="`agent_${this.agent.id}`" @click.prevent="handleDropdown(`agent_${this.agent.id}`)" class="transparent-button jc-c ai-c" style="height: 30px;width: 30px">
                    <svg class="list-menu" height="3" viewBox="0 0 10 2">
                        <path class="invert-fill-color" d="M-1990,9a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-1990,9Zm0-4a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-1990,5Zm0-4a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1,1,1,0,0,1-1-1Z" transform="translate(0 -1988) rotate(-90)"/>
                    </svg>
                </button>
            </div>
        </div>
    </router-link>
    <teleport to="body">
        <backdrop @click="handleDropdown(`agent_${this.agent.id}`)" v-if="dropdownToggle" :opacity="0" :zindex="101" />
        <dropdown-div
            v-if="dropdownToggle" 
            @delete-chat="deleteAgent" 
            @trigger-edit-mode="triggerEdit" 
            @add-to-favourite="addToFavourite"
            @share="share"
            :dropdown="dropdown"
            :edit="'Edit'"
            :like="true"
            :isOwner="isOwner"
            :isFavourite="isFavourite"
        />
    </teleport>
</template>

<script>
import DropdownDiv from '@/modals/DropdownDiv.vue'
import ProfileAvatar from './ProfileAvatar.vue'
import Backdrop from './Backdrop.vue'
import dropdownMixin from '@/mixins/dropdownMixin';
import errorHandlerMixin from '@/mixins/errorHandlerMixin';
import api from '@/services/apis';
import { mapGetters, mapState } from 'vuex';
const { visibilityIcon } = require('@/utilities/IconsTrait')

export default {
    name: 'ProfileAgentList',
    components: { ProfileAvatar, DropdownDiv, Backdrop },
    mixins: [dropdownMixin, errorHandlerMixin],
    props: {
        agent: Object,
        isOwner: Boolean,
        height: Number,
        width: Number,
        radius: Number,
        creator: {
            default: null,
            type: String
        },
        actionMenu: {
            default: true,
            type: Boolean
        }
    },
    computed: {
        ...mapGetters(['auth']),
        ...mapState({
            favourites: (state) => state.favourites
        }),
        isFavourite() {
            return !!this.favourites?.find(agent => agent.agent.id === this.agent.id)
        }
    },
    data() {
        return {
            dropdownToggle: false,
        }
    },
    methods: {
        getVisibilityIcon(type) {
            const param = { type: type, height: 12, class: 'invert-fill-color' }
            return visibilityIcon(param)
        },
        triggerEdit() {
            this.$router.push({ name: 'CreateAgent', query: { mode: 'edit', agent: this.agent.id } })
        },
        share() {
            console.log('share')
        },
        async addToFavourite() {
            if(!this.auth) {
                this.$router.push({ query: { m: 'signin' }}) 
                this.dropdownToggle = false
                return
            } 
            try {
                if(this.isFavourite) {
                    const res = await api.delete('/favourite/' + this.agent.id)
                    await this.$store.commit('removeFavourite', this.agent.id)
                    this.$store.dispatch('showAlert', { type: 'success', autoDismiss: true, message: res.data.message })

                }else {
                    const res = await api.post('/favourite/' + this.agent.id)
                    await this.$store.commit('addFavourite', res.data.agent)
                    this.$store.dispatch('showAlert', { type: 'success', autoDismiss: true, message: res.data.message })
                }
            } catch (err) {
                this.handleError(err)
            } finally {
                this.dropdownToggle = false
            }
        },
        deleteAgent() {
            const body = `
                <div>You are about to delete the <strong>${this.agent.agentName}</strong> agent.</div>
                <div>
                    <span class="fs-095">This will also delete all shared links and chats associated with this Agent.</span>
                </div>
            `
            this.$store.commit('setDeleteModal', { id: this.agent.id, title: 'Delete this Agent?', type: 'agent', body: body })
            this.handleDropdown(`agent_${this.agent.id}`)
        },
    }
}
</script>

<style lang="scss" scoped>
a {
    padding: 12px;
}
a.toggle-in {
    background-color: var(--main-background-2);
    button {
        background-color: var(--main-background-3);
    }
}
.invert-fill-color {
    fill: var(--main-font-color-2);
}
</style>