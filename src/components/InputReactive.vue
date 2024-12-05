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
                :placeholder="isFocused ? placeholder : ''"
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
                :placeholder="isFocused ? placeholder : ''"
            >
            </textarea>
        </div>
        <label v-if="type === 'password'" for="show_password" class="fs-09 custom-checkbox mt-4 flex ai-c gap-4">
            <input v-model="showPass" @input="updateValue" id="show_password" type="checkbox">
            <span class="checkmark text-no-select"></span>
            <span class="text-no-select">{{ !showPass ? 'Show' : 'Hide' }} password</span>
        </label>
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
        placeholder: {
            type: String,
            default: ''
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
textarea {
    border-radius: 12px;
    padding: 22px 14px 12px 14px;
}

</style>