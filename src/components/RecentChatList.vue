<template>
    <!-- @mouseup="device === 'mobile' ? $store.commit('closeSideBar') : ''" -->
    <li class="flex" >
        <router-link  :to="!editMode ? { name: 'ChatView', params: { id: recent.id }} : ''" data-type="menu" class="flex ai-c bg-transition" :class="{'is-toggled' : dropdownToggle}">
            <div v-if="!editMode" class="gap-10 flex ai-c">
                <svg width="20" height="14" viewBox="0 0 30 30">
                    <path d="M6,3H30a3.009,3.009,0,0,1,3,3V33l-6-6H6a3.009,3.009,0,0,1-3-3V6A3.009,3.009,0,0,1,6,3ZM6,24H27l3,3V6H6Z" transform="translate(-3 -3)"/>
                </svg>
                <span class="wrap-text wrap-line-1 fs-09">{{ recent.title }}</span>
            </div>
            <input @keydown.enter="handleKeyDownEnter" @focusout="handleFocusOut"  ref="input" v-model="input" v-if="editMode" type="text" name="renameChat" class="bg-transparent" autocomplete="off">
            <i v-if="!editMode" @click.prevent="handleDropdown(`recent_${this.recent.id}`)" :id="`recent_${recent.id}`" class="flex jc-c ai-c a-button">
                <svg height="14" viewBox="0 0 2 10">
                    <path id="Path_2601" data-name="Path 2601" d="M-1990,9a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-1990,9Zm0-4a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-1990,5Zm0-4a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-1990,1Z" transform="translate(1990)"/>
                </svg>
            </i>
        </router-link>
    </li>
    <teleport to="body">
        <backdrop @click="handleDropdown(`recent_${this.recent.id}`)" v-if="dropdownToggle" :opacity="0" :zindex="101" />
        <dropdown-div v-if="dropdownToggle" :dropdown="dropdown" @delete-chat="deleteChat" @trigger-edit-mode="triggerEditMode" />
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
        // handleDropdown(id) {
        //     if (!this.dropdownToggle) {
        //         this.dropdownToggle = true
        //         this.$store.commit('setDropdown', id)
        //     } else {
        //         this.dropdownToggle = false
        //         this.$store.commit('reSetDropdown')
        //     }
        // },
        async deleteChat() {
            const routeId = this.$route.params.id
            const thisId = this.recent.id
            this.handleDropdown(`recent_${this.recent.id}`)
            await this.$store.commit('deleteChat', thisId)
            if (routeId == thisId) {
                this.$router.push({ name: 'NewChat' })
            }
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
input {
    border: 2px solid var(--primary-color);
    width: 100%;
    border-radius: 4px;
}
a:has(input) {
    background-color: var(--main-background-3) !important;
}

</style>