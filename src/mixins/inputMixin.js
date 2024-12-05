export default {
    data() {
        return {
            showPass: false,
            isFocused: false
        }
    },
    methods: {
        isFocusIn(id) {
            this.getElement(id).classList.add('input-focused')
            this.isFocused = true
        },
        isFocusOut(id, input) {
            const inputField = this.getElement(input)
            if (inputField && inputField.value.trim() === '') {
                this.getElement(id).classList.remove('input-focused')
                this.isFocused = false
            }
        },
        getElement(id) {
            return document.getElementById(id)
        }
    }
}