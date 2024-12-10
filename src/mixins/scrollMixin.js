export default {
    data() {
        return {
            emptyArr: [1,2,3,4],
            scrollAmount: 200,
            isAtStart: true,
            isAtEnd: false
        }
    },
    methods: {
        scrollLeft() {
            const scrollContent = this.$refs.scrollContent;
            scrollContent.scrollBy({ left: - this.scrollAmount, behavior: 'smooth' });
            this.updateButtonState();
        },
        scrollRight() {
            const scrollContent = this.$refs.scrollContent;
            scrollContent.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
            this.updateButtonState();
        },
        updateButtonState() {
            const scrollContent = this.$refs.scrollContent;
            this.isAtStart = scrollContent.scrollLeft === 0;
            this.isAtEnd = scrollContent.scrollLeft + scrollContent.offsetWidth >= scrollContent.scrollWidth;
        }
    },
    mounted() {
        // this.updateButtonState();
       this.$refs.scrollContent.addEventListener('scroll', this.updateButtonState);
   }
}
