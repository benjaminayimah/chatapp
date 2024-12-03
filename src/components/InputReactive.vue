<template>
    <div class="form-row flex flex-column gap-4">
        <div :id="`${id}_input_wrapper`" class="input-wrapper relative">
            <label :for="id" class="input-label">{{ label }}</label>
            <input v-if="!isTextarea"
                v-model="inputValue"
                @input="updateValue"
                :type="type === 'password' && showPass ? 'text' : type"
                :maxlength="maxLength"
                :id="id"
                :name="id"
                class="w-100 form-control custom-input"
                @focusin="isFocusIn(`${id}_input_wrapper`)"
                @focusout="isFocusOut(`${id}_input_wrapper`, id)"
                :autofocus="autofocus"
                :autocomplete="autocomplete"
                :aria-invalid="hasErrors"
                :aria-describedby="ariaDescribedBy"
            >
            <textarea v-else
                v-model="inputValue"
                @input="updateValue"
                :id="id"
                :name="id"
                @focusin="isFocusIn(`${id}_input_wrapper`)"
                @focusout="isFocusOut(`${id}_input_wrapper`, id)"
                class="form-control w-100 textarea-no-resize"
                :rows="rows"
                maxlength="500"
                :aria-invalid="hasErrors"
                :aria-describedby="ariaDescribedBy"
                data-gramm="false"
            >
            </textarea>
            <span v-if="type === 'password'" class="hide-show-pass transparent-button absolute centered br-50 a-button" :class="{ 'hide-pass-active' : showPass }" @click.prevent="togglePass" data-type="modal">
                <svg height="18" viewBox="0 0 26.364 26.364">
                    <g transform="translate(1.182 1.182)">
                        <path d="M16027.619-15079.234a21.431,21.431,0,0,1-4.111-4.4,2.816,2.816,0,0,1,0-3.226,21.339,21.339,0,0,1,4.111-4.406,11.5,11.5,0,0,1,7.129-2.734,11.516,11.516,0,0,1,7.132,2.734,21.4,21.4,0,0,1,4.107,4.4,2.822,2.822,0,0,1,0,3.229,21.4,21.4,0,0,1-4.107,4.4,11.51,11.51,0,0,1-7.132,2.734A11.492,11.492,0,0,1,16027.619-15079.234Zm.927-10.853a19.948,19.948,0,0,0-3.813,4.087,1.32,1.32,0,0,0,0,1.5,19.8,19.8,0,0,0,3.81,4.084,10.018,10.018,0,0,0,6.2,2.412,10.015,10.015,0,0,0,6.2-2.412,19.886,19.886,0,0,0,3.814-4.088,1.322,1.322,0,0,0,0-1.5,19.9,19.9,0,0,0-3.81-4.083,10.011,10.011,0,0,0-6.2-2.413A10.013,10.013,0,0,0,16028.546-15090.087Zm1.454,4.836a4.754,4.754,0,0,1,4.748-4.748,4.758,4.758,0,0,1,4.752,4.748,4.758,4.758,0,0,1-4.752,4.752A4.754,4.754,0,0,1,16030-15085.251Zm1.5,0a3.253,3.253,0,0,0,3.25,3.25,3.253,3.253,0,0,0,3.249-3.25,3.253,3.253,0,0,0-3.249-3.25A3.253,3.253,0,0,0,16031.5-15085.251Z" transform="translate(-16022.748 15097.25)" fill="#000"/>
                        <path id="pass_icon_stroke" v-if="!showPass" d="M0,22.121-2.121,20,20-2.121,22.121,0Z" transform="translate(2 2)" stroke-linecap="round" stroke-width="1.5"/>
                    </g>
                </svg>
            </span>
        </div>
        <div v-if="maxLength" class="flex jc-fe"><span class="fs-08 sub-label">{{ charCount }}/{{ maxLength }}</span></div>
        <div v-if="inputErrors.length" class="validation-errors">
            <li :id="`${id}_error_${index + 1}`" role="alert" v-for="(error, index) in inputErrors" :key="index" class="fs-08">
                {{ error.msg }}
            </li>
        </div>
    </div>
</template>

<script>
import inputMixin from '@/mixins/inputMixin';

export default {
    name: 'InputReactive',
    mixins: [inputMixin],
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'text',
        },
        maxLength: {
            type: Number,
            default: null,
        },
        label: {
            type: String,
            default: 'Enter text:',
        },
        errors: Array,
        autocomplete: {
            type: String,
            default: 'off'
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        isTextarea: {
            type: Boolean,
            default: false
        },
        rows: {
            type: Number,
            default: 4
        }
    },
    computed: {
        charCount() {
            return this.maxLength ? this.inputValue.length : ''
        },
        inputErrors() {
            return this.errors?.filter(err => err.path === this.id) || []
        },
        hasErrors() {
            return !!this.inputErrors.length
        },
        ariaDescribedBy() {
            return this.inputErrors.map((_, index) => `${this.id}_error_${index + 1}`).join(" ");
        }
    },
    watch: {
    // Watch for changes in the modelValue prop and update the input
        modelValue(newValue) {
            this.inputValue = newValue;
            if(newValue != '') {
                this.inspectInput()
            }
        }
    },
    data() {
        return {
            inputValue: this.modelValue,
        }
    },
    methods: {
        updateValue() {
            this.$emit('update:modelValue', this.inputValue)
        },
        inspectInput() {
            this.inputValue ? this.isFocusIn(`${this.id}_input_wrapper`) : ''
        }
    },
    mounted() {
        this.inspectInput()
    }
}
</script>

<style lang="scss" scoped>
.hide-show-pass{
    right: 6px;
    height: 30px;
    width: 30px;
    top: 50%;
    transform: translateY(-50%);
}
.hide-pass-active{
    background-color: var(--modal-close-button-hover) !important;
}
#pass_icon_stroke {
    stroke: var(--main-background-primary)
}

textarea {
    border-radius: 12px;
    padding: 22px 14px 12px 14px;
}
</style>