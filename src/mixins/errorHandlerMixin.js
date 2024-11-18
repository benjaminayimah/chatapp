export default {
    data() {
        return {
            errors: [],
            fetching: true,
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
                ? (this.networkError = err.message, this.$store.commit('setError', err.message))
                : (this.networkError = '', this.$store.commit('dismissError'));
        },
        startFetching() {
            this.fetching = true
        },
        stopFetching() {
            this.fetching = false
            this.processing = false
        }
    }
}