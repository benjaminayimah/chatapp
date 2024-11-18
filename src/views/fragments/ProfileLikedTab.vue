<template>
    <empty-state 
        :message="computedMessage"
        :button="false"
    />
</template>

<script>
import EmptyState from '@/components/EmptyState.vue'
export default {
    name: 'ProfileLikedTab',
    components: { EmptyState },
    computed: {
        computedMessage() {
            const message = {
                heading: 'No liked agents',
                body: 'You have not liked any agent yet. Your liked AI agents will appear here.',
            }
            return message
        }
    }
}
</script>

<style lang="scss" scoped>


</style>