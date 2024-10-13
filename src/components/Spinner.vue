<template>
    <span class="loader"></span>
</template>

<script>
export default {
    name: 'SpinnerLoader',
    props: {
        size: Number,
        color: String
    },
    computed: {
        dimension() {
            return this.size+'px'
        }
    }
}
</script>

<style scoped>
.loader {
--dimension: v-bind(dimension);
  width: var(--dimension);
  aspect-ratio: 1;
  border-radius: 50%;
  background: 
    radial-gradient(farthest-side,v-bind(color) 94%,#0000) top/3px 3px no-repeat,
    conic-gradient(#0000 30%,v-bind(color));
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 3px),#000 0);
  animation: spin 1s infinite linear;
}
@keyframes spin{ 
  100%{transform: rotate(1turn)}
}
</style>