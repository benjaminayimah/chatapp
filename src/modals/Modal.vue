<template>
    <div class="modal-overlay jc-c ai-c" @click.self="closeModal">
        <div class="modal-container bg-modal-surface">
            <div class="modal-header">
                <slot name="header">
                    <h3>{{ title }}</h3>
                </slot>
                <button @click="closeModal" class="bg-transparent transparent-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 13.587 13.587">
                        <path id="close_modal" d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"/>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <slot name="body"></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Modal',
    props: {
        zindex: Number,
        opacity: Number,
        width: Number,
        title: {
            type: String,
            default: 'Modal'
        },
        
    },
    computed: {
        computedZindex() {
            return this.zindex
        },
        computedOpacity() {
            return this.opacity
        },
        computedWidth() {
            return this.width + 'px'
        }
    },
    methods: {
        closeModal() {
            this.$router.push({ query: {} });
        },
        handleEsc(event) {
        if (event.key === 'Escape') {
            this.closeModal();
        }
    },
    },
    mounted() {
        document.addEventListener('keydown', this.handleEsc);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.handleEsc);
    },
}
</script>
<style lang="scss" scoped>
.modal-overlay {
    --opacity: v-bind(computedOpacity);
    background-color: rgba($color: #000000, $alpha: var(--opacity));
    z-index: v-bind(computedZindex);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
}

.modal-container {
    padding: 20px;
    border-radius: 16px;
    width: v-bind(computedWidth);
    max-width: 90%;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    height: 36px;
    width: 36px;
    cursor: pointer;
}
</style>