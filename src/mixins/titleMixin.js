// mixins/titleMixin.js
export default {
    watch: {
        pageTitle: {
            immediate: true,
            handler(newTitle) {
                document.title = newTitle;
            }
        }
    }
};
