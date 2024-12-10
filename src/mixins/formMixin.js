export default {
    data() {
        return {
            errors: [],
            validationSuccess: null,
            onLoadFetch: true,
            processing: false,
            responseStatusText: '',
            responseErrorMessage: '',
            networkError: ''
        }
    },
    methods: {
        handleError(err) {
            console.log(err)
            this.errors = err.response?.data?.errors ?? [];
            this.responseStatusText = err.response?.statusText ?? '';
            this.responseErrorMessage = (err.response?.data?.error || err.response?.data?.message) ?? '';

            const networkErrorCodes = ['ERR_NETWORK', 'ECONNABORTED'];
            
            networkErrorCodes.includes(err.code)
                ? (this.networkError = err.message, this.$store.dispatch('showAlert', { type: 'error', message: err.message }))
                : (this.networkError = '', this.$store.commit('dismissAlert'));

            err.response?.status === 429 
                ? this.$store.dispatch('showAlert', { type: 'error', message: err.response?.data })
                : ''
        },
        startOnloadFetch() {
            this.onLoadFetch = true
        },
        stopOnloadFetch() {
            this.onLoadFetch = false
        },
        startProcessing() {
            this.processing = true
        },
        stopProcessing() {
            this.processing = false
        }
    }
}