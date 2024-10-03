<template>
  <div class="home">
    <h2>Gemini-Pro</h2>
    <div>
      <button @click.prevent="feelingLucky">Feeling lucky</button>
      <input v-model="prompt" name="question-input" type="text" placeholder="Ask me anything...">
      <button @click.prevent="sendPost">Ask me</button>
    </div>
    <span v-if="error">{{ error }}</span>
    <div>
      <div v-for="(chat, index) in formattedResult" :key="index">
        <div v-html="formatChat(chat)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default {
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
      typingEffectIndex: 0,
      currentTypingText: ''
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
  // methods: {
  //   feelingLucky() {
  //     const randomQuestion = this.feelingLuckyOptions[Math.floor(Math.random() * this.feelingLuckyOptions.length)];
  //     this.prompt = randomQuestion;
  //   },
  //   async sendPost() {
  //     this.error = null;
  //     if (!this.prompt) {
  //       this.error = 'Error! Please ask a question!';
  //       return;
  //     }

  //     // Add user prompt to chat history
  //     const userChat = { role: 'user', parts: [{ text: this.prompt }] };
  //     this.chatHistory.push(userChat);

  //     // Reset typing effect
  //     this.typingEffectIndex = 0;
  //     this.currentTypingText = '';

  //     try {
  //       const options = {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           history: this.chatHistory,
  //           message: this.prompt
  //         }),
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       };
  //       const response = await fetch('http://localhost:8001/gemini-pro', options);
  //       const reader = response.body.getReader();
  //       let text = '';
  //       const decoder = new TextDecoder();

  //       while (true) {
  //         const { value, done } = await reader.read();
  //         if (done) break;
  //         text += decoder.decode(value, { stream: true });
  //         this.startTypingEffect(text);
  //       }

  //       this.prompt = '';
  //       localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
  //     } catch (error) {
  //       console.error(error);
  //       this.error = 'Something went wrong!';
  //     }
  //   },
  //   startTypingEffect(text) {
  //     const modelChatIndex = this.chatHistory.findIndex(chat => chat.role === 'model');
  //     if (modelChatIndex === -1) {
  //       this.chatHistory.push({ role: 'model', parts: [{ text: '' }] });
  //     }

  //     const interval = 50; // typing speed in ms

  //     const type = () => {
  //       if (this.typingEffectIndex < text.length) {
  //         this.currentTypingText += text.charAt(this.typingEffectIndex);
  //         this.typingEffectIndex++;
  //         this.updateChat(this.currentTypingText);
  //         setTimeout(type, interval);
  //       } else {
  //         this.updateChat(text);
  //       }
  //     };

  //     type();
  //   },
  //   updateChat(text) {
  //     const modelChatIndex = this.chatHistory.findIndex(chat => chat.role === 'model');
  //     if (modelChatIndex !== -1) {
  //       this.chatHistory[modelChatIndex].parts[0].text = text;
  //     } else {
  //       this.chatHistory.push({ role: 'model', parts: [{ text }] });
  //     }
  //   },
  //   formatChat(chat) {
  //     return `<strong>${chat.role}:</strong> ${chat.formattedText}`;
  //   }
  // },
  mounted() {
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
</style>
