
export default {
    computed: {
        computedInitial() {
            const nameParts = this.name?.split(' ') || [];
            return nameParts[0]?.charAt(0).toUpperCase() + (nameParts[1]?.charAt(0).toUpperCase() || '');
        },
        computedColor() {
            return this.color || '';
        }
    }
}