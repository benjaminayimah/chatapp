<template>
    <div class="flex chat-body-wrapper flex-1 jc-c overflow-y-scroll">
        <div class="chat-wrapper flex-1 centered">
            <div class="w-100 flex flex-column gap-32">
                <div>
                    <div class="fs-205rem fw-600 text-center hello">{{ typedText }}</div>
                    <div :class="{'show-sub': showSub }" class="fs-2rem text-center sub-hello">How can I help you today?</div>
                </div>
                <chat-input />
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
            textToType: "Hello, welcome to Andromeda!",
            typedText: "",
            typingSpeed: 30, // Speed of typing (in milliseconds)
            showSub: false
        }
    },
    methods: {
        typeText() {
            let index = 0;

            const typeInterval = setInterval(() => {
                if (index < this.textToType.length) {
                    this.typedText += this.textToType.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval)
                    this.showSub = true
                }
            }, this.typingSpeed);
        },
    },
    mounted() {
        this.typeText();
    }
}
</script>

<style lang="scss" scoped>
.chat-wrapper {
    max-width: 832px;
    padding: 0 16px;
}
.hello {
  background: linear-gradient(90deg, #ef2d2d, #4848ff); /* Red to blue gradient */
  -webkit-background-clip: text; /* Makes the background clip to the text */
  color: transparent; /* Make the text color transparent to show the gradient */
}
.sub-hello {
    color: #6d717e;
    line-height: 44px;
    overflow: hidden;
    transition: 1s all;
    height: 0;
    opacity: 0;
}
.show-sub {
    height: 44px;
    opacity: 1;
}
</style>