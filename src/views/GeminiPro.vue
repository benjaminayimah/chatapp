<template>
    <div ref="chatContainer" class="flex chat-body-wrapper flex-1 jc-c overflow-y-scroll">
        <div class="chat-wrapper flex-1">
            <div ref="chatContainer" class="chat-body">
                <span v-if="error">{{ error }}</span>
                <div v-for="(chat, index) in formattedResult" :key="index">
                    <div v-html="formatChat(chat)"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex jc-c">
        <div class="chat-wrapper flex-1">
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
</template>
  
<script>
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import ChatInput from '@/components/ChatInput.vue';
  
export default {
  components: { ChatInput },
    name: 'GeminiPro',
    data() {
        return {
            chatHistory: [],
            error: null,
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
        async submitPrompt(prompt) {
            this.scrollToBottom()
            this.error = null;
            if (!prompt) {
                this.error = 'Error! Please ask a question!';
                return;
            }
            const chats = [
                ...this.chatHistory,
                { role: 'user', parts: [{ text: prompt }] },
            ];
            this.chatHistory = chats
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        history: this.chatHistory,
                        message: prompt
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const response = await fetch('http://localhost:8001/gemini-pro', options);
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
                    }
                } while (!done);
                localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
            } catch (error) {
                console.error(error);
                this.error = 'Something went wrong!';
            }
        },
        updateChat(text) {
            const lastIndex = this.chatHistory.length - 1;
            const modelChatIndex = this.chatHistory[lastIndex]
            if (modelChatIndex.role ===  'model') {
                this.chatHistory[lastIndex].parts[0].text = text
            } else {
                this.chatHistory.push({ role: 'model', parts: [{ text }] });
            }
            this.scrollToBottom()
        },
        formatChat(chat) {
            if (chat.role === 'user') {
                return `<div class="flex res-block ${chat.role}-response"><div>${chat.formattedText}</div></div>`;
            } else {
                return `<div class="flex res-block ${chat.role}-response">
                    <div class="${chat.role}-avatar centered">
                       <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28" viewBox="0 0 28 28">
                            <defs>
                                <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                                <stop offset="0" stop-color="#0fa3eb"/>
                                <stop offset="1" stop-color="#ca3de3"/>
                                </linearGradient>
                            </defs>
                            <path id="Path_2599" data-name="Path 2599" d="M14,28a13.448,13.448,0,0,0-1.12-5.46A13.9,13.9,0,0,0,9.9,18.095,13.9,13.9,0,0,0,5.46,15.12,13.449,13.449,0,0,0,0,14a13.823,13.823,0,0,0,5.46-1.085A14.385,14.385,0,0,0,9.9,9.9,13.9,13.9,0,0,0,12.88,5.46,13.449,13.449,0,0,0,14,0a13.823,13.823,0,0,0,1.085,5.46A14.385,14.385,0,0,0,18.095,9.9a14.386,14.386,0,0,0,4.445,3.01A13.823,13.823,0,0,0,28,14a13.448,13.448,0,0,0-5.46,1.12,13.9,13.9,0,0,0-4.445,2.975,14.386,14.386,0,0,0-3.01,4.445A13.823,13.823,0,0,0,14,28Z" fill="url(#linear-gradient)"/>
                        </svg>
                    </div><div>${chat.formattedText}</div></div>`;
            }
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const chatContainer = this.$refs.chatContainer;
                chatContainer.scrollTop = chatContainer.scrollHeight;
            });
        }
    },
    mounted() {
        this.scrollToBottom();
        const history = JSON.parse(localStorage.getItem('chatHistory'));
        if (history) {
            this.chatHistory = history;
        }
    }
};
</script>

<style lang="scss" scoped>
/* Add your styles here */
h2 {
    font-size: 2rem;
}
.chat-wrapper {
    // width: 800px;
    max-width: 832px;
    padding: 0 16px;

}
.chat-body {
    // min-height: calc(100dvh - 179px);
    padding: 40px 0;
}
.jc-c {
    // height: calc(100dvh - 216px);
}
.overflow-y-scroll {
    // height: calc(100% - 82px);
}

</style>
  