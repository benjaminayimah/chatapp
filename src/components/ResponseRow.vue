<template>
    <div class="response-container" :class="{'has-chat' : chat.role === 'user' && chat.parts[0].text}">
        <div v-if="chat.role === 'user'" class="flex flex-column gap-4 ai-fe">
            <div class="prompt-image-container flex">
                <img v-if="computedImage" :src="computedImage.image" @click="$emit('preview-image', computedImage.image)" alt="Uploaded image" height="200" loading="lazy">
            </div>
            <div class="flex w-100 res-block" :class="`${chat.role}-response`">
                <div class="res-wrapper bg-transition">{{ chat.parts[0].text }}</div>
            </div>
        </div>
        <div v-else :id="`model_res_container_${index}`" class="flex res-block" :class="`${chat.role}-response`">
            <div class="centered model-avatar">
                <svg width="28" height="28" viewBox="0 0 28 28">
                    <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stop-color="#0fa3eb"/>
                    <stop offset="1" stop-color="#ca3de3"/>
                    </linearGradient>
                    <path class="invert-fill-color" d="M14,28a13.448,13.448,0,0,0-1.12-5.46A13.9,13.9,0,0,0,9.9,18.095,13.9,13.9,0,0,0,5.46,15.12,13.449,13.449,0,0,0,0,14a13.823,13.823,0,0,0,5.46-1.085A14.385,14.385,0,0,0,9.9,9.9,13.9,13.9,0,0,0,12.88,5.46,13.449,13.449,0,0,0,14,0a13.823,13.823,0,0,0,1.085,5.46A14.385,14.385,0,0,0,18.095,9.9a14.386,14.386,0,0,0,4.445,3.01A13.823,13.823,0,0,0,28,14a13.448,13.448,0,0,0-5.46,1.12,13.9,13.9,0,0,0-4.445,2.975,14.386,14.386,0,0,0-3.01,4.445A13.823,13.823,0,0,0,14,28Z" fill="url(#linear-gradient)"/>
                </svg>
            </div>
            <div class="flex flex-column gap-24">
                <p v-if="(error && error.index === index)"><strong>Something went wrong! </strong>{{ error.message }}</p>
                <div v-if="processing && processing.index === index" class="chat-loader"></div>
                <div v-html="formatChat(chat)" :id="`res_wrapper_${index}`" class="res-wrapper"></div>
                <div v-if="!computedCurrentPrompt && chat.parts[0].text" :id="`response_footer_${index}`" class="flex gap-4 res-footer">
                    <div class="cluster-button-wrapper flex ai-c ov-hidden" :class="computedIsSpeaking ? 'is-speaking' : 'not-speaking'">
                        <button v-if="!computedIsSpeaking || computedIsPaused" 
                                @click="speakText()" 
                                class="transparent-button res-footer-btn jc-c ai-c" 
                                aria-label="Read aloud">
                            <svg v-if="!computedIsSpeaking && !computedIsPaused" height="16.495" viewBox="0 0 16.91 16.495">
                                <path d="M9.6,4.558a.43.43,0,0,0-.72-.317l-3,2.747a.86.86,0,0,1-.581.226H3.579a.86.86,0,0,0-.86.86v5.157a.86.86,0,0,0,.86.86H5.3a.859.859,0,0,1,.581.226l3,2.747a.43.43,0,0,0,.72-.317ZM7.714,2.974a2.149,2.149,0,0,1,3.6,1.584V16.747a2.149,2.149,0,0,1-3.6,1.584L4.963,15.81H3.579A2.579,2.579,0,0,1,1,13.231V8.074A2.579,2.579,0,0,1,3.579,5.5H4.963ZM15.6,5.8a.859.859,0,0,1,1.165.345,9.469,9.469,0,0,1,.051,8.915.86.86,0,1,1-1.52-.8,7.75,7.75,0,0,0-.042-7.292A.86.86,0,0,1,15.6,5.8ZM12.721,7.129a.859.859,0,0,1,1.2.171,5.589,5.589,0,0,1,.205,6.413.86.86,0,1,1-1.438-.943,3.87,3.87,0,0,0-.142-4.438A.86.86,0,0,1,12.721,7.129Z" transform="translate(-1 -2.405)" fill-rule="evenodd"/>
                            </svg>
                            <svg v-else height="17" viewBox="0 0 14 14">
                                <path d="M7.563.563a7,7,0,1,0,7,7A7,7,0,0,0,7.563.563ZM10.829,8.24,5.861,11.091A.679.679,0,0,1,4.853,10.5V4.627a.679.679,0,0,1,1.008-.593l4.968,3.02A.68.68,0,0,1,10.829,8.24Z" transform="translate(-0.563 -0.563)" fill="#fff"/>
                            </svg>
                        </button>
                        <button v-if="computedIsSpeaking && !computedIsPaused" @click="pauseSpeech()" class="transparent-button jc-c ai-c res-footer-btn" aria-label="Read aloud">
                            <svg height="17" viewBox="0 0 14 14">
                                <path d="M7.563.563a7,7,0,1,0,7,7A7,7,0,0,0,7.563.563ZM7.111,9.821a.453.453,0,0,1-.452.452H5.3a.453.453,0,0,1-.452-.452V5.3A.453.453,0,0,1,5.3,4.853H6.659a.453.453,0,0,1,.452.452Zm3.161,0a.453.453,0,0,1-.452.452H8.466a.453.453,0,0,1-.452-.452V5.3a.453.453,0,0,1,.452-.452H9.821a.453.453,0,0,1,.452.452Z" transform="translate(-0.563 -0.563)"/>
                            </svg>
                        </button>
                        <button v-if="computedIsSpeaking || computedIsPaused" @click="stopSpeech()" class="transparent-button jc-c ai-c res-footer-btn" aria-label="Read aloud">
                            <svg height="17" viewBox="0 0 14 14">
                                <path d="M-1983,14a7.008,7.008,0,0,1-7-7,7.008,7.008,0,0,1,7-7,7.008,7.008,0,0,1,7,7A7.008,7.008,0,0,1-1983,14Zm-2.5-10a.5.5,0,0,0-.5.5v5a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5v-5a.5.5,0,0,0-.5-.5Z" transform="translate(1990)"/>
                            </svg>
                        </button>
                    </div>
                    <button @click="copyResponse()" class="transparent-button jc-c ai-c res-footer-btn" aria-label="Copy" :disabled="isCopying">
                        <svg v-if="!isCopying" height="17" viewBox="0 0 17 17">
                            <path d="M-3078.8-679.218a2.394,2.394,0,0,1-2.392-2.391v-7.479a2.394,2.394,0,0,1,2.392-2.391h7.478a2.393,2.393,0,0,1,2.391,2.391v7.479a2.393,2.393,0,0,1-2.391,2.391Zm-.933-9.869v7.479a.934.934,0,0,0,.933.933h7.478a.934.934,0,0,0,.933-.933v-7.479a.934.934,0,0,0-.933-.933h-7.478A.934.934,0,0,0-3079.732-689.088Zm-3.474,7.3a2.727,2.727,0,0,1-2.725-2.724v-8.978a2.706,2.706,0,0,1,.8-1.926,2.706,2.706,0,0,1,1.926-.8h8.978a2.727,2.727,0,0,1,2.724,2.724v1a.729.729,0,0,1-.729.729.73.73,0,0,1-.729-.729v-1a1.267,1.267,0,0,0-1.266-1.266h-8.978a1.257,1.257,0,0,0-.895.371,1.256,1.256,0,0,0-.372.9v8.978a1.267,1.267,0,0,0,1.266,1.265h1a.729.729,0,0,1,.729.73.729.729,0,0,1-.729.729Z" transform="translate(3085.931 696.218)"/>
                        </svg>
                        <svg v-else height="11" viewBox="0 0 13.314 12.363">
                            <path d="M17.4,5.665a.951.951,0,0,1,.25,1.321L10.516,17.448a.951.951,0,0,1-1.458.137l-4.28-4.28A.951.951,0,0,1,6.123,11.96l3.468,3.468,6.486-9.513A.951.951,0,0,1,17.4,5.665Z" transform="translate(-4.5 -5.5)" fill-rule="evenodd"/>
                        </svg>
                    </button>
                    <button @click="shareResponse" class="transparent-button res-footer-btn ai-c jc-c" aria-label="Share">
                        <svg height="17" viewBox="0 0 14.695 17">
                            <path d="M-3108.6-693.224a2.673,2.673,0,0,1-2.67-2.67,2.683,2.683,0,0,1,.075-.632l-5.614-2.959a2.651,2.651,0,0,1-1.146.258,2.674,2.674,0,0,1-2.671-2.671,2.673,2.673,0,0,1,2.671-2.67,2.676,2.676,0,0,1,1.68.6l4.986-2.91a.786.786,0,0,1,.094-.047,2.667,2.667,0,0,1-.074-.625,2.672,2.672,0,0,1,2.669-2.669,2.672,2.672,0,0,1,2.669,2.669,2.672,2.672,0,0,1-2.669,2.669,2.658,2.658,0,0,1-1.822-.721.807.807,0,0,1-.087.059l-4.895,2.857a2.681,2.681,0,0,1,.119.792,2.673,2.673,0,0,1-.335,1.292l5.21,2.747a2.652,2.652,0,0,1,1.809-.7,2.673,2.673,0,0,1,2.67,2.67A2.673,2.673,0,0,1-3108.6-693.224Zm-.961-3.251a1.117,1.117,0,0,0-.162.581,1.125,1.125,0,0,0,1.123,1.123,1.125,1.125,0,0,0,1.123-1.123,1.125,1.125,0,0,0-1.123-1.123,1.118,1.118,0,0,0-.956.533Zm-8.393-6.547a1.125,1.125,0,0,0-1.124,1.123,1.126,1.126,0,0,0,1.124,1.124,1.112,1.112,0,0,0,.655-.211l.021-.015a1.115,1.115,0,0,0,.448-.9,1.115,1.115,0,0,0-.208-.651h0A1.127,1.127,0,0,0-3117.953-703.022Zm9.355-5.656a1.124,1.124,0,0,0-1.122,1.122,1.124,1.124,0,0,0,1.122,1.122,1.124,1.124,0,0,0,1.123-1.122A1.124,1.124,0,0,0-3108.6-708.678Z" transform="translate(3120.624 710.224)"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ResponseRow',
    props: {
        chat: Object,
        index: Number,
        newIndex: Number,
        resEnded: Boolean,
        error: Object,
        processing: Object,
        id: String,
        images: Array
    },
    computed: {
        ...mapState({
            indexx: (state) => state.playback.index,
            isSpeaking: (state) => state.playback.isSpeaking,
            isPaused: (state) => state.playback.isPaused,

        }),
        computedCurrentPrompt() {
            return !!(this.index === this.newIndex && !this.resEnded)
        },
        computedImage() {
            return this.chat.role === 'user' ? this.images.find(image => image.index === this.index) : ''
        },
        computedIsSpeaking() {
            return this.index === this.indexx ? this.isSpeaking : ''
        },
        computedIsPaused() {
            return this.index === this.indexx ? this.isPaused : ''
        },
        computedStatus() {
            return this.computedIsSpeaking ? true : false
        }
    },
    data() {
        return {
            isCopying: false,
            utterance: null,
        }
    },
    methods: {
        formatChat(chat) {
            return chat.formattedText
        },
        copyResponse() {
            const text = this.chat.parts[0].text 
            navigator.clipboard.writeText(text)
            .then(() => {
                if (!this.isCopying) {
                    this.isCopying = true
                    this.$store.dispatch('showAlert', { type: 'copied', autoDismiss: true, message: 'Copied to clipboard' })
                    setTimeout(() => {
                        this.isCopying = false
                    }, 4000);
                }
            })
            .catch(err => {
                console.error("Failed to copy text: ", err);
            });
        },
        speakText() {
            const oldIndex = this.indexx
            const newIndex = this.index
            const text = this.removeEmojis(this.chat.parts[0].text)

            if (oldIndex && oldIndex === newIndex) {

                this.resumeSpeech()

            } else {
                
                this.stopSpeech()
                this.$store.commit('storeIndex', newIndex)
                
                if ('speechSynthesis' in window) {
                    this.utterance = new SpeechSynthesisUtterance(text);
                    // this.utterance.voice = window.speechSynthesis.getVoices()[0]; // Select a voice
                    this.utterance.rate = 0.9; // 0.1 to 10, default is 1
                    this.utterance.onend = () => {
                        this.stopSpeech()
                    }
                    window.speechSynthesis.speak(this.utterance);
                    this.$store.commit('storeSpeaking', true)

                }else {
                        console.warn('Text-to-Speech is not supported in this browser.');
                }
            }
        },
        pauseSpeech() {
            if (speechSynthesis.speaking && !speechSynthesis.paused) {
                speechSynthesis.pause();
                this.$store.commit('storePaused', true)
            }
        },
        resumeSpeech() {
            if (speechSynthesis.paused) {
                speechSynthesis.resume();
                this.$store.commit('storePaused', false)
            }
        },
        stopSpeech() {
            this.justStop()
            this.$store.commit('storePaused', false)
            this.$store.commit('storeSpeaking', false)
            this.utterance = null
            this.$store.commit('storeIndex', null)
        },
        justStop() {
            window.speechSynthesis.cancel()
        },
        removeEmojis(text) {
            return text.replace(/([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|\u{00A9}|\u{00AE}|\u{200D}|\u{203C}|\u{2049}|\u{2122}|\u{2139}|\u{2194}-\u{21AA}|\u{231A}-\u{23F3}|\u{25AA}-\u{27BF}|\u{2934}-\u{2B55}|\u{3030}|\u{303D}|\u{3297}|\u{3299})/gu, '');
        },
        shareResponse() {
            if (navigator.share) {
            navigator.share({
                title: 'Chat',
                text: this.chat.parts[0].text,
                url: process.env.VUE_APP_BASE_URL + this.$route.fullPath,
            })
            .then(() => console.log('Shared successfully!'))
            .catch((error) => console.error('Sharing failed:', error));
            } else {
                alert('Sharing is not supported on your device.');
            }
        },
    },
    mounted() {
        this.stopSpeech()
    }
}
</script>

<style lang="scss" scoped>
.not-speaking {
    width: 44px;
}
.is-speaking {
    background-color: var(--main-background-2);
    width: 84px;
}

</style>