export default {
    state: {
      dropdownDiv: { active: false, right: '', left: '', top: '', bottom: ''},
      language: { name: 'English (US)', key: 'eng'},
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
            // element.classList.add('this-will-change')
        },
        reSetDropdown(state) {
            state.dropdownDiv.left = ''
            state.dropdownDiv.top = ''
            state.dropdownDiv.bottom = ''
            // document.getElementById(id).classList.remove('this-will-change')
        },
    }
   
}