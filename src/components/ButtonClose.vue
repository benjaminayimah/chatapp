<template>
    <button @click="$emit('handle-close-event')" :class="classes" :style="{ height: `${height}px`, width: `${height}px`}">
        <svg :height="`${height/2.5}`" viewBox="0 0 13.587 13.587">
            <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)"/>
        </svg>
    </button>
</template>

<script>
export default {
    props: {
        classes: {
            type: String,
            default: ''
        },
        height: {
            type: Number,
            default: 36
        }
    }
}
</script>

<style lang="scss" scoped>

</style>