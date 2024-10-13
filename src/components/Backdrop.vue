<template>
    <div id="overlay"></div>
</template>
<script>
export default {
    name: 'BackdropOverlay',
    props: {
        zindex: Number,
        opacity: Number
    },
    computed: {
        computedZindex() {
            return this.zindex
        },
        computedOpacity() {
            return this.opacity
        }
    }
}
</script>
<style lang="scss" scoped>
#overlay{
    --opacity: v-bind(computedOpacity);
    background-color: rgba($color: #000000, $alpha: var(--opacity));
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: v-bind(computedZindex);
}
</style>