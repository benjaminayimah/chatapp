<template>
    <div class="relative centered avatar-wrapper skeleton-surface" :class="{ 'has-pic' : image && !hasError }">
        <img v-if="image && !hasError"
            class="avatar"
            :class="!isLoaded ? 'pulse' : 'loaded'"
            :src="image"
            :alt="computedInitial"
            loading="lazy"
            @load="handleLoad"
            @error="handleError"
        >
        <div v-else class="centered avatar no-avatar">
            <strong>{{ computedInitial }}</strong>
        </div>
        <button @click.prevent="handleButtonClick" v-if="upload" class="absolute pd-0 centered" :disabled="deleting || uploading">
            <svg v-if="!image || uploading" height="14" viewBox="0 0 36 30">
                <path d="M-2941.92-626.812a4.505,4.505,0,0,1-4.5-4.5v-16.5a4.505,4.505,0,0,1,4.5-4.5h5.2l2.554-3.832a1.5,1.5,0,0,1,1.248-.668h9a1.5,1.5,0,0,1,1.248.668l2.554,3.832h5.2a4.5,4.5,0,0,1,4.5,4.5v16.5a4.505,4.505,0,0,1-4.5,4.5Zm-1.5-21v16.5a1.5,1.5,0,0,0,1.5,1.5h27a1.5,1.5,0,0,0,1.5-1.5v-16.5a1.5,1.5,0,0,0-1.5-1.5h-6a1.5,1.5,0,0,1-1.247-.668l-2.555-3.832h-7.394l-2.554,3.832a1.5,1.5,0,0,1-1.248.668h-6A1.5,1.5,0,0,0-2943.42-647.812Zm7.5,7.5a7.508,7.508,0,0,1,7.5-7.5,7.508,7.508,0,0,1,7.5,7.5,7.508,7.508,0,0,1-7.5,7.5A7.508,7.508,0,0,1-2935.92-640.312Zm3,0a4.505,4.505,0,0,0,4.5,4.5,4.505,4.505,0,0,0,4.5-4.5,4.5,4.5,0,0,0-4.5-4.5A4.505,4.505,0,0,0-2932.92-640.312Z" transform="translate(2946.42 656.812)"/>
            </svg>
            <svg v-if="image && !uploading" height="16" viewBox="0 0 15.3 17">
                <path class="invert-fill-color" d="M9.422,3.7a.85.85,0,0,0-.823.638l-.249.97h4.608l-.249-.97a.85.85,0,0,0-.823-.638Zm5.291,1.608-.358-1.393A2.55,2.55,0,0,0,11.885,2H9.422a2.55,2.55,0,0,0-2.47,1.915L6.595,5.308H3.85a.85.85,0,1,0,0,1.7h.086L4.968,16.72A2.55,2.55,0,0,0,7.5,19H13.8a2.55,2.55,0,0,0,2.536-2.28l1.032-9.712h.086a.85.85,0,1,0,0-1.7Zm.942,1.7H5.645L6.659,16.54a.85.85,0,0,0,.845.76H13.8a.85.85,0,0,0,.845-.76ZM8.95,8.8a.85.85,0,0,1,.85.85V13.9a.85.85,0,1,1-1.7,0V9.65A.85.85,0,0,1,8.95,8.8Zm3.4,0a.85.85,0,0,1,.85.85V13.9a.85.85,0,1,1-1.7,0V9.65A.85.85,0,0,1,12.35,8.8Z" transform="translate(-3 -2)" fill-rule="evenodd" fill="#ed4e4e"/>
            </svg>
        </button>
        <div v-if="upload && (uploading || deleting)" class="img-overlay centered absolute">
            <spinner :size="28" />
        </div>
    </div>
</template>

<script>
import userMixin from '@/mixins/userMixin';
import Spinner from './Spinner.vue';

export default {
    components: { Spinner },
    name: 'ProfileAvatar',
    mixins: [userMixin],
    props: {
        image: String,
        height: Number,
        width: Number,
        color: String,
        name: String,
        uploading: Boolean,
        deleting: Boolean,
        upload: {
            type: Boolean,
            default: false
        },
        fontSize: {
            type: Number,
            default: 1
        },
        radius: {
            type: Number,
            default: 50
        }
    },
    computed: {
        computedFontSize() {
            return `${this.fontSize}rem`
        },
        computedRadius() {
            return `${this.radius}px`
        },
        computedWidth() {
            return `${this.width}px`
        },
        computedHeight() {
            return `${this.height}px`
        }
        
    },
    data() {
        return {
            hasError: false,
            isLoaded: false
        }
    },
    methods: {
        handleButtonClick() {
            if (!this.image) {
                this.$emit('upload-click','imageUploadInput')
            } else {
                this.$emit('delete-image', this.image)
            }
        },
        handleLoad() {
            this.isLoaded = true;
        },
        handleError() {
            this.hasError = true
        }
    }
}
</script>

<style lang="scss" scoped>
.avatar-wrapper {
    height: v-bind(computedHeight);
    width: v-bind(computedWidth);
    border-radius: v-bind(computedRadius);
    z-index: 1;

    &:has(.loaded) {
        img {
            opacity: 1;
        }
    }
    &:has(.pulse) {
        animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite;
    }
}
.avatar {
    height: inherit;
    width: inherit;
    color: #fff;
    border-radius: inherit;
}
.no-avatar {
    font-size: v-bind(computedFontSize);
    background: linear-gradient(300deg, var(--main-background-primary) 0, v-bind(computedColor) 100%);
    animation: fadeIn .4s;
}

button {
    inset: auto -4px -4px auto;
    background-color: var(--main-background-3);
    height: 35px;
    width: 35px;
    border: 2px solid var(--main-background-primary);
    z-index: 2;
}
img {
    object-fit: cover;
    opacity: 0;
    transition: .4s all;
}

.img-overlay {
    height: inherit;
    width: inherit;
    inset: 0;
    background-color: rgba($color: #000000, $alpha: .4);
    border-radius: inherit;
}

</style>