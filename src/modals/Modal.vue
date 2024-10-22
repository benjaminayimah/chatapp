<template>
    <div class="modal-overlay centered fixed h-100 w-100" @click.self="closeModal">
        <div class="modal-container bg-modal-surface ov-hidden">
            <div class="modal-header flex">
                <slot name="header">
                    <h3>{{ title }}</h3>
                </slot>
                <button @click="closeModal" class="transparent-button jc-c" data-type="modal">
                    <svg height="14" viewBox="0 0 13.587 13.587">
                        <path id="close_modal" d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"/>
                    </svg>
                </button>
            </div>
            <div class="modal-body overflow-y-scroll">
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
    name: 'ModalView',
    props: {
        zindex: Number,
        opacity: Number,
        width: Number,
        title: {
            type: String,
            default: 'Modal'
        },
        modalType: {
            type: String,
            default: ''
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
    padding: 12px 0;
    border-radius: 16px;
    width: v-bind(computedWidth);
    max-width: 90vw;
    max-height: 90dvh;
    min-height: 50dvh;

}

.modal-header {
    justify-content: space-between;
    align-items: center;
}
.modal-body {
    max-height: calc(90dvh - 56px);
}
.modal-body, .modal-header, .modal-footer {
    padding: 0 20px;
}

button {
    height: 36px;
    width: 36px;
    cursor: pointer;
    margin-right: -6px;
}

.desktop, .tablet {
  .transparent-button {
    &:hover {
      background-color: var(--modal-close-button-hover);

    }
  }
}
</style>