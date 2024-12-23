export default {
    state: {
        themes: [
            { id: 'system-theme', name: 'System (Default)', key: 'setSystemTheme', system: true},
            { id: 'dark-theme', name: 'Dark', key: 'setTheme'},
            { id: 'light-theme', name: 'Light', key: 'setTheme'},
        ],
        currentTheme: 'system-theme',
        ad: true
    },
    mutations: {
        setTheme(state, theme) {
            state.currentTheme = theme
            this.commit('applyClass', theme)
        },
        async setSystemTheme() {
            await this.commit('tiggerSystemTheme')
            this.commit('preSetSystemTheme')
        },
        tiggerSystemTheme(state) {
            state.currentTheme = 'system-theme'
        },
        preSetSystemTheme() {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            this.commit('checkTheme', prefersDarkScheme)
        },
        setInitialTheme(state) {
            const theme = state.currentTheme
            if(theme === 'light-theme' || theme === 'dark-theme') {
                this.commit('applyClass', theme)
            }else {
                state.currentTheme = 'system-theme'
                this.commit('preSetSystemTheme')
            }
        },
        handleThemeChange(state, payload) {
            this.commit('checkTheme', payload)
        },
        applyClass(state, payload) {
            document.getElementsByTagName('body')[0].setAttribute('class', payload)
        },
        checkTheme(state, payload) {
            if(state.currentTheme === 'system-theme') {
                if(payload) {
                    this.commit('applyClass', 'dark-theme')
                }else {
                    this.commit('applyClass', 'light-theme')
                }
            }
        },
        dismissAd(state) {
            state.ad = null
        }
       
    }
}