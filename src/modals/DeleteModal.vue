<template>
    <div class="modal-overlay centered fixed h-100 w-100" @click.self="closeModal">
        <div class="modal-container flex flex-column gap-8 bg-modal-surface ov-hidden">
            <div class="modal-header">
                <h4>{{ deleteItem.title }}</h4>
            </div>
            <div class="modal-body">
                <div v-html="deleteItem.body" class="body-wrapper delete-modal-body flex flex-column gap-8"></div>
                <div class="flex gap-8 jc-fe">
                    <button-submit
                        @handle-button-click="closeModal"
                        :classes="'button-outline default fs-09 fw-600'"
                        :label="'Cancel'"
                        :type="'button'"
                        :processing="processing"
                        :disabled="processing"
                    />
                    <button-submit
                        @handle-button-click="doDelete"
                        :classes="'button-danger default fs-09 fw-600'"
                        :label="'Delete'"
                        :type="'submit'"
                        :processing="processing"
                        :disabled="processing"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/apis';
import { mapState } from 'vuex';
import formMixin from '@/mixins/formMixin';
import ButtonSubmit from '@/components/ButtonSubmit.vue';

export default {
    components: { ButtonSubmit },
    name: 'DeleteModal',
    mixins: [formMixin],
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
                    this.deleteAllChats();
                    break;
                case 'agent':
                    this.deleteAgent();
                    break;
            }
        },
        async deleteChat() {
            const routeId = this.$route.params.id
            const itemId = this.deleteItem.id

            await this.$store.commit('deleteChat', itemId)
            
            this.$store.commit('closeDeleteModal')

            this.$store.dispatch('showAlert', { type: 'success', autoDismiss: true, message: 'Chat has been deleted successfully'})

            if (routeId == itemId) {
                this.$router.push({ name: 'NewChat' })
            }
        },
        async deleteAllChats() {
            await this.$store.commit('deleteAllChats')

            this.$store.commit('closeDeleteModal')

            this.$store.dispatch('showAlert', { type: 'success', autoDismiss: true, message: 'All chats deleted successfully'})

            if (this.$route.name === 'ChatView') {
                this.$router.push({ name: 'NewChat', query: { m: 'settings' } })
            }
        },
        async deleteAgent() {
            this.startProcessing()
            try {
                const res = await api.delete('/agent/'+ this.deleteItem.id)
                console.log(res.data)
                await this.$store.commit('removeAgent', this.deleteItem.id)
                await this.$store.dispatch('showAlert', { type: 'success', autoDismiss: true, message: res.data.message})
            } catch (err) {
                this.$store.commit('closeDeleteModal')
                this.handleError(err)
            } finally {
                this.stopProcessing()
                this.$store.commit('closeDeleteModal')
            }
        }
    },
    mounted() {
        document.addEventListener('keydown', this.handleEsc);
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.handleEsc);
    }
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
    padding: 24px 26px 26px 26px;
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
</style>