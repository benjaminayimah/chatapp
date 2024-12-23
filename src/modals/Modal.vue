<template>
    <div class="modal-overlay centered fixed h-100 w-100" @click.self="closeModal">
        <div class="modal-container bg-modal-surface ov-hidden">
            <div class="modal-header flex">
                <slot name="header"></slot>
                <button v-if="hasButton" @click="closeModal" class="transparent-button ai-c jc-c" data-type="modal">
                    <svg height="12" viewBox="0 0 13.587 13.587">
                        <path id="close_modal" d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)"/>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
    name: 'ModalView',
    mixins: [modalMixin],
    props: {
        zindex: Number,
        opacity: Number,
        width: Number,
        minHeight: Number,
        hasButton: {
            default: true,
            type: Boolean
        }
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
        },
        computedMinHeight() {
            return this.minHeight + 'dvh'
        }
    },
    
    mounted() {
        document.addEventListener('keydown', this.handleEsc);
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.handleEsc);
    },
}
</script>
<style lang="scss" scoped>
.modal-overlay {
    --opacity: v-bind(computedOpacity);
    background-color: rgba($color: #000000, $alpha: var(--opacity));
    z-index: v-bind(computedZindex);
    inset: 0 auto auto 0;
}

.modal-container {
    width: v-bind(computedWidth);
    max-height: 90dvh;
    min-height: v-bind(computedMinHeight);
    box-shadow: var(--box-shadow-1);
}

.modal-header {
    justify-content: space-between;
    align-items: center;
}

.modal-header{
    padding: 12px 20px 0 20px;
}

button {
    height: 36px;
    width: 36px;
    margin-right: -8px;
}

</style>