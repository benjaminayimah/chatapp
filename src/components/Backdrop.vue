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
        computedIndex() {
            return this.index
        },
        computedOpacity() {
            return this.opacity
        }
    }
}
</script>
<style lang="scss" scoped>
#overlay{
    
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>