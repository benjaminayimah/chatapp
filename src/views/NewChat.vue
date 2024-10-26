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
                <div class="flex gap-8 jc-c flex-wrap">
                    <button class="button-outline gap-4">
                        <svg height="20" viewBox="0 0 24 24" fill="none" class="icon-md" style="color: rgb(108, 113, 255);"><path class="invert-fill-color" fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5H6ZM7.29289 9.29289C7.68342 8.90237 8.31658 8.90237 8.70711 9.29289L10.7071 11.2929C11.0976 11.6834 11.0976 12.3166 10.7071 12.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L8.58579 12L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289ZM12 14C12 13.4477 12.4477 13 13 13H16C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15H13C12.4477 15 12 14.5523 12 14Z" fill="currentColor"></path></svg>
                        Help me farm
                    </button>
                    <button class="button-outline gap-4">
                        <svg height="20" viewBox="0 0 24 24" fill="none" class="icon-md" style="color: rgb(108, 113, 255);"><path class="invert-fill-color" fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5H6ZM7.29289 9.29289C7.68342 8.90237 8.31658 8.90237 8.70711 9.29289L10.7071 11.2929C11.0976 11.6834 11.0976 12.3166 10.7071 12.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L8.58579 12L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289ZM12 14C12 13.4477 12.4477 13 13 13H16C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15H13C12.4477 15 12 14.5523 12 14Z" fill="currentColor"></path></svg>
                        Identify objects
                    </button>
                    <button class="button-outline gap-4">
                        <svg height="20" viewBox="0 0 24 24" fill="none" class="icon-md" style="color: rgb(108, 113, 255);"><path class="invert-fill-color" fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5H6ZM7.29289 9.29289C7.68342 8.90237 8.31658 8.90237 8.70711 9.29289L10.7071 11.2929C11.0976 11.6834 11.0976 12.3166 10.7071 12.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L8.58579 12L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289ZM12 14C12 13.4477 12.4477 13 13 13H16C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15H13C12.4477 15 12 14.5523 12 14Z" fill="currentColor"></path></svg>
                        Code
                    </button>
                    <button class="button-outline gap-4">
                        <svg height="20" viewBox="0 0 24 24" fill="none" class="icon-md" style="color: rgb(108, 113, 255);"><path class="invert-fill-color" fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5H6ZM7.29289 9.29289C7.68342 8.90237 8.31658 8.90237 8.70711 9.29289L10.7071 11.2929C11.0976 11.6834 11.0976 12.3166 10.7071 12.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L8.58579 12L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289ZM12 14C12 13.4477 12.4477 13 13 13H16C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15H13C12.4477 15 12 14.5523 12 14Z" fill="currentColor"></path></svg>
                        Analyze data
                    </button>
                    <button class="button-outline gap-4">
                        More
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ChatInput from '@/components/ChatInput.vue'
import randomIdGenMixin from '@/mixins/randomIdGenMixin';
export default {
    name: 'NewChat',
    components: { ChatInput },
    mixins: [randomIdGenMixin],
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
        }
    },
    mounted() {
        this.blinkCursor()
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
button.button-outline {
    height: 45px;
    padding: 0 16px;
    font-size: .95rem;
    color: var(--input-placeholder);
}
.mobile {
    .gap-32 {
        gap: 24px;
    }
    button.button-outline {
        height: 38px;
        padding: 0 10px;
        font-size: 0.85rem;
    }
}

</style>