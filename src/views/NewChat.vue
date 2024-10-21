<template>
    <div class="flex chat-body-wrapper flex-1 jc-c overflow-y-scroll">
        <div class="chat-wrapper flex-1 centered">
            <div class="w-100 flex flex-column gap-32">
                <div>
                    <div class="fs-205rem fw-600 text-center hello">
                        <span>{{ typedText }}</span>
                        <span class="cursor fw-500" v-if="showCursor">|</span>
                    </div>
                </div>
                <chat-input @submit-prompt="submitPrompt" />
            </div>
        </div>
    </div>
</template>

<script>
import ChatInput from '@/components/ChatInput.vue'
export default {
    components: { ChatInput },
    name: 'NewChat',
    data() {
        return {
            textToType: "Hello, welcome to Xirion!",
            typedText: "",
            typingSpeed: 30,
            showCursor: true,
            blinkCount: 0,
            maxBlinks: 2,
            blinkInterval: 400,
        }
    },
    methods: {
        blinkCursor() {
            const blinkInterval = setInterval(() => {
                this.showCursor = !this.showCursor
                this.blinkCount++;
                
                if (this.blinkCount >= this.maxBlinks * 2) {
                    clearInterval(blinkInterval);
                    this.typeText();
                }
            }, this.blinkInterval);
        },
        typeText() {
            let index = 0;

            const typeInterval = setInterval(() => {
                if (index < this.textToType.length) {
                    this.typedText += this.textToType.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval)
                    this.showCursor = false;
                }
            }, this.typingSpeed);
        },
        submitPrompt(e) {
            const id = this.generateUniqueId(16)
            const newChat = { id: id, prompt: e.prompt, fileType: e.fileType, image: e.image}
            
            localStorage.setItem(id, JSON.stringify([]))
            localStorage.setItem(id + '_images', JSON.stringify([]))
            localStorage.setItem('newChat', JSON.stringify(newChat))

            this.$router.push({ name: 'ChatView', params: { id: id }})
        },
        generateUniqueId(length) {
            const characters = '0123456789abcdef';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters[Math.floor(Math.random() * characters.length)];
            }
            return result;
        },
    },
    mounted() {
        this.blinkCursor();
        const recents = JSON.parse(localStorage.getItem('recents'))
        !recents ? localStorage.setItem('recents', JSON.stringify([])) : ''
    }
}
</script>

<style lang="scss" scoped>
.chat-wrapper {
    max-width: 832px;
    padding: 0 16px;
}
.hello {
  background: linear-gradient(90deg, #ef2d2d, #4848ff);
  -webkit-background-clip: text;
  color: transparent;
  line-height: var(--hello-text-height);
  height: var(--hello-text-height);
}
.cursor {
    color: var(--main-font-color-primary);
}
</style>