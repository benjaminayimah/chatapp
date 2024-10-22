import { mapState } from "vuex"

export default {
    computed: {
        ...mapState({
            dropdown: (state) => state.dropdown.dropdownDiv
        })
    },
    methods: {
        handleDropdown(dropdown, type) {
            if (!this.dropdownToggle) {
                this.dropdownToggle = true
                this.dropdownType = type
                this.$store.commit('setDropdown', dropdown)
            } else {
                this.dropdownToggle = false
                this.dropdownType = ''
                this.$store.commit('reSetDropdown')
            }
        }
    }
 
}