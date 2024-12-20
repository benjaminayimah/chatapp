export default {
    state: {
      dropdownDiv: { active: false, right: '', left: '', top: '', bottom: ''},
      tooltip: { active: false, left: '', top: '', body: ''},
      languages: [{ name: 'English (US)', key: 'eng'}],
      language: { name: 'English (US)', key: 'eng'}
    },
    mutations: {
        setDropdown(state, id) {
            let element = document.getElementById(id)
            const rect = element.getBoundingClientRect()
            let top = rect.top
            let left = rect.left
            if(state.mobile) {
                state.dropdownDiv.left = '0'
                state.dropdownDiv.bottom = '0'
            }else{
                state.dropdownDiv.left = left
                state.dropdownDiv.top = top
                state.dropdownDiv.bottom = '100'
            }
        },
        reSetDropdown(state) {
            state.dropdownDiv.left = ''
            state.dropdownDiv.top = ''
            state.dropdownDiv.bottom = ''
        },
        setTooltip(state, payload) {
            let element = document.getElementById(payload)
            const rect = element.getBoundingClientRect()
            let top = rect.top
            let left = rect.left
            state.tooltip.left = left
            state.tooltip.top = top
            state.tooltip.body = element.attributes.tooltip.value
        },
        reSetTooltip(state) {
            state.tooltip.left = ''
            state.tooltip.top = ''
            state.tooltip.body = ''
        },
    }
   
}