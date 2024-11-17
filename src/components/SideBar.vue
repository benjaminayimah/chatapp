<template>
    <transition name="modal-fade">
        <backdrop @click="$store.commit('closeSideBar')" v-if="device === 'mobile' && menu" :opacity=".4" :zindex="98" />
    </transition>
    <aside class="flex bg-surface-2 ov-hidden" :class="menu ? 'expanded' : 'collapsed'" role="navigation">
        <div class="flex-1 flex flex-column aside-wrapper jc-sb">
            <div class="flex gap-16 flex-column">
                <section>
                    <ul>
                        <li @mouseup="device === 'mobile' ? $store.commit('closeSideBar') : ''">
                            <button @mousedown="hideToolTip" @mouseleave="hideToolTip" @mouseenter="showToolTip('new_chat_btn')" id="new_chat_btn" tooltip="New chat" @click="newChat" class="gap-8 new-chat ai-c" aria-label="New chat">
                                <svg width="20" height="14" viewBox="0 0 14 14">
                                    <path class="invert-fill-color" d="M21.5,15.5h-6v6h-2v-6h-6v-2h6v-6h2v6h6Z" transform="translate(-7.5 -7.5)"/>
                                </svg>
                                <span>New chat</span>
                            </button>
                        </li>
                    </ul>
                </section>
                <section>
                    <ul>
                        <li class="flex" @mouseup="device === 'mobile' ? $store.commit('closeSideBar') : ''">
                            <router-link to="/" class="gap-10 flex ai-c bg-transition">
                                <svg width="20" height="17" viewBox="0 0 26 26">
                                    <path d="M21.667,24A2.336,2.336,0,0,0,24,21.667V17.333A2.336,2.336,0,0,0,21.667,15h-2.89a2.336,2.336,0,0,0-2.333,2.333v4.334A2.336,2.336,0,0,0,18.777,24h2.89M7.223,24a2.336,2.336,0,0,0,2.333-2.333V20.223a2.336,2.336,0,0,0-2.333-2.334H4.333A2.336,2.336,0,0,0,2,20.223v1.444A2.336,2.336,0,0,0,4.333,24h2.89m0-13A2.336,2.336,0,0,0,9.556,8.667V4.333A2.336,2.336,0,0,0,7.223,2H4.333A2.336,2.336,0,0,0,2,4.333V8.667A2.336,2.336,0,0,0,4.333,11h2.89M21.667,8.111A2.336,2.336,0,0,0,24,5.777V4.333A2.336,2.336,0,0,0,21.667,2h-2.89a2.336,2.336,0,0,0-2.333,2.333V5.777a2.336,2.336,0,0,0,2.333,2.334h2.89m0,17.889h-2.89a4.333,4.333,0,0,1-4.333-4.333V17.333A4.333,4.333,0,0,1,18.777,13h2.89A4.333,4.333,0,0,1,26,17.333v4.334A4.333,4.333,0,0,1,21.667,26ZM7.223,26H4.333A4.333,4.333,0,0,1,0,21.667V20.223a4.334,4.334,0,0,1,4.333-4.334h2.89a4.334,4.334,0,0,1,4.333,4.334v1.444A4.333,4.333,0,0,1,7.223,26Zm0-13H4.333A4.333,4.333,0,0,1,0,8.667V4.333A4.333,4.333,0,0,1,4.333,0h2.89a4.333,4.333,0,0,1,4.333,4.333V8.667A4.333,4.333,0,0,1,7.223,13Zm14.444-2.888h-2.89a4.334,4.334,0,0,1-4.333-4.334V4.333A4.333,4.333,0,0,1,18.777,0h2.89A4.333,4.333,0,0,1,26,4.333V5.777A4.334,4.334,0,0,1,21.667,10.111Z"/>
                                </svg>
                                <span>Explore</span>
                            </router-link>
                        </li>
                    </ul>
                </section>
                <section v-if="recents && recents.length" id="recent" class="recent overflow-y-scroll pd-b-8">
                    <div class="fs-09 fw-600 label">Recent chat</div>
                    <ul>
                        <recent-chat-list v-for="(recent, index) in recents" 
                            :key="index"
                            :recent="recent"
                            :device="device"
                        />
                    </ul>
                </section>
            </div>
            <section>
                <ul>
                    <li class="flex" @mouseup="device === 'mobile' ? $store.commit('closeSideBar') : ''">
                        <button @click="openSettings" class="gap-10 transparent-button ai-c">
                            <svg width="20" height="18" viewBox="0 0 19.4 21">
                                <path d="M-1980.735,21a3,3,0,0,1-2.588-1.481l-.811-1.382a1,1,0,0,0-.855-.493l-1.6-.014a3,3,0,0,1-2.576-1.5l-.439-.76a3,3,0,0,1-.012-2.974l.792-1.4a1,1,0,0,0,0-.985l-.792-1.4a3,3,0,0,1,.012-2.974l.439-.761a3,3,0,0,1,2.576-1.5l1.6-.013a1,1,0,0,0,.855-.493l.811-1.382A3,3,0,0,1-1980.735,0h.87a3,3,0,0,1,2.588,1.481l.811,1.382a1,1,0,0,0,.854.493l1.6.013a3,3,0,0,1,2.576,1.5l.438.761a3,3,0,0,1,.013,2.974l-.792,1.4a1,1,0,0,0,0,.985l.792,1.4a3,3,0,0,1-.013,2.974l-.438.76a3,3,0,0,1-2.576,1.5l-1.6.014a1,1,0,0,0-.854.493l-.811,1.382A3,3,0,0,1-1979.865,21Zm-.862-18.506-.811,1.382a3,3,0,0,1-2.564,1.481l-1.6.013a1,1,0,0,0-.859.5l-.439.761a1,1,0,0,0,0,.992l.792,1.4a3,3,0,0,1,0,2.953l-.792,1.4a1,1,0,0,0,0,.991l.439.761a1,1,0,0,0,.859.5l1.6.014a3,3,0,0,1,2.564,1.481l.811,1.381a1,1,0,0,0,.862.494h.87a1,1,0,0,0,.863-.494l.811-1.381a3,3,0,0,1,2.563-1.481l1.6-.014a1,1,0,0,0,.859-.5l.438-.761a1,1,0,0,0,0-.991l-.792-1.4a3,3,0,0,1,0-2.953l.792-1.4a1,1,0,0,0,0-.992l-.438-.761a1,1,0,0,0-.859-.5l-1.6-.013a3,3,0,0,1-2.563-1.481L-1979,2.494a1,1,0,0,0-.863-.494h-.87A1,1,0,0,0-1981.6,2.494Zm-2.2,8.006a3.5,3.5,0,0,1,3.5-3.5,3.5,3.5,0,0,1,3.5,3.5,3.5,3.5,0,0,1-3.5,3.5A3.5,3.5,0,0,1-1983.8,10.5Zm2,0a1.5,1.5,0,0,0,1.5,1.5,1.5,1.5,0,0,0,1.5-1.5,1.5,1.5,0,0,0-1.5-1.5A1.5,1.5,0,0,0-1981.8,10.5Z" transform="translate(1990)"/>
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
import RecentChatList from './RecentChatList.vue';
import tooltipMixin from '@/mixins/tooltipMixin';
export default {
    components: { Backdrop, RecentChatList },
    name: 'SideBar',
    mixins: [tooltipMixin],
    computed: {
        ...mapState({
            menu: (state) => state.DeviceWindow.menu,
            device: (state) => state.DeviceWindow.device,
            recents: (state) => state.recents
        })
    },
    props: {

    },
    data() {
        return {
        }
    },
    methods: {
        openSettings() {
            this.$router.push({ query: { ...this.$route.query, m: 'settings' } });
        },
        newChat() {
            this.$router.push({ name: 'NewChat' })
        }
    }
}
</script>

<style lang="scss" scoped>
aside {
  transition: .3s ease-in-out width, .5s ease-in-out left, .2s ease background-color,;
}

section {
    padding-right: 14px;
    padding-left: 14px;
}
.aside-wrapper {
    padding: 100px 0 24px 0;
    gap: 12px;
}

.label {
    padding: 0 10px 8px 10px;
    color: var(--font-color-3);
}
.expanded {
    left: 0;
}
.collapsed{
    left: calc(-100vw - 40px);
    width: var(--side-bar-mini-width);
}
</style>