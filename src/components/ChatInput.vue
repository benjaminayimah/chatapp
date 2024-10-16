<template>
    <div class="chat-container bg-surface-2">
        <div v-if="uploadedImageUrl" class="image-preview flex">
            <div class="preview-holder centered">
                <div v-if="uploading" class="img-overlay centered absolute">
                    <spinner :size="28" :color="'#fff'" />
                </div>
                <button v-if="!uploading" @click="deleteImage(uploadedImageUrl)" class="image-uploader absolute" :class="!(uploading || deleting) ? 'image-uploader-idle' : 'image-uploader-processing'">
                    <spinner v-if="deleting" :size="18" :color="'#fff'" />
                    <svg v-else xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 13.587 13.587">
                        <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#ffffff"/>
                    </svg>
                </button>
                <img :src="uploadedImageUrl" alt="Upload preview"/>
            </div>
        </div>
        <form @submit.prevent="" action="" class="flex ai-fe">
            <textarea class="flex" rows="1" @input="adjustHeight" @keydown.enter="submitPrompt" v-model="prompt" ref="textArea" name="prompt" id="prompt_input" placeholder="Enter a prompt here"></textarea>
            <!-- <div class="div-textarea" role="textbox" contenteditable>
                <p :class="{'placeholder': !computedInput}"></p>
            </div> -->
            <div class="flex gap-8">
                <input class="hide" @change="uploadImage" name="image" id="imageUploadInput" type="file" ref="img"> 
                <button @click.prevent="uploadClick('imageUploadInput')" data-type="button" class="transparent-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 0 32.932 29.782">
                        <path d="M-1988.072,29.782A1.93,1.93,0,0,1-1990,27.854V4.718a1.93,1.93,0,0,1,1.928-1.928h16.5V4.718h-16.493l0,0V27.851l0,0h26.985l0,0V14.493h1.928V27.854a1.93,1.93,0,0,1-1.928,1.928Zm24.5-4.684-22.211-.256v-3.2l5.567-7.151a1.213,1.213,0,0,1,.645-.25,1.391,1.391,0,0,1,.678.25l6.816,7.765h1.929l6.475-4.594h.157l-.055,7.434Zm.358-15.1V6.151h-3.85V3.85h3.85V0h2.3V3.85h3.849v2.3h-3.849V10Z" transform="translate(1990)" fill="#fff"/>
                    </svg>
                </button>
                <button @click.prevent="submitPrompt" :class="{'has-input': computedInput }" type="submit" :disabled="!computedInput || uploading">
                    <svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 0 20.841 20.169">
                        <path d="M10.129,12.214,3.173,9.432a1.072,1.072,0,0,1-.726-1.144c.022-.955,1.1-1.18,1.1-1.18L18.519,1.64a2.464,2.464,0,0,1,2.249.2c.834.747.29,2.069.29,2.069L15.6,18.03s-.405,1.527-1.546,1.539-1.656-1.68-1.656-1.68l-2.27-5.674,3.926-3.926" transform="translate(-1.446 -0.401)" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import Spinner from './Spinner.vue';
export default {
    components: { Spinner },
    name: 'ChatInput',
    computed: {
        computedInput() {
            const sanitizedInput = this.prompt.trim(); 
            if((sanitizedInput != '' && !this.uploading) || (this.uploadedImageUrl != '' && !this.uploading)) {
                return true
            }else {
                return false
            }
        }
    },
    data() {
        return {
            prompt: '',
            uploading: false,
            uploadedImageUrl: '',
            deleting: false,
            file: ''
        }
    },
    methods: {
        submitPrompt(e) {
            if (!e.shiftKey) {
                e.preventDefault();
                if(this.computedInput) {
                    this.$emit('submit-prompt', { prompt: this.prompt, image: this.uploadedImageUrl, file: this.file})
                    this.prompt = ''
                    if (this.uploadedImageUrl) {
                        this.uploadedImageUrl = ''
                        this.clrOldfile('imageUploadInput')
                        localStorage.removeItem('image')
                    }
                    this.$nextTick(() => {
                        this.adjustHeight()
                    })
                }
            }
        },
        uploadClick(id) {
            document.querySelector(`#${id}`).click()
        },
        async uploadImage() {
            const file = this.$refs.img.files[0];
            
            if(file) {
                if (!(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg")) {
                    console.error("Unsupported file. The file type must be \"png, jpg or jpeg\"");
                }else {
                    this.uploadedImageUrl = URL.createObjectURL(file);
                    if (this.checksize(file.size)) {
                        this.uploading = true

                        const formData = new FormData();
                        formData.append("image", file);
                        try {
                            const response = await fetch("http://localhost:8001/upload-image", {
                                method: "POST",
                                body: formData
                            })
                            const data = await response.json()
                            if (data.imageUrl) {
                                this.uploading = false
                                this.uploadedImageUrl = data.imageUrl
                                localStorage.setItem('image', data.imageUrl)
                                this.file = file

                                this.$nextTick(() => {
                                    this.$refs.textArea.focus();
                                });
                            }
                        } catch (error) {
                            console.error("Error uploading the image:", error);
                            this.uploading = false
                        }
                    }else {
                        console.error('This file is too large. The file size must be less than 800KB');
                    }
                }
            }
        },
        checksize(size) {
            return size > 800000 ? false : true
        },
        async deleteImage(image) {
            // Extract the filename from the image URL
            this.deleting = true
            const filename = image.split('/').pop();

            try {
                const response = await fetch(`http://localhost:8001/delete-image/${filename}`, {
                    method: 'DELETE',
                });

                const data = await response.json()
                if (response.status === 200) {
                    this.uploadedImageUrl = ''
                    localStorage.removeItem('image')
                    this.deleting = false
                    this.clrOldfile('imageUploadInput')
                } else {
                    console.log(data.message)
                }
            } catch (error) {
                this.deleting = false
                console.error('Error deleting the image:', error);
            }
        },
        clrOldfile(id) {
            document.querySelector(`#${id}`).value = null
        },
        adjustHeight() {
            this.$refs.textArea.style.height = '40px'
            this.$refs.textArea.style.height = this.$refs.textArea.scrollHeight + 'px'
        }
    },
    mounted() {
        this.adjustHeight()
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
.div-textarea {
    padding:  0 16px 0 12px;
    border: none;
    p {
        margin: 0;
    }

    p.placeholder {
        &::before {
            content: 'Enter a prompt here';
        }
    }
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