<template>
    <div ref="chatContainer" class="flex chat-body-wrapper flex-1 jc-c overflow-y-scroll">
        <div class="chat-wrapper flex-1">
            <div ref="chatContainer" class="chat-body">
                <response-row v-for="(chat, index) in formattedResult" 
                    :key="index"
                    :chat="chat"
                    :index="index"
                    :newIndex="newIndex"
                    :resEnded="resEnded"
                    :error="error"
                    :processing="processing"
                    :id="$route.params.id"
                    @preview-image="previewImage"
                />
            </div>
        </div>
    </div>
    <div class="flex jc-c">
        <div class="chat-wrapper flex-1 relative">
            <div id="chat_info_container" class="centered absolute gap-8">
                <scroll-bottom-buttton v-if="showScrollButton" @do-scroll="doScroll" />
                <alert-box v-if="showAlert" />
            </div>
            <div class="bg-surface-1">
                <chat-input @submit-prompt="submitPrompt" />
                <div class="footnote">
                    <div>
                        Andromeda may display inaccurate info, including about people, so double-check its responses.
                    </div>
                </div>
            </div>
        </div>
    </div>
    <teleport to='body'>
        <transition name="modal-fade">
            <image-preview-modal v-if="imagePreview" :image="imagePreview" @close-preview="closePreview" />
        </transition>
    </teleport>
</template>
  
<script>
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import ChatInput from '@/components/ChatInput.vue';
import ImagePreviewModal from '@/modals/ImagePreviewModal.vue';
import ResponseRow from '@/components/ResponseRow.vue';
import ScrollBottomButtton from '@/components/ScrollBottomButtton.vue';
import AlertBox from '@/components/AlertBox.vue';
  
export default {
    components: { ChatInput, ImagePreviewModal, ResponseRow, ScrollBottomButtton, AlertBox },
    name: 'ChatView',
    data() {
        return {
            chatHistory: [],
            error: null,
            imagePreview: null,
            showScrollButton: false,
            showAlert: false,
            resEnded: false,
            newIndex: null,
            processing: null
        }
    },
    computed: {
        formattedResult() {
            return this.chatHistory.map(chat => {
                return {
                    ...chat,
                    formattedText: DOMPurify.sanitize(marked(chat.parts[0].text))
                }
            })
        }
    },
    watch: {
        '$route.params.id'(newValue) {
            this.fetchHistory(newValue);
        }
    },
    methods: {
        async submitPrompt(e) {
            this.resEnded = false
            const prompt = e.prompt
            const image = e.image
            const file = e.file

            this.error = null

            if (!prompt && !image) {
                this.error = 'Error! Please ask a question!';
                return;
            }
            const chats = [
                ...this.chatHistory,
                { role: 'user', parts: [{ text: prompt }] },
                { role: 'model', parts: [{ text: ''}] },
            ];
            this.chatHistory = chats
            const index = this.chatHistory.length -1
            this.newIndex = index

            this.insertLoader(index)

            if (image) {
                this.cacheImage(image, index - 1)
                // this.fetchCurrentImage(image, index -1)
            }
            this.scrollToBottom()
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        history: this.chatHistory,
                        prompt: prompt,
                        image: image ? image.split('/').pop() : '',
                        fileType: file ? file.type: '',
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const res = await fetch('http://localhost:8001/submit-prompt', options);
                this.removeLoader()
                
                if (res.status === 200) {
                    const reader = res.body.getReader()
                    let text = '';
                    const decoder = new TextDecoder();
    
                    let done = false;
                    do {
                        const { value, done: doneReading } = await reader.read();
                        done = doneReading;
                        if (value) {
                            text += decoder.decode(value, { stream: true });
                            this.updateChat(text);
                            this.scrollToBottom()
                        }
                    } while (!done);
                    localStorage.setItem(this.$route.params.id, JSON.stringify(this.chatHistory))
                    this.resEnded = true
                }else {
                    this.showError(index, res.statusText)
                    this.removeLoader()
                }
            } catch (error) {
                this.showError(index, error)
                this.removeLoader()
            }
        },
        insertLoader(index) {
            const status = { active: true, index: index }
            this.processing = status
        },
        removeLoader() {
            this.processing = null
        },
        showError(index, error) {
            const newError = { message: error, index: index }
            this.error = newError
        },
        cacheImage(image, index) {
            let images = JSON.parse(localStorage.getItem(this.$route.params.id + '_images'))
            const newHistory = { image: image, index: index}
            if (images) {
                images.push(newHistory)
                localStorage.setItem(this.$route.params.id + '_images', JSON.stringify(images))
            }
        },
        previewImage(url) {
            this.imagePreview = url
        },
        closePreview() {
            this.imagePreview = null
        },
        updateChat(text) {
            const lastIndex = this.chatHistory.length - 1;
            const modelChatIndex = this.chatHistory[lastIndex]
            if (modelChatIndex.role ===  'model') {
                this.chatHistory[lastIndex].parts[0].text = text
            }
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const lastIndex = this.chatHistory.length - 1;
                const resDiv = document.querySelector(`#model_res_container_${lastIndex}`);

                if (resDiv) {
                    const rect = resDiv.getBoundingClientRect();
                    if (rect.top >= (window.innerHeight / 4)) {
                        this.doScroll()
                    } 
                } else {
                    this.doScroll()
                }
            });
        },
        doScroll() {
            const chatContainer = this.$refs.chatContainer;
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth'
            });
        },
        handleScrollPosition() {
            const chatContainer = this.$refs.chatContainer;

            const scrollPosition = chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight;

            if (scrollPosition > 100) {
                this.showScrollButton = true;
            } else {
                this.showScrollButton = false;
            }
        },
        fetchHistory(param) {
            this.chatHistory = []
            this.images = []
            const history = JSON.parse(localStorage.getItem(param))
            
            if (history) {
                this.chatHistory = history;

                this.scrollToBottom()

                this.$nextTick(() => {
                    const chatContainer = this.$refs.chatContainer;
                    chatContainer.addEventListener('scroll', this.handleScrollPosition);
                });
            }
        },
        prelims() {
            const imageHistory = JSON.parse(localStorage.getItem(this.$route.params.id + '_images'))
            !imageHistory ? localStorage.setItem(this.$route.params.id + '_images', JSON.stringify([])) : ''
        }
    },
    mounted() {
        this.fetchHistory(this.$route.params.id)
        this.prelims()
    },
    beforeUnmount() {
        const chatContainer = this.$refs.chatContainer;
        chatContainer.removeEventListener('scroll', this.handleScrollPosition)
    }
};
</script>

<style lang="scss" scoped>
h2 {
    font-size: 2rem;
}
.chat-wrapper {
    max-width: 832px;
    padding: 0 16px;
}
.chat-body {
    padding: 40px 0;
}
</style>
  