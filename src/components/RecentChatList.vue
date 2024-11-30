<template>
    <li class="flex" >
        <router-link  :to="!editMode ? { name: 'ChatView', params: { id: recent.id }} : ''" data-type="menu" class="flex ai-c bg-transition" :class="{'is-toggled' : dropdownToggle}">
            <div v-if="!editMode" class="gap-10 flex ai-c">
                <svg height="14" viewBox="0 0 11.846 11.425">
                    <path d="M3.308,2.923h7.231a1.385,1.385,0,0,1,1.385,1.385V8.923a1.385,1.385,0,0,1-1.385,1.385H6.923a.461.461,0,0,0-.326.135L4.615,11.85v-1.08a.462.462,0,0,0-.462-.462H3.308A1.385,1.385,0,0,1,1.923,8.923V4.308A1.385,1.385,0,0,1,3.308,2.923ZM10.538,2H3.308A2.308,2.308,0,0,0,1,4.308V8.923a2.308,2.308,0,0,0,2.308,2.308h.385v1.733a.462.462,0,0,0,.788.326l2.634-2.059h3.424a2.308,2.308,0,0,0,2.308-2.308V4.308A2.308,2.308,0,0,0,10.538,2Z" transform="translate(-1 -2)" fill-rule="evenodd"/>
                </svg>
                <span class="wrap-text wrap-line-1 fs-09 block">{{ recent.title }}</span>
            </div>
            <input
                @keydown.enter="handleKeyDownEnter"
                @focusout="handleFocusOut"
                ref="input" v-model="input"
                v-if="editMode"
                type="text"
                name="renameChat"
                class="bg-transparent edit-recent"
                autocomplete="off"
                data-type="custom-focus"
            >
            <i v-if="!editMode" @click.prevent="handleDropdown(`recent_${this.recent.id}`)" :id="`recent_${recent.id}`" class="flex jc-c ai-c a-button">
                <svg height="14" viewBox="0 0 2 10">
                    <path d="M-1990,9a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-1990,9Zm0-4a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-1990,5Zm0-4a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-1990,1Z" transform="translate(1990)"/>
                </svg>
            </i>
        </router-link>
    </li>
    <teleport to="body">
        <backdrop @click="handleDropdown(`recent_${this.recent.id}`)" v-if="dropdownToggle" :opacity="0" :zindex="101" />
        <dropdown-div
            v-if="dropdownToggle"
            @delete-chat="deleteChat"
            @trigger-edit-mode="triggerEditMode"
            @share="share"
            :dropdown="dropdown"
            :edit="'Rename'"
            :isOwner="true"
        />
    </teleport>
</template>

<script>
import DropdownDiv from '@/modals/DropdownDiv.vue';
import Backdrop from './Backdrop.vue';
import dropdownMixin from '@/mixins/dropdownMixin';
export default {
    components: { DropdownDiv, Backdrop },
    name: 'RecentChatList',
    mixins: [dropdownMixin],
    props: {
        recent: Object,
        device: String
    },
    data() {
        return {
            input: '',
            dropdownToggle: false,
            editMode: false,
            enterPressed: false
        }
    },
    methods: {
        deleteChat() {
            const body = `
                <div>You are about to delete <strong>${this.recent.title}</strong> from your chat history.</div>
                <div>
                    <span class="fs-095">This will also delete related activities like prompts, responses, and feedback from your app.</span>
                </div>
            `
            this.$store.commit('setDeleteModal', { id: this.recent.id, title: 'Delete chat?', type: 'recent-chat', body: body })
            this.handleDropdown(`recent_${this.recent.id}`)
        },
        closeDropdown() {
            this.dropdownToggle = false
        },
        triggerEditMode() {
            this.editMode = true
            this.input = this.recent.title
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
            this.closeDropdown()
        },
        closeEditMode() {
            this.editMode = false
            this.input = ''
        },
        renameChat() {
            if (this.recent.title != this.input) {
                const payload = { id: this.recent.id, title: this.input}
                this.$store.commit('renameChat', payload)
            }
            this.closeEditMode()
        },
        share() {
            console.log('share')
        },
        handleKeyDownEnter() {
            this.enterPressed = true;
            this.renameChat();
        },
        handleFocusOut() {
            if (!this.enterPressed) {
                this.renameChat();
            }
            this.enterPressed = false
        }
    }
}
</script>

<style lang="scss" scoped>
.is-toggled:not(.router-link-exact-active) {
    background-color: var(--main-background-3);
}
.is-toggled {
    i {
        background-color: var(--main-background-4);
        opacity: 1 !important;
    }
}
.is-toggled.router-link-exact-active {
    i {
        background-color: var(--sidebar-active-button);
    }
}
input.edit-recent.edit-recent {
    border: 2px solid var(--primary-color);
    width: 100%;
    border-radius: 4px;
}
a:has(input) {
    background-color: var(--main-background-3) !important;
}

</style>