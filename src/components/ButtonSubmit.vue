<template>
    <button
        @click="$emit('handle-button-click')"
        :type="type"
        :disabled="disabled"
        :class="`${classes} ai-c jc-c gap-4`">
            <spinner v-if="processing" :size="18" />
            {{ content }}
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
        content: String,
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
        }
    }
}
</script>

<style lang="scss" scoped>


</style>