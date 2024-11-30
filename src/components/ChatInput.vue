<template>
    <div class="chat-container bg-surface-2">
        <div v-if="form.image" class="image-preview flex">
            <div class="preview-holder centered">
                <div v-if="uploading" class="img-overlay centered absolute">
                    <spinner :size="28" />
                </div>
                <button v-if="!uploading" @click="deleteImage(form.image)" class="image-uploader absolute jc-c ai-c" :class="!(uploading || deleting) ? 'image-uploader-idle' : 'image-uploader-processing'">
                    <spinner v-if="deleting" :size="18"/>
                    <svg v-else  height="12" viewBox="0 0 13.587 13.587">
                        <path class="invert-fill-color" d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#ffffff"/>
                    </svg>
                </button>
                <img :src="form.image" alt="Upload preview"/>
            </div>
        </div>
        <form @submit.prevent="" action="" class="flex ai-fe">
            <textarea v-model="form.prompt" class="flex" data-name="prompt" rows="1" @input="adjustHeight" @keydown.enter="submitPrompt" ref="textArea" name="prompt" id="prompt_input" placeholder="Enter a prompt here"></textarea>
            <div class="flex gap-8">
                <input class="hide" @change="uploadImage" name="image" id="imageUploadInput" type="file" ref="img">
                <button @click.prevent="uploadClick('imageUploadInput')" data-type="button" class="transparent-button jc-c ai-c">
                    <svg height="18" viewBox="0 0 32.507 31.493">
                        <path d="M-1986,31.493a4,4,0,0,1-4-4v-22a4,4,0,0,1,4-4h15v3h-15a1,1,0,0,0-1,1v22a1,1,0,0,0,1,1h23a1,1,0,0,0,1-1v-14h3v14a4,4,0,0,1-4,4Zm19.564-5.766-16.817-.194a1.857,1.857,0,0,1-.859-.251,1.184,1.184,0,0,1-.393-.666V22.644l5-6.427a1.092,1.092,0,0,1,.58-.224,1.252,1.252,0,0,1,.609.224l6.125,6.979h1.733l5.819-4.128h.141l-.039,5.162a1.669,1.669,0,0,1-.468,1.183,2.31,2.31,0,0,1-1.289.318C-1966.38,25.73-1966.436,25.727-1966.436,25.727ZM-1963.992,10V6.5h-3.5v-3h3.5V0h3V3.5h3.5v3h-3.5V10Z" transform="translate(1990)" fill="#fff"/>
                    </svg>
                </button>
                <button @click.prevent="submitPrompt" :class="{'has-input': computedInput }" class="jc-c ai-c" type="submit" :disabled="!computedInput || uploading">
                    <svg height="17" viewBox="0 0 20.841 20.169">
                        <path class="invert-fill-color" d="M10.129,12.214,3.173,9.432a1.072,1.072,0,0,1-.726-1.144c.022-.955,1.1-1.18,1.1-1.18L18.519,1.64a2.464,2.464,0,0,1,2.249.2c.834.747.29,2.069.29,2.069L15.6,18.03s-.405,1.527-1.546,1.539-1.656-1.68-1.656-1.68l-2.27-5.674,3.926-3.926" transform="translate(-1.446 -0.401)" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import Spinner from './Spinner.vue';
import uploadMixin from '@/mixins/uploadMixin';

export default {
    components: { Spinner },
    name: 'ChatInput',
    mixins: [uploadMixin],
    computed: {
        computedInput() {
            const sanitizedInput = this.form.prompt.trim(); 
            if((sanitizedInput != '' && !this.uploading) || (this.form.image != null && !this.uploading)) {
                return true
            }else {
                return false
            }
        }
    },
    data() {
        return {
            uploading: false,
            deleting: false,
            form: {
                prompt: '',
                image: null,
                fileType: ''
            }

        }
    },
    methods: {
        submitPrompt(e) {
            if (!e.shiftKey) {
                e.preventDefault();
                if(this.computedInput) {
                    this.$emit('submit-prompt', this.form)
                    this.form.prompt = ''
                    if (this.form.image) {
                        this.form.image = null
                        this.clrOldfile('imageUploadInput')
                    }
                    this.$nextTick(() => {
                        this.adjustHeight()
                    })
                }
            }
        },
        adjustHeight() {
            const textArea = this.$refs.textArea;
            textArea.style.height = 'auto';
            textArea.style.height = `${textArea.scrollHeight}px`;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.textArea.focus();
        });
    }

}
</script>

<style lang="scss" scoped>
textarea {
    field-sizing: content;
    resize: none;
    width: 100%;
    background-color: inherit;
    border: none;
    padding:  8px 16px 8px 12px;
    max-height: 200px;
    font-size: 1.1rem;
    line-height: 24px;
}
.chat-container {
    padding: 8px 8px;
    border-radius: 28px;
    &:has(textarea:focus) {
        background-color: var(--main-background-3);
        transition: .1s ease-in background-color;
    }
    &:hover {
        button.image-uploader-idle {
            opacity: 1;
        }
    }
}
form {
    button {
        height: 40px;
        width: 40px;
    }
    button:disabled {
        background-color: var(--button-disabled);
        path {
            stroke: #acacac;
        }
    }
    button.has-input {
        background-color: var(--primary-color);
    }
    
}
.light-theme {
    button:not(:disabled, [type=submit], .image-uploader) {
        path {
            fill: #000000;
        }
    }
    
}
.image-preview  {
    padding: 10px 12px;
}
.mobile {
    button.image-uploader-idle {
        opacity: 1;
    }
}
button.image-uploader-idle {
    opacity: 0;
}
button.image-uploader-processing {
    opacity: 1;
}
.preview-holder {
    // max-height: 200px;
    position: relative;
    height: 100px;
    width: 100px;
    img {
        border-radius: 12px;
        object-fit: cover;
        height: inherit;
        width: inherit;
    }
    button {
        height: 32px;
        width: 32px;
        cursor: pointer;
        inset: -12px -12px auto auto;
        background-color: rgba($color: #000000, $alpha: .4);
        transition: 0.2s ease opacity;
        &:hover {
            background-color: rgba($color: #000000, $alpha: .6);
        }
    }
    .img-overlay {
        border-radius: 12px;
        height: 100px;
        width: 100px;
        background-color: rgba($color: #000000, $alpha: .4);
    }
}
</style>