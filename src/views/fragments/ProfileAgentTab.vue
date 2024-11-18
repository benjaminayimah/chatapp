<template>
    <empty-state
        :message="computedMessage"
        :button="computedButtonState"
        @empty-btn-event="goToCreate"
    />
</template>

<script>
import EmptyState from '@/components/EmptyState.vue'
export default {
    name: 'ProfileAgentTab',
    components: { EmptyState },
    props: {
        isOwner: Boolean
    },
    computed: {
        computedMessage() {
            const message = {
                heading: 'No agent',
                body: this.isOwner ? 'Create an Agent and train it to help you with specific tasks.' : 'This user has not created any Agent yet.',
                buttonText: 'Create AI Agent',
            }
            return message
        },
        computedButtonState() {
            return !!(this.computedMessage.buttonText && this.isOwner)
        }
    },
    data() {
        return {
            
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