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
            heading: 'No liked avatar',
            body: 'You have not liked any avatar yet. Your liked avatars will appear here.',
        }
    }
}
</script>

<style lang="scss" scoped>


</style>