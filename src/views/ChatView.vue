<template>
    <div class="flex flex-1 jc-c chat-container">
        <div class="main-wrapper flex-1">
            <div class="chat-body">
                <response-row v-for="(chat, index) in formattedResult" 
                    :key="index"
                    :chat="chat"
                    :index="index"
                    :newIndex="newIndex"
                    :resEnded="resEnded"
                    :error="error"
                    :processing="processing"
                    :id="$route.params.id"
                    :images="images"
                    @preview-image="previewImage"
                />
            </div>
        </div>
    </div>
    <div class="flex jc-c sticky bottom-0">
        <div class="main-wrapper flex-1 relative">
            <div id="chat_info_container" class="centered absolute gap-8">
                <scroll-bottom-buttton v-if="showScrollButton" @do-scroll="doScroll('smooth')" />
                <chat-alert-box v-if="showChatAlert" />
            </div>
            <div class="bg-surface-1">
                <chat-input @submit-prompt="submitPrompt" />
                <div class="footnote">
                    <div>
                        artemis ai may display inaccurate info, including about people, so double-check its responses.
                    </div>
                </div>
            </div>
        </div>
    </div>
    <teleport to='body'>
        <transition name="modal-fade">
            <image-preview-modal
                v-if="imagePreview"
                @close-preview="closePreview"
                :image="imagePreview"
                />
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
import ChatAlertBox from '@/components/ChatAlertBox.vue';
import { mapState } from 'vuex';
  
export default {
    components: { ChatInput, ImagePreviewModal, ResponseRow, ScrollBottomButtton, ChatAlertBox },
    name: 'ChatView',
    data() {
        return {
            chatHistory: [],
            images: [],
            error: null,
            imagePreview: null,
            showScrollButton: false,
            showChatAlert: false,
            resEnded: false,
            newIndex: null,
            processing: null
        }
    },
    computed: {
        ...mapState({
            device: (state) => state.DeviceWindow.device,
            newChat: (state) => state.newChat
        }),
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
            const fileType = e.fileType

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

            if (image) {
                this.cacheImage(image, index - 1)
            }

            this.insertLoader(index)

            this.scrollToBottom()
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        history: this.chatHistory,
                        prompt: prompt,
                        image: image ? image.split('/').pop() : '',
                        fileType: fileType || '',
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const res = await fetch('http://localhost:3000/api/submit-prompt', options);
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
                    this.newChat ? this.getNewChatTitle(e.id) : ''
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
                this.images = images
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
                        this.doScroll('smooth')
                    } 
                }
            });
        },
        doScroll(behavior) {
            const scrollContainer = document.querySelector('main');
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: behavior
            });
        },
        handleScrollPosition() {
            const scrollContainer = document.querySelector('main');

            const scrollPosition = scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight;

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

            const images = JSON.parse(localStorage.getItem(param + '_images'))
  
            images ? this.images = images : ''
        
            if (history) {
                this.chatHistory = history;

                this.$nextTick(() => {
                    this.doScroll('auto')
                });
            }
            this.dismissMenu()
        },
        handleNewChat(e) {
            this.chatHistory = []
            this.images = []

            this.$nextTick(() => {
                this.submitPrompt(e)
            })
        },
        async getNewChatTitle(id) {
            const prompt = 'Just give one short sentence title to the conversation above, without any leading commentary. It should just be about five to six words maximum.'

            const chats = [
                ...this.chatHistory,
                { role: 'user', parts: [{ text: prompt }] },
            ];
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        history: chats,
                        prompt: prompt,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const res = await fetch('http://localhost:3000/api/get-recent-title', options);
                
                if (res.status === 200) {
                    const data = await res.json();

                    const newRecent = { id: id, title: data }
                    this.$store.commit('addToRecents', newRecent)
                    this.$store.commit('clearNewChat')
                }
            } catch (error) {
                console.error(error)
            }

        },
        dismissMenu() {
            this.device === 'mobile' ? this.$store.commit('closeSideBar') : ''
        }
    },
    mounted() {
        const chatType = this.newChat
        if((chatType?.prompt || chatType?.image) && chatType?.id === this.$route.params.id) {
            this.handleNewChat(chatType)
        }else {
            this.fetchHistory(this.$route.params.id)
        }
        const scrollContainer = document.querySelector('main');
        scrollContainer.addEventListener('scroll', this.handleScrollPosition);
        this.dismissMenu()
    },
    beforeUnmount() {
        const scrollContainer = document.querySelector('main');
        scrollContainer.removeEventListener('scroll', this.handleScrollPosition)
    }
};
</script>

<style lang="scss" scoped>
h2 {
    font-size: 2rem;
}
.main-wrapper {
    max-width: 832px;
    padding: 0 16px;
}
.chat-body {
    padding: 40px 0;
}

.chat-container {
    min-height: calc(100% - (var(--header-height) + 96px));
}
</style>
  