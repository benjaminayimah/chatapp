<template>
    <div class="flex flex-1 jc-c">
        <div class="chat-wrapper flex-1">
            <!-- <div>
                <button @click.prevent="feelingLucky">Feeling lucky</button>
                <input v-model="prompt" name="question-input" type="text" placeholder="Ask me anything...">
                <button @click.prevent="sendPost">Ask me</button>
            </div> -->
            <div ref="chatContainer" class="chat-body">
                <span v-if="error">{{ error }}</span>
                <div v-for="(chat, index) in formattedResult" :key="index">
                    <div v-html="formatChat(chat)"></div>
                </div>
            </div>
            <div class="chat-footer sticky sticky-bottom">
                <chat-input />
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
            prompt: '',
            chatHistory: [],
            feelingLuckyOptions: [
                'Who won the latest Nobel Peace Prize?',
                'Where does pizza come from?',
                'How do you make pizza?'
            ],
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
        feelingLucky() {
            const randomQuestion = this.feelingLuckyOptions[Math.floor(Math.random() * this.feelingLuckyOptions.length)];
            this.prompt = randomQuestion;
        },
        async sendPost() {
            this.error = null;
            if (!this.prompt) {
                this.error = 'Error! Please ask a question!';
                return;
            }
            const chats = [
                ...this.chatHistory,
                { role: 'user', parts: [{ text: this.prompt }] },
            ];
            this.chatHistory = chats
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        history: this.chatHistory,
                        message: this.prompt
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
  
                this.prompt = '';
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
        },
        formatChat(chat) {
            return `<strong>${chat.role}:</strong> ${chat.formattedText}`;
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const chatContainer = this.$refs.scrollableRight;
                chatContainer.scrollTop = chatContainer.scrollHeight;
            });
        },
    },
    mounted() {
        // this.scrollToBottom();
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
.chat-footer {

}
.chat-wrapper {
    // width: 800px;
    max-width: 800px;

}
.chat-body {

}
.jc-c {
    // height: calc(100dvh - 216px);
}
</style>
  