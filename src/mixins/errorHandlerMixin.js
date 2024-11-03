export default {
    data() {
        return {
            error: false,
            errorMessage: '',
            errors: []
        }
    },
    methods: {
        handleError(err) {
            console.log(err)
            this.errors = err.response?.data?.errors;
        }
    },
}