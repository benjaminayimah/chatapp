<template>
    <transition name="modal-fade">
        <backdrop @click="$store.commit('closeSideBar')" v-if="device === 'mobile' && menu" :opacity=".4" :zindex="98" />
    </transition>
    <aside class="flex bg-surface-2 ov-hidden" :class="menu ? 'expanded' : 'collapsed'" role="navigation">
        <div class="flex-1 flex flex-column aside-wrapper jc-sb">
            <div class="flex gap-16 flex-column">
                <section>
                    <div class="section-wrapper">
                        <ul>
                            <li @mouseup="device === 'mobile' ? $store.commit('closeSideBar') : ''">
                                <button
                                    id="new_chat_btn"
                                    class="gap-8 new-chat ai-c"
                                    aria-label="New chat"
                                    tooltip="New chat"
                                    @click="newChat"
                                    @mouseenter="showToolTip('new_chat_btn')"
                                    @focus="showToolTip('new_chat_btn')"
                                    @mouseleave="hideToolTip"
                                    @mousedown="hideToolTip"
                                    @blur="hideToolTip"
                                    >
                                    <svg width="20" height="14" viewBox="0 0 14 14">
                                        <path class="invert-fill-color" d="M21.5,15.5h-6v6h-2v-6h-6v-2h6v-6h2v6h6Z" transform="translate(-7.5 -7.5)"/>
                                    </svg>
                                    <span>New chat</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </section>
                <section>
                    <div class="section-wrapper">
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
                    </div>
                </section>
                <section v-if="recents && recents.length" id="recent" class="recent pd-b-8 relative">
                    <div class="fs-09 fw-600 label">Recent chat</div>
                    <div class="section-wrapper overflow-y-scroll custom-scrollbar">
                        <ul class="pd-b-24">
                            <recent-chat-list v-for="(recent, index) in recents" 
                                :key="index"
                                :recent="recent"
                                :device="device"
                            />
                        </ul>
                    </div>
                </section>
                <!-- <section v-if="recents && recents.length" id="recent" class="recent pd-b-8 relative">
                    <div class="fs-09 fw-600 label">Agents</div>
                    <div class="section-wrapper overflow-y-scroll custom-scrollbar">
                        <ul>
                            <recent-chat-list v-for="(recent, index) in recents" 
                                :key="index"
                                :recent="recent"
                                :device="device"
                            />
                        </ul>
                    </div>
                </section> -->
            </div>
            <section>
                <div class="section-wrapper">
                    <ul>
                        <li class="flex">
                            <button @click.prevent="" type="button" class="button-outline ai-c jc-c">
                                <div class="gap-10 ai-c jc-c flex">
                                    <svg width="20" height="18" viewBox="0 0 19.32 21.381">
                                        <path d="M-2836.5-704.712l-6.66-3.845a3,3,0,0,1-1.5-2.6v-7.69a3,3,0,0,1,1.5-2.6l6.66-3.845a3,3,0,0,1,3,0l6.66,3.845a3,3,0,0,1,1.5,2.6v7.69a3,3,0,0,1-1.5,2.6l-6.66,3.845a3,3,0,0,1-1.5.4A3,3,0,0,1-2836.5-704.712Zm1-18.845-6.661,3.846a1,1,0,0,0-.5.866v7.69a1,1,0,0,0,.5.866l6.661,3.846a1,1,0,0,0,1,0l6.66-3.846a1,1,0,0,0,.5-.866v-7.69a1,1,0,0,0-.5-.866l-6.66-3.846a1,1,0,0,0-.5-.134A1,1,0,0,0-2835.5-723.557Zm-1.572,14.076-.488-1.464a2.364,2.364,0,0,0-1.5-1.5l-1.464-.489a.338.338,0,0,1,0-.641l1.464-.489a2.363,2.363,0,0,0,1.5-1.5l.488-1.464a.338.338,0,0,1,.642,0l.488,1.464a2.365,2.365,0,0,0,1.5,1.5l1.464.489a.337.337,0,0,1,0,.641l-1.464.489a2.365,2.365,0,0,0-1.5,1.5l-.488,1.464a.332.332,0,0,1-.321.231A.332.332,0,0,1-2837.071-709.481Zm4.871-5.664-.305-.915a1.482,1.482,0,0,0-.935-.935l-.915-.305a.211.211,0,0,1,0-.4l.915-.305a1.478,1.478,0,0,0,.935-.935l.305-.915a.211.211,0,0,1,.4,0l.3.915a1.477,1.477,0,0,0,.935.935l.915.305a.211.211,0,0,1,0,.4l-.915.305a1.481,1.481,0,0,0-.935.935l-.3.915a.207.207,0,0,1-.2.144A.207.207,0,0,1-2832.2-715.145Z" transform="translate(2844.66 725.691)"/>
                                    </svg>
                                    <span class="fs-09 fw-600">Upgrade to <strong class="color-blue">Plus+</strong></span>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
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

.section-wrapper {
    padding-right: 14px;
    padding-left: 14px;
}
.aside-wrapper {
    padding: 100px 0 24px 0;
    gap: 12px;
}

.label {
    padding: 0 23px 8px 23px;
    color: var(--font-color-3);
}
.expanded {
    left: 0;
}
.collapsed{
    left: calc(-100vw - 40px);
    width: var(--side-bar-mini-width);
}

.recent::after {
    content: '';
    position: absolute;
    height: 50px;
    width: 100%;
    bottom: 0;
    pointer-events: none;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, var(--main-background-2) 80%);
}

</style>