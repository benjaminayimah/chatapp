export default {
    data() {
        return {
            errorMessage: '',
            errors: []
        }
    },
    methods: {
        handleError(err) {
            console.log(err)
            this.errors = err.response?.data?.errors ?? [];
            this.errorMessage = err.response?.data?.message ?? '';
            const networkErrorCodes = ['ERR_NETWORK', 'ECONNABORTED', 'ERR_BAD_RESPONSE'];
            if (networkErrorCodes.includes(err.code)) {
                this.errorMessage = err.message;
            }
        }
    }
}