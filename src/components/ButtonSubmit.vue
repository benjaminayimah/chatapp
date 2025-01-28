<template>
    <button
        @click="emitClick"
        :type="type"
        :disabled="disabled"
        :class="`${classes} ai-c jc-c gap-4`">
            <spinner v-if="processing" :size="18" />
            {{ label }}
        </button>
</template>

<script>
import Spinner from './Spinner.vue'
export default {
    components: { Spinner },
    props: {
        classes: {
            type: String,
            default: ''
        },
        label: String,
        type: {
            type: String,
            default: 'button'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        processing: {
            type: Boolean,
            default: false
        },
        prevent: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        emitClick(event) {
            this.prevent ? event.preventDefault() : ''
            this.$emit('handle-button-click', event)
        }
    }
}
</script>

<style lang="scss" scoped>


</style>