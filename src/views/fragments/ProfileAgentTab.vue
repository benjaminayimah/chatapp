<template>
    <empty-state
        :heading="heading"
        :body="body"
        :button="true"
        :buttonText="buttonText"
        :auth="auth"
        @empty-btn-event="goToCreate"
    />
</template>

<script>
import EmptyState from '@/components/EmptyState.vue'
export default {
    name: 'ProfileAgentTab',
    components: { EmptyState },
    props: {
        auth: Boolean
    },
    data() {
        return {
            heading: 'No agent',
            body: this.auth ? 'Create an avatar and train it to help you with specific tasks.' : 'This user has not created any avatar yet.',
            buttonText: 'Create AI Agent'
        }
    },
    methods: {
        goToCreate() {
            this.$router.push({ name: 'CreateAgent' })
        }
    }
}
</script>

<style lang="scss" scoped>


</style>