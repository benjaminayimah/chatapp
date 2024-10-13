<template>
    <transition name="modal-fade">
        <backdrop @click="$store.commit('closeSideBar')" v-if="device === 'mobile' && menu" :opacity=".4" :zindex="98" />
    </transition>
    <aside class="flex bg-surface-2 ov-hidden" :class="menu ? 'expanded' : 'collapsed'">
        <div class="flex-1 flex flex-column aside-wrapper jc-sb">
            <div class="flex gap-16 flex-column">
                <section>
                    <ul>
                        <li>
                            <button class="gap-8 new-chat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 14 14">
                                    <path d="M21.5,15.5h-6v6h-2v-6h-6v-2h6v-6h2v6h6Z" transform="translate(-7.5 -7.5)"/>
                                </svg>
                                <span>New chat</span>
                            </button>
                        </li>
                    </ul>
                </section>
                <section>
                    <ul>
                        <li class="flex" @mouseup="device === 'mobile' ? $store.commit('closeSideBar') : ''">
                            <router-link to="/" class="gap-10 a-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 21.44">
                                    <path d="M5.708,20.44h-3.7A2.984,2.984,0,0,1-1,17.486V6.807A1.011,1.011,0,0,1-.6,6L8.39-.8a1.011,1.011,0,0,1,1.219,0L18.6,6a1.011,1.011,0,0,1,.4.806V17.486a2.984,2.984,0,0,1-3.008,2.953h-3.7a1.011,1.011,0,0,1-1.011-1.011v-7.77a.506.506,0,0,0-.506-.5H7.224a.505.505,0,0,0-.5.5v7.77A1.012,1.012,0,0,1,5.708,20.44ZM1.022,7.31V17.486a.961.961,0,0,0,.986.931H4.7v-6.76A2.53,2.53,0,0,1,7.224,9.131h3.552A2.53,2.53,0,0,1,13.3,11.657v6.759h2.689a.961.961,0,0,0,.986-.931V7.31L9,1.278Z" transform="translate(1 1)"/>
                                </svg>
                                <span>Home</span>
                            </router-link>
                        </li>
                        <li class="flex" @mouseup="device === 'mobile' ? $store.commit('closeSideBar') : ''">
                            <router-link to="/gemini-pro" class="gap-10 a-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 26 26">
                                    <path d="M21.667,24A2.336,2.336,0,0,0,24,21.667V17.333A2.336,2.336,0,0,0,21.667,15h-2.89a2.336,2.336,0,0,0-2.333,2.333v4.334A2.336,2.336,0,0,0,18.777,24h2.89M7.223,24a2.336,2.336,0,0,0,2.333-2.333V20.223a2.336,2.336,0,0,0-2.333-2.334H4.333A2.336,2.336,0,0,0,2,20.223v1.444A2.336,2.336,0,0,0,4.333,24h2.89m0-13A2.336,2.336,0,0,0,9.556,8.667V4.333A2.336,2.336,0,0,0,7.223,2H4.333A2.336,2.336,0,0,0,2,4.333V8.667A2.336,2.336,0,0,0,4.333,11h2.89M21.667,8.111A2.336,2.336,0,0,0,24,5.777V4.333A2.336,2.336,0,0,0,21.667,2h-2.89a2.336,2.336,0,0,0-2.333,2.333V5.777a2.336,2.336,0,0,0,2.333,2.334h2.89m0,17.889h-2.89a4.333,4.333,0,0,1-4.333-4.333V17.333A4.333,4.333,0,0,1,18.777,13h2.89A4.333,4.333,0,0,1,26,17.333v4.334A4.333,4.333,0,0,1,21.667,26ZM7.223,26H4.333A4.333,4.333,0,0,1,0,21.667V20.223a4.334,4.334,0,0,1,4.333-4.334h2.89a4.334,4.334,0,0,1,4.333,4.334v1.444A4.333,4.333,0,0,1,7.223,26Zm0-13H4.333A4.333,4.333,0,0,1,0,8.667V4.333A4.333,4.333,0,0,1,4.333,0h2.89a4.333,4.333,0,0,1,4.333,4.333V8.667A4.333,4.333,0,0,1,7.223,13Zm14.444-2.888h-2.89a4.334,4.334,0,0,1-4.333-4.334V4.333A4.333,4.333,0,0,1,18.777,0h2.89A4.333,4.333,0,0,1,26,4.333V5.777A4.334,4.334,0,0,1,21.667,10.111Z"/>
                                </svg>
                                <span>Explore</span>
                            </router-link>
                        </li>
                    </ul>
                </section>
                <section id="recent" class="recent overflow-y-scroll pd-b-8">
                    <div class="fs-09 fw-600 label">Recent chat</div>
                    <ul>
                        <li v-for="(recent, index) in recents" :key="index" class="flex" @mouseup="device === 'mobile' ? $store.commit('closeSideBar') : ''">
                            <router-link to="/" class="a-button">
                                <div class="gap-10 flex ai-c">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 30 30">
                                        <path d="M6,3H30a3.009,3.009,0,0,1,3,3V33l-6-6H6a3.009,3.009,0,0,1-3-3V6A3.009,3.009,0,0,1,6,3ZM6,24H27l3,3V6H6Z" transform="translate(-3 -3)"/>
                                    </svg>
                                    <span class="wrap-text wrap-line-1 fs-09">{{ recent }}</span>
                                </div>
                                <i @click.prevent="" class="flex jc-c ai-c">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 2 10">
                                        <path id="Path_2601" data-name="Path 2601" d="M-1990,9a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-1990,9Zm0-4a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-1990,5Zm0-4a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-1990,1Z" transform="translate(1990)"/>
                                    </svg>
                                </i>
                            </router-link>
                        </li>
                    </ul>
                </section>
            </div>
            <section>
                <ul>
                    <li class="flex" @mouseup="device === 'mobile' ? $store.commit('closeSideBar') : ''">
                        <button @click="openModal" class="gap-10 transparent-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 25.511 25.511">
                                <path d="M-3735.8-331.126v-.083a.758.758,0,0,0-.5-.689l-.058-.023a.759.759,0,0,0-.308-.065.762.762,0,0,0-.531.214l-.059.059a3.116,3.116,0,0,1-2.219.92,3.117,3.117,0,0,1-2.219-.92,3.116,3.116,0,0,1-.919-2.219,3.113,3.113,0,0,1,.92-2.219l.058-.059a.757.757,0,0,0,.149-.838s0-.007,0-.01a.763.763,0,0,0-.7-.462h-.178a3.141,3.141,0,0,1-3.138-3.138,3.141,3.141,0,0,1,3.138-3.137h.082a.758.758,0,0,0,.689-.5c.007-.02.015-.039.024-.059a.761.761,0,0,0-.15-.838l-.06-.059a3.116,3.116,0,0,1-.919-2.219,3.116,3.116,0,0,1,.92-2.22,3.116,3.116,0,0,1,2.218-.919,3.121,3.121,0,0,1,2.22.92l.058.059a.763.763,0,0,0,.531.214.757.757,0,0,0,.308-.065,1.039,1.039,0,0,1,.211-.067.762.762,0,0,0,.346-.636v-.178a3.141,3.141,0,0,1,3.138-3.137,3.141,3.141,0,0,1,3.138,3.137v.1a.762.762,0,0,0,.462.695l.01,0a.756.756,0,0,0,.308.065.762.762,0,0,0,.531-.214l.059-.059a3.114,3.114,0,0,1,2.219-.92,3.116,3.116,0,0,1,2.219.92,3.115,3.115,0,0,1,.919,2.219,3.112,3.112,0,0,1-.92,2.219l-.059.059a.761.761,0,0,0-.149.839,1,1,0,0,1,.067.212.763.763,0,0,0,.636.346h.177a3.141,3.141,0,0,1,3.138,3.138,3.141,3.141,0,0,1-3.138,3.137h-.1a.761.761,0,0,0-.695.462l0,.01a.761.761,0,0,0,.149.838l.06.059a3.12,3.12,0,0,1,.919,2.219,3.121,3.121,0,0,1-.92,2.22,3.117,3.117,0,0,1-2.219.919,3.12,3.12,0,0,1-2.22-.92l-.058-.059a.763.763,0,0,0-.532-.214.755.755,0,0,0-.307.065l-.009,0a.766.766,0,0,0-.464.7v.178a3.14,3.14,0,0,1-3.137,3.137A3.141,3.141,0,0,1-3735.8-331.126Zm.221-2.638a2.749,2.749,0,0,1,1.779,2.517v.12a1.139,1.139,0,0,0,1.137,1.137,1.139,1.139,0,0,0,1.137-1.137v-.182a2.761,2.761,0,0,1,1.67-2.53,2.737,2.737,0,0,1,1.109-.233,2.748,2.748,0,0,1,1.933.788l.009.008.064.065a1.131,1.131,0,0,0,.805.334,1.131,1.131,0,0,0,.8-.334,1.131,1.131,0,0,0,.334-.806,1.13,1.13,0,0,0-.334-.8l-.064-.064-.008-.008a2.75,2.75,0,0,1-.555-3.043,2.764,2.764,0,0,1,2.527-1.67h.1a1.138,1.138,0,0,0,1.137-1.136,1.138,1.138,0,0,0-1.137-1.137h-.181a2.764,2.764,0,0,1-2.533-1.675,1.042,1.042,0,0,1-.073-.271,2.749,2.749,0,0,1,.631-2.853l.008-.008.064-.064a1.131,1.131,0,0,0,.334-.8,1.131,1.131,0,0,0-.333-.8,1.132,1.132,0,0,0-.806-.335,1.127,1.127,0,0,0-.8.334l-.065.064-.007.008a2.752,2.752,0,0,1-1.933.788,2.739,2.739,0,0,1-1.11-.233,2.761,2.761,0,0,1-1.67-2.527v-.1a1.139,1.139,0,0,0-1.137-1.137,1.139,1.139,0,0,0-1.137,1.137v.182a2.763,2.763,0,0,1-1.675,2.532.971.971,0,0,1-.271.073,2.729,2.729,0,0,1-.92.158,2.752,2.752,0,0,1-1.933-.788l-.008-.008-.064-.065a1.131,1.131,0,0,0-.806-.334,1.13,1.13,0,0,0-.8.334,1.127,1.127,0,0,0-.334.806,1.129,1.129,0,0,0,.333.8l.065.064.008.008a2.748,2.748,0,0,1,.566,3.018,2.749,2.749,0,0,1-2.518,1.779h-.119a1.138,1.138,0,0,0-1.137,1.136,1.138,1.138,0,0,0,1.137,1.137h.181a2.765,2.765,0,0,1,2.531,1.67,2.751,2.751,0,0,1-.555,3.043l-.008.008-.064.064a1.127,1.127,0,0,0-.335.8,1.127,1.127,0,0,0,.334.8,1.132,1.132,0,0,0,.806.335,1.128,1.128,0,0,0,.8-.334l.065-.065a.045.045,0,0,0,.008-.008,2.752,2.752,0,0,1,1.933-.788A2.752,2.752,0,0,1-3735.576-333.764Zm-1.375-6.98a4.211,4.211,0,0,1,4.207-4.206,4.211,4.211,0,0,1,4.206,4.206,4.21,4.21,0,0,1-4.206,4.206A4.211,4.211,0,0,1-3736.951-340.744Zm2,0a2.208,2.208,0,0,0,2.206,2.205,2.208,2.208,0,0,0,2.206-2.205,2.208,2.208,0,0,0-2.206-2.206A2.208,2.208,0,0,0-3734.951-340.744Z" transform="translate(3745.5 353.5)"/>
                            </svg>
                            <span class="fs-09 fw-600">Settings</span>
                        </button>
                    </li>
                </ul>
            </section>
        </div>
    </aside>
</template>

<script>
import { mapState } from 'vuex';
import Backdrop from './Backdrop.vue';
export default {
    components: { Backdrop },
    name: 'SideBar',
    computed: {
        ...mapState({
            menu: (state) => state.DeviceWindow.menu,
            device: (state) => state.DeviceWindow.device
        })
    },
    data() {
        return {
            recents: [
                'Moon Landing Evidence',
                'Airbag Warning Signs',
                'Spyware and Privacy Concerns',
                'Friendly Greeting Exchange',
                'iPhone Camera Placement Evolution',
                'Coriolis Effect at Equator',
                '20% Reduction Calculation',
                'Percentage Increase Calculation',
                'Australian Open Surface Change',
                'Ghana Olympic Medal History',
                'Grammar Check Confirmation',
                'Electoral College vs Popular Vote',
                'Coriolis Effect at Equator',
                'Phrase Correction Request',
                'São Tomé Minister Update'
            ]
        }
    },
    methods: {
        openModal() {
            this.$router.push({ query: { m: 'settings' } });
        }
    }
}
</script>

<style lang="scss" scoped>

aside {
    height: 100vh;
    position: sticky;
    top: 0;
    transition: .3s ease-in-out width, .5s ease-in-out left, .2s ease background-color,;
}
section {
    padding-right: 14px;
    padding-left: 14px;
}
.desktop, .tablet {
    .expanded {
        width: var(--side-bar-full-width);
        ul {
            button, a {
                flex: 1;
                justify-content: unset;
                padding: 0 10px;
            }
            .new-chat {
                width: 122px;
                transition: var(--transition-time) width;
            }
        }
    }
    .collapsed{
        width: var(--side-bar-mini-width);
        ul {
            button, a {
                width: 40px;
                span {
                    display: none;
                }
            }
        }

        .recent {
            display: none;
        }
    }
    #recent a {
        span {
            width: calc(var(--side-bar-full-width) - 110px);
        }
        i {
            opacity: 0;
        }
    }
}

.mobile {
    aside {
        position: fixed;
        height: 100%;
        width: 75vw;
        z-index: 99;
    }
    .expanded {
       left: 0;
    }
    .collapsed{
       left: calc(-100vw - 40px);
       width: var(--side-bar-mini-width);
    }
    button, a {
        flex: 1;
        justify-content: unset;
        padding: 0 10px;
    }
    #recent a {
        span {
            width: calc(75vw - 110px);
        }
        i {
            opacity: 1;
        }
    }
}
.aside-wrapper {
    padding: 80px 0 24px 0;
    gap: 12px;
}
ul {
    svg {
        flex-shrink: 0;
    }
    button, a {
        height: 40px;
        span {
            display: block;
            padding-right: 5px;
            animation: fadeInSlide .3s;
        }
    }
}
.label {
    padding: 0 10px 8px 10px;
    color: var(--font-color-3);
}
@keyframes fadeInSlide {
  from { opacity: 0; transform: translateX(-10px);}
  to { opacity: 1; transform: translateX(0)}
}

#recent {
    max-height: calc(100dvh - 308px);
    animation: fadeIn 1s;
    a {
        justify-content: space-between;
        &:hover i {
            opacity: 1;
        }
        i {
            height: 32px;
            width: 32px;
            cursor: default;
            border-radius: 40px;
            translate: 6px;
            &:hover {
                background-color: var(--main-background-4);
            }
        }
    }
}

@keyframes fadeIn {
    0% { opacity: 0;}
    100% { opacity: 1;}
}

</style>