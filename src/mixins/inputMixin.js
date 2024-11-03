export default {
    data() {
        return {
            showPass: false,
            spinner: false
        }
    },
    methods: {
        isFocusIn(id) {
            this.getElement(id).classList.add('input-focused')
        },
        isFocusOut(id, input) {
            const inputField = this.getElement(input)
            if (inputField && inputField.value.trim() === '') {
                this.getElement(id).classList.remove('input-focused')
            }
        },
        togglePass() {
            this.showPass = !this.showPass
        },
        getElement(id) {
            return document.getElementById(id)
        },
        showSpiner() {
            this.spinner = true
        },
        hideSpiner() {
            this.spinner = false
        }
    }
}