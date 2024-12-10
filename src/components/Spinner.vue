<template>
    <span class="loader"></span>
</template>

<script>
export default {
    name: 'SpinnerLoader',
    props: {
        size: Number,
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
  height: var(--dimension);
  aspect-ratio: 1;
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - var(--dimension)/10),#000 0);
  animation: spin 1s infinite linear;
}
@keyframes spin{ 
  100%{transform: rotate(1turn)}
}
</style>