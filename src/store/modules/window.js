export default {
    state: {
        menu: true,
        device: ''
    },
    mutations: {
        toggleSideBar(state) {
            state.menu = !state.menu
        },
        closeSideBar(state) {
            state.menu = false
        },
        computeWindow(state) {
            const windowWidth = window.innerWidth
            const appWidth = 1344
            if(windowWidth < 768){
                document.getElementsByTagName('main')[0].setAttribute('class', 'mobile')
                state.device = 'mobile'
                state.menu = false
            }else if(windowWidth > appWidth){
                document.getElementsByTagName('main')[0].setAttribute('class', 'desktop')
                state.device = 'desktop'
                state.menu = true
            }else{
                document.getElementsByTagName('main')[0].setAttribute('class', 'tablet')
                state.device = 'tablet'
                state.menu = false
            }
        }
    }
}