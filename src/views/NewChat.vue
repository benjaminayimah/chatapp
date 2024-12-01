<template>
    <div class="flex flex-1 jc-c chat-container">
        <div class="main-wrapper flex-1 centered">
            <div class="w-100 flex flex-column gap-32">
                <div>
                    <div class="text-center fs-205 hello">
                        <span class="text fw-600">{{ typedText }}</span>
                        <span class="cursor fw-100" v-if="showCursor">|</span>
                    </div>
                </div>
                <chat-input @submit-prompt="submitPrompt" />
                <div class="use-cases">
                    <div class="flex gap-8 jc-c flex-wrap">
                        <use-case-button v-for="(useCase, index) in useCases" 
                            :key="index"
                            :useCase="useCase"
                        />
                        <button class="button-outline gap-4 ai-c">
                            More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ChatInput from '@/components/ChatInput.vue'
import randomIdGenMixin from '@/mixins/randomIdGenMixin';
import UseCaseButton from '@/components/UseCaseButton.vue';
export default {
    name: 'NewChat',
    components: { ChatInput, UseCaseButton },
    mixins: [randomIdGenMixin],
    data() {
        return {
            textToType: "Hello, welcome to artemis ai!",
            typedText: "",
            typingSpeed: 30,
            showCursor: true,
            blinkCount: 0,
            maxBlinks: 2,
            blinkInterval: 400,
            useCases: [
                { name: 'Help me farm', prompt: ''},
                { name: 'Identify objects', prompt: ''},
                { name: 'Code', prompt: ''},
                { name: 'Analyze data', prompt: ''}
            ]
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
            const newChat = { id: id, prompt: e.prompt, fileType: e.fileType, image: e.image }

            this.$store.commit('setNewChat', newChat)
            
            localStorage.setItem(id, JSON.stringify([]))
            localStorage.setItem(id + '_images', JSON.stringify([]))

            this.$router.push({ name: 'ChatView', params: { id: id }})
        }
    },
    mounted() {
        this.blinkCursor()
    }
}
</script>

<style lang="scss" scoped>
.main-wrapper {
    max-width: 832px;
    padding: 0 16px;
}
.hello {
  line-height: var(--hello-text-height);
  height: var(--hello-text-height);
}
.text {
    background: linear-gradient(120deg,  #0085ff,#BA62FC,#F2416B, #F55600 );
  -webkit-background-clip: text;
  color: transparent;
}
.cursor {
    color: var(--main-font-color-primary);
}

.mobile {
    .gap-32 {
        gap: 24px;
    }
}

.chat-container {
    min-height: calc(100% - var(--nav-height));
}
</style>