<template>
    <div class="modal-overlay centered fixed h-100 w-100" @click.self="closeModal">
        <div class="modal-container bg-modal-surface ov-hidden">
            <div class="modal-header">
                <h4>{{ deleteItem.title }}</h4>
            </div>
            <div class="modal-body">
                <div v-html="deleteItem.body" class="body-wrapper delete-modal-body flex flex-column gap-8"></div>
                <div class="flex gap-8 jc-fe">
                    <button @click="closeModal" class="button-outline ai-c jc-c">Cancel</button>
                    <button @click="doDelete" class="button-danger ai-c jc-c">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';


export default {
    name: 'DeleteModal',
    props: {
        zindex: Number,
        opacity: Number,
        width: Number,
        title: {
            type: String,
            default: 'Delete'
        } 
    },
    computed: {
        ...mapState({
            deleteItem: (state) => state.deleteModal
        })
    },
    methods: {
        async closeModal() {
            this.$store.commit('closeDeleteModal')
        },
        async handleEsc(e) {
            if (e.key === 'Escape') {
                this.$store.commit('closeDeleteModal')
            }
        },
        doDelete() {
            switch (this.deleteItem.type) {
                case 'recent-chat':
                    this.deleteChat();
                    break;
                case 'all-chats':
                    this.deleteAllChats()
                break;
            }
        },
        async deleteChat() {
            const routeId = this.$route.params.id
            const itemId = this.deleteItem.id

            await this.$store.commit('deleteChat', itemId)
            
            this.$store.commit('closeDeleteModal')

            if (routeId == itemId) {
                this.$router.push({ name: 'NewChat' })
            }
        },
        async deleteAllChats() {
            await this.$store.commit('deleteAllChats')

            this.$store.commit('closeDeleteModal')
            if (this.$route.name === 'ChatView') {
                this.$router.push({ name: 'NewChat', query: { m: 'settings' } })
            }
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
    background-color: rgba($color: #000000, $alpha: 0.6);
    z-index: 500;
    inset: 0 auto auto 0;
}

.modal-container {
    width: 450px;
    max-height: 90dvh;
    padding: 16px 20px 20px 20px;
}

.modal-header {
    justify-content: space-between;
    align-items: center;
}


.desktop, .tablet {
  .transparent-button {
    &:hover {
      background-color: var(--modal-close-button-hover);

    }
  }
}

.body-wrapper {
    padding: 6px 0 16px 0;
    
}


button {
    height: 40px;
    padding: 0 15px;
}
button.button-outline {
    font-size: 0.95rem;
    color: var(--main-font-color-primary);
    border-color: var(--light-surface-border);
    &:hover {
        background-color: var(--light-surface-active);
    }
}

</style>