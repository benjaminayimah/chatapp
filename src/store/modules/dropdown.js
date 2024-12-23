export default {
    state: {
      dropdownDiv: { active: false, right: null, left: null, top: null, bottom: null, height: null},
      tooltip: { active: false, left: null , top: null, height: null, width: null, body: null},
      languages: [{ name: 'English (US)', key: 'eng'}],
      language: { name: 'English (US)', key: 'eng'}
    },
    mutations: {
        setDropdown(state, id) {
            let element = document.getElementById(id)
            const rect = element.getBoundingClientRect()
            let top = rect.top
            let left = rect.left
            const height = rect.height;
            state.dropdownDiv.height = height
            if(state.mobile) {
                state.dropdownDiv.left = 0
                state.dropdownDiv.bottom = 0
            }else{
                state.dropdownDiv.left = left
                state.dropdownDiv.top = top
                state.dropdownDiv.bottom = 100
            }
        },
        reSetDropdown(state) {
            Object.assign(state.dropdownDiv, {
                left: null,
                top: null,
                height: null,
                bottom: null
            });
        },
        setTooltip(state, payload) {
            let element = document.getElementById(payload)
            const rect = element.getBoundingClientRect()
            let top = rect.top
            let left = rect.left
            const height = rect.height;
            const width = rect.width;

            Object.assign(state.tooltip, {
                left: left,
                top: top,
                height: height,
                width: width,
                body: element.attributes.tooltip.value
            });
        },
        reSetTooltip(state) {
            Object.assign(state.tooltip, {
                left: null,
                top: null,
                height: null,
                width: null,
                body: null
            });
        }
    }
   
}