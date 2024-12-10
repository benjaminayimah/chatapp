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
                :class="{ 'has-error' : computedHasError }"
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
                :class="{ 'has-error' : computedHasError }"
                :rows="rows"
                maxlength="500"
                :aria-invalid="hasErrors"
                :aria-describedby="ariaDescribedBy"
                data-gramm="false"
                :placeholder="isFocused ? placeholder : ''"
            >
            </textarea>
        </div>
        <div v-if="inputErrors.length" class="validation-errors">
            <li :id="`${id}_error_${index + 1}`" role="alert" v-for="(error, index) in inputErrors" :key="index" class="fs-09">
                {{ error.msg }}
            </li>
        </div>
        <span v-if="checking" class="fs-09 flex ai-c gap-4 surface">
            <spinner :size="17" />
            Checking...
        </span>
        <div v-else-if="validationResult" class="validation-success">
            <li v-html="validationResult" :id="`${id}_valsuccess`"></li>
        </div>
        <div v-if="maxLength" class="flex jc-fe"><span class="fs-08 sub-label">{{ charCount }}/{{ maxLength }}</span></div>
        <label v-if="type === 'password'" for="show_password" class="fs-09 custom-checkbox mt-4 flex ai-c gap-4">
            <input v-model="showPass" @input="updateValue" id="show_password" type="checkbox">
            <span class="checkmark text-no-select"></span>
            <span class="text-no-select">{{ !showPass ? 'Show' : 'Hide' }} password</span>
        </label>
    </div>
</template>

<script>
import inputMixin from '@/mixins/inputMixin';
import debounce from 'lodash.debounce';
import statusIconsMixin from '@/mixins/statusIconsMixin';
import Spinner from './Spinner.vue';
export default {
  components: { Spinner },
    name: 'InputReactive',
    mixins: [inputMixin, statusIconsMixin],
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
        required: {
            type: Boolean,
            default: false
        },
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
        },
        checkUsername: {
            type: Function,
            default: null,
        },
        hasUnsavedChanges: {
            type: Boolean,
            default: false
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
        },
        computedHasError() {
            return !!(!this.inputValue && this.required)
        }
    },
    watch: {
        modelValue(newValue) {
            this.inputValue = newValue;
            this.inspectInput()
        },
        hasUnsavedChanges(status) {
            this.handleRevertChanges(status)
        },
        errors(errors) {
            errors.length ? this.validationResult = null : ''
        }
    },
    data() {
        return {
            inputValue: this.modelValue,
            validationResult: null,
            checking: false
        }
    },
    methods: {
        updateValue() {
            const value = this.inputValue
            this.$emit('update:modelValue', value)

            if (this.checkUsername) {
                this.debouncedCheck(value);
            }
        },
        inspectInput() {
            if (this.inputValue) {
                this.isFocusIn(`${this.id}_input_wrapper`);
            }
        },
        debouncedCheck: debounce(async function (value) {
            if (value.length < 3) {
                this.validationResult = `<span class="fs-09 flex ai-c gap-4 validation-error">${this.statusIcon('error', 16)} Username must be at least 3 characters long.</span>`;
                return;
            }
            this.checking = true;
            try {
                const res = await this.checkUsername(value)
                this.validationResult = `<span class="fs-09 flex ai-c gap-4 validation-${res.status}">${this.statusIcon(res.status, 16)} ${res.message}</span>`
                this.checking = false
            } catch (error) {
                this.validationResult = `<span class="fs-09 flex ai-c gap-4 validation-error">${this.statusIcon('error', 16)} Error checking username</span>`
                this.checking = false
            }
        }, 500),
        handleRevertChanges(status) {
            if(status) {
                if(this.validationResult) {
                    this.validationResult = null
                }
                if(this.inputValue === '') {
                    this.getElement(`${this.id}_input_wrapper`)?.classList.remove('input-focused')
                    this.isFocused = false
                }
            }
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

.has-error {

}

</style>