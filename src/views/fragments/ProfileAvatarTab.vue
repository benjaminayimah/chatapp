<template>
    <empty-state
        :heading="heading"
        :body="body"
        :button="true"
        :buttonText="buttonText"
        :auth="auth"
    />
</template>

<script>
import EmptyState from '@/components/EmptyState.vue'
export default {
    name: 'ProfileAvatarTab',
    components: { EmptyState },
    props: {
        auth: Boolean
    },
    data() {
        return {
            heading: 'No avatar',
            body: this.auth ? 'Create an avatar and train it to help you with specific tasks.' : 'This user has not created any avatar yet.',
            buttonText: 'Create avatar'
        }
    }
}
</script>

<style lang="scss" scoped>


</style>