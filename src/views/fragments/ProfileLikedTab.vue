<template>
    <empty-state 
        :heading="heading" 
        :body="body" 
        :button="false"
        :auth="auth"
    />
</template>

<script>
import EmptyState from '@/components/EmptyState.vue'
export default {
    name: 'ProfileLikedTab',
    components: { EmptyState },
    props: {
        auth: Boolean
    },
    data() {
        return {
            heading: 'No liked agents',
            body: 'You have not liked any agent yet. Your liked AI agents will appear here.',
        }
    }
}
</script>

<style lang="scss" scoped>


</style>