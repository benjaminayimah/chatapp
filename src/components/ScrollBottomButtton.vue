<template>
    <button @click="$emit('do-scroll')" class="scroll-bottom">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14.677" viewBox="0 0 13 14.677">
            <path d="M14.943,11.5a.885.885,0,0,1,.007,1.246l-4.11,4.123H21.686a.88.88,0,0,1,0,1.76H10.841l4.116,4.123A.891.891,0,0,1,14.95,24a.877.877,0,0,1-1.239-.007L8.133,18.372h0a.988.988,0,0,1-.183-.278.84.84,0,0,1-.068-.339.882.882,0,0,1,.251-.616l5.579-5.619A.862.862,0,0,1,14.943,11.5Z" transform="translate(-11.252 22.559) rotate(-90)" fill="#fff"/>
        </svg>
    </button>
</template>

<script>
export default {
    name: 'ScrollBottomButtton'
}
</script>

<style lang="scss" scoped>


</style>