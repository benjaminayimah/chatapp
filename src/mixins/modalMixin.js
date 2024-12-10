export default {
    methods: {
        closeModal() {
            const remainingQuery = { ...this.$route.query };
            delete remainingQuery.m;
            delete remainingQuery.page;
            this.$router.push({ query: remainingQuery });
        },
        handleEsc(event) {
            if (event.key === 'Escape') {
                this.closeModal();
            }
        },
    },
}