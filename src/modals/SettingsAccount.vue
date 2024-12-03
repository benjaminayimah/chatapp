<template>
    <h4 class="settings-tab-title">Account</h4>
    <div class="flex jc-sb ai-c">
        <div>Delete all chats</div>
        <div class="flex flex-wrap gap-4">
            <button @click="deleteAllChats" class="button-danger default ai-c">
               Delete all
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SettingsAccount',
    props: {
        user: Object
    },
    methods: {
        async deleteAllChats() {
            const body = `
                <div>You are about to delete <strong>all chats</strong> from your history.</div>
                <div>
                    <span class="fs-095">This will also delete all activities like prompts, responses, and feedback from your app.</span>
                </div>
            `
            this.$store.commit('setDeleteModal', { id: null, title: 'Delete all chat history?', type: 'all-chats', body: body })
        },
    }
}
</script>

<style lang="scss" scoped>

</style>