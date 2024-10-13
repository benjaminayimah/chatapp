<template>
    <div ref="chatContainer" class="flex chat-body-wrapper flex-1 jc-c overflow-y-scroll">
        <div class="chat-wrapper flex-1">
            <div ref="chatContainer" class="chat-body">
                <span v-if="error">{{ error }}</span>
                <response-row v-for="(chat, index) in formattedResult" 
                    :key="index"
                    :chat="chat"
                    :index="index"
                />
            </div>
        </div>
    </div>
    <div class="flex jc-c">
        <div class="chat-wrapper flex-1">
            <div v-if="showScrollButton" class="centered relative">
                <button @click="doScroll" class="scroll-bottom absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14.677" viewBox="0 0 13 14.677">
                        <path d="M14.943,11.5a.885.885,0,0,1,.007,1.246l-4.11,4.123H21.686a.88.88,0,0,1,0,1.76H10.841l4.116,4.123A.891.891,0,0,1,14.95,24a.877.877,0,0,1-1.239-.007L8.133,18.372h0a.988.988,0,0,1-.183-.278.84.84,0,0,1-.068-.339.882.882,0,0,1,.251-.616l5.579-5.619A.862.862,0,0,1,14.943,11.5Z" transform="translate(-11.252 22.559) rotate(-90)" fill="#fff"/>
                    </svg>
                </button>
            </div>
            <div class="chat-footer bg-surface-1">
                <chat-input @submit-prompt="submitPrompt" />
                <div class="footnote">
                    <div>
                        Gemini may display inaccurate info, including about people, so double-check its responses.
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
  
export default {
    components: { ChatInput, ImagePreviewModal, ResponseRow },
    name: 'GeminiPro',
    data() {
        return {
            chatHistory: [],
            error: null,
            imagePreview: null,
            showScrollButton: false
        };
    },
    computed: {
        formattedResult() {
            return this.chatHistory.map(chat => {
                return {
                    ...chat,
                    formattedText: DOMPurify.sanitize(marked(chat.parts[0].text))
                };
            });
        }
    },
    methods: {
        async submitPrompt(e) {
            const prompt = e.prompt
            const image = e.image
            // const file = image ? e.file[0] : ''
            // console.log(file)
            this.error = null;

            if (!prompt && !image) {
                this.error = 'Error! Please ask a question!';
                return;
            }
            const chats = [
                ...this.chatHistory,
                { role: 'user', parts: [{ text: prompt }] },
                { role: 'model', parts: [{ text: 'Thinking...'}] },
            ];
            this.chatHistory = chats
            const index = this.chatHistory.length -1

            if (image) {
                this.cacheImage(image, index - 1)
                this.fetchCurrentImage(image, index -1)
            }
            this.scrollToBottom()

            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        history: this.chatHistory,
                        prompt: prompt,
                        image: image ? image.split('/').pop() : '',
                        ext: image ? image.split('.').pop() : '',
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const response = await fetch('http://localhost:8001/submit-prompt', options);
                const reader = response.body.getReader();
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
                localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
            } catch (error) {
                console.error(error);
                this.error = 'Something went wrong!';
            }
        },
        cacheImage(image, index) {
            let images = JSON.parse(localStorage.getItem('imageHistory'))
            const newHistory = { image: image, index: index}
            if (images) {
                images.push(newHistory)
                localStorage.setItem('imageHistory', JSON.stringify(images))
            }
        },
        fetchImages() {
            const images = JSON.parse(localStorage.getItem('imageHistory'));
            this.$nextTick(() => {
                images.forEach(e => {
                    this.selectDiv(e.image, e.index)
                })

            })
        },
        selectDiv(image, index) {
            const imageDiv = document.querySelector(`#prompt_${index}`)
            if (imageDiv) {
                const img = document.createElement('img');
                img.src = image
                img.alt = `Prompt image ${index}`;
                img.height = 200;
                img.loading = 'lazy';
                img.addEventListener('click', () => {
                    this.previewImage(image)
                });
                imageDiv.appendChild(img);
            }
        },
        fetchCurrentImage(image, index) {
            this.$nextTick(() => {
                this.selectDiv(image, index)
            })
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
            } else {
                this.chatHistory.push({ role: 'model', parts: [{ text }] });
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
        }
    },
    mounted() {
        this.fetchImages()
        const history = JSON.parse(localStorage.getItem('chatHistory'));
        if (history) {
            this.chatHistory = history;
        }
        this.scrollToBottom()

        this.$nextTick(() => {
            const chatContainer = this.$refs.chatContainer;
            chatContainer.addEventListener('scroll', this.handleScrollPosition);
        });
    },
    beforeUnmount() {
        const chatContainer = this.$refs.chatContainer;
        chatContainer.removeEventListener('scroll', this.handleScrollPosition);
    },
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
  