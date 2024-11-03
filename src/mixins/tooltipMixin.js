export default {
    methods: {
        showToolTip(id) {
            this.$store.commit('setTooltip', id)
        },
        hideToolTip() {
            this.$store.commit('reSetTooltip')
        }
    }
}