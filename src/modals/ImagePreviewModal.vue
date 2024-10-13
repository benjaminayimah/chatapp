<template>
    <div class="preview-overlay centered fixed h-100 w-100" @click.self="$emit('close-preview')">
        <button @click="$emit('close-preview')" class="transparent-button bg-transparent fixed preview-close">
            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 13.587 13.587">
                <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#b8bac0"/>
            </svg>
        </button>
        <div class="preview-image-container">
            <img :src="image" class="w-100 h-100" alt="Prompt image">
        </div>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    name: 'ImagePreviewModal',
    props: {
        image: String
    }
}
</script>

<style lang="scss" scoped>
.preview-overlay {
    background-color: rgba($color: #000000, $alpha: .9);
    z-index: 999;
    inset: 0 auto auto 0;
    padding: 20px;

    button {
        height: 36px;
        width: 36px;
        inset: 12px 12px auto auto;
        cursor: pointer;

        &:hover {
            background-color: #1e1f20;
        }
        &:active {
            background-color: #4c4d4e;
            outline-color: #737377
        }
    }
}
.preview-image-container {
    height: 80dvh;
    img {
        object-fit: contain;
    }
}
</style>