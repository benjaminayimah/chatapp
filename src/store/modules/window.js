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
            const app = document.getElementById('app')
            if(windowWidth < 768){
                app.setAttribute('class', 'mobile')
                state.device = 'mobile'
                state.menu = false
            }else if(windowWidth > appWidth){
                app.setAttribute('class', 'desktop')
                state.device = 'desktop'
                state.menu = true
            }else{
                app.setAttribute('class', 'tablet')
                state.device = 'tablet'
                state.menu = false
            }
        }
    }
}