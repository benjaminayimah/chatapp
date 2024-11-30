<template>
    <div v-if="favourites.length" class="flex-1">
        <div class="flex flex-column">
            <profile-agent-list
                v-for="agent in favourites"
                :key="agent.agent.id"
                :agent="agent.agent"
                :isOwner="false"
            />
        </div>
    </div>
    <empty-state v-else
        :message="computedMessage"
        :button="false"
    />
</template>

<script>
import EmptyState from '@/components/EmptyState.vue'
import ProfileAgentList from '@/components/ProfileAgentList.vue'
export default {
    name: 'ProfileSavedTab',
    components: { EmptyState, ProfileAgentList },
    props: {
        favourites: Array
    },
    computed: {
        computedMessage() {
            const message = {
                heading: 'No Favourites Yet',
                body: 'Your saved AI Agents will appear here.',
            }
            return message
        }
    }
}
</script>

<style lang="scss" scoped>


</style>