<template>
    <div class="chat-container bg-surface-2">
        <form  @submit.prevent="" action="" class="flex ai-fe">
            <textarea v-model="prompt" name="" class="me" id="" placeholder="Enter a prompt here"></textarea>
            <div class="flex gap-8">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 0 32.932 29.782">
                        <path d="M-1988.072,29.782A1.93,1.93,0,0,1-1990,27.854V4.718a1.93,1.93,0,0,1,1.928-1.928h16.5V4.718h-16.493l0,0V27.851l0,0h26.985l0,0V14.493h1.928V27.854a1.93,1.93,0,0,1-1.928,1.928Zm24.5-4.684-22.211-.256v-3.2l5.567-7.151a1.213,1.213,0,0,1,.645-.25,1.391,1.391,0,0,1,.678.25l6.816,7.765h1.929l6.475-4.594h.157l-.055,7.434Zm.358-15.1V6.151h-3.85V3.85h3.85V0h2.3V3.85h3.849v2.3h-3.849V10Z" transform="translate(1990)" fill="#fff"/>
                    </svg>
                </button>
                <button :class="{'has-input': prompt}" type="submit" :disabled="!prompt">
                    <svg xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 0 20.841 20.169">
                        <path d="M10.129,12.214,3.173,9.432a1.072,1.072,0,0,1-.726-1.144c.022-.955,1.1-1.18,1.1-1.18L18.519,1.64a2.464,2.464,0,0,1,2.249.2c.834.747.29,2.069.29,2.069L15.6,18.03s-.405,1.527-1.546,1.539-1.656-1.68-1.656-1.68l-2.27-5.674,3.926-3.926" transform="translate(-1.446 -0.401)" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'ChatInput',
    data() {
        return {
            prompt: ''
        }
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
    padding:  0px 16px .5rem 12px;
    max-height: 200px;
    font-size: 1.1rem;
}
.chat-container {
    padding: 8px 8px;
    border-radius: 28px;
    &:has(textarea:focus) {
        background-color: var(--main-background-3);
        transition: .1s ease-in background-color;
    }
}
form {
    button {
        height: 40px;
        width: 40px;
    }
    button:disabled {
        background-color: var(--button-press);
        path {
            stroke: #acacac;
        }
    }
    button.has-input {
        background-color: var(--primary-color);
    }
    button:not(:disabled, [type=submit]) {
        background-color: unset;
        
        &:hover {
            background-color: var(--button-neutral-hover);
        }
    }
    
}
.light-theme {
    button:not(:disabled, [type=submit]) {
        path {
            fill: #000000;
        }
    }
    
}
</style>