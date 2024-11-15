<template>
    <nav class="bg-surface-1 flex jc-c ai-c">
        <div class="top-bar-wrapper flex flex-1 ai-c jc-sb">
            <h3 class="fw-500">Artemis AI</h3>
            <div v-if="!auth" class="flex gap-8">
                <button @click="signUp" type="submit" class="button-primary default fw-600 fs-09">Sign up</button>
                <button @click="signIn" type="submit" class="button-outline default fw-600 fs-09">Log in</button>
            </div>
            <div v-else-if="auth && user">
                <button @click="handleDropdown('user_acc_dropdown')" id="user_acc_dropdown" class="gap-8 bg-transparent">
                    <span class="user-name">{{ user.name }}</span>
                    <profile-avatar :user="user" :dimension="40" />
                </button>
            </div>
        </div>
    </nav>
    <teleport to="body">
        <backdrop @click="handleDropdown('user_acc_dropdown')" v-if="dropdownToggle" :opacity="0" :zindex="101" />
        <div v-if="dropdownToggle" class="dropdown fixed" :style="{ top: dropdown.top + 54 + 'px', left: dropdown.left - 60 + 'px'}">
            <ul>
                <li @click="handleDropdown('user_acc_dropdown')">
                    <router-link :to="{ name: 'PublicProfile', params: { user: user.name } }" @click.prevent="" class="flex ai-c gap-10">
                        <svg viewBox="0 0 19.576 20.304">
                            <path d="M-2112.987,138.1v.027a4.8,4.8,0,0,0-.927-2.5,5.342,5.342,0,0,0-2.116-1.662,10.7,10.7,0,0,0-4.425-.809c-2.747,0-4.773.648-6.023,1.925a4.646,4.646,0,0,0-1.322,2.992,1.2,1.2,0,0,1-1.174,1.226H-2129a1.2,1.2,0,0,1-1.2-1.174,7.053,7.053,0,0,1,2.006-4.721c1.718-1.756,4.322-2.647,7.738-2.647s6.028.888,7.776,2.639a7.058,7.058,0,0,1,2.056,4.729,1.114,1.114,0,0,1-1.052,1.174q-.05,0-.1,0C-2112.787,139.3-2112.987,138.1-2112.987,138.1Zm-12.064-14.108a5,5,0,0,1,4.99-4.991,5,5,0,0,1,4.991,4.991,5,5,0,0,1-4.991,4.991A5,5,0,0,1-2125.051,123.988Zm2.4,0a2.6,2.6,0,0,0,2.591,2.591,2.594,2.594,0,0,0,2.591-2.591,2.593,2.593,0,0,0-2.591-2.591A2.594,2.594,0,0,0-2122.652,123.988Z" transform="translate(2130.199 -118.996)" fill="#191b1f"/>
                        </svg>
                        Public profile
                    </router-link>
                </li>
                <li @click="handleDropdown('user_acc_dropdown')">
                    <a href="#" @click.prevent="openSettings" class="flex ai-c gap-10">
                        <svg viewBox="0 0 19.4 21">
                            <path d="M-1980.735,21a3,3,0,0,1-2.588-1.481l-.811-1.382a1,1,0,0,0-.855-.493l-1.6-.014a3,3,0,0,1-2.576-1.5l-.439-.76a3,3,0,0,1-.012-2.974l.792-1.4a1,1,0,0,0,0-.985l-.792-1.4a3,3,0,0,1,.012-2.974l.439-.761a3,3,0,0,1,2.576-1.5l1.6-.013a1,1,0,0,0,.855-.493l.811-1.382A3,3,0,0,1-1980.735,0h.87a3,3,0,0,1,2.588,1.481l.811,1.382a1,1,0,0,0,.854.493l1.6.013a3,3,0,0,1,2.576,1.5l.438.761a3,3,0,0,1,.013,2.974l-.792,1.4a1,1,0,0,0,0,.985l.792,1.4a3,3,0,0,1-.013,2.974l-.438.76a3,3,0,0,1-2.576,1.5l-1.6.014a1,1,0,0,0-.854.493l-.811,1.382A3,3,0,0,1-1979.865,21Zm-.862-18.506-.811,1.382a3,3,0,0,1-2.564,1.481l-1.6.013a1,1,0,0,0-.859.5l-.439.761a1,1,0,0,0,0,.992l.792,1.4a3,3,0,0,1,0,2.953l-.792,1.4a1,1,0,0,0,0,.991l.439.761a1,1,0,0,0,.859.5l1.6.014a3,3,0,0,1,2.564,1.481l.811,1.381a1,1,0,0,0,.862.494h.87a1,1,0,0,0,.863-.494l.811-1.381a3,3,0,0,1,2.563-1.481l1.6-.014a1,1,0,0,0,.859-.5l.438-.761a1,1,0,0,0,0-.991l-.792-1.4a3,3,0,0,1,0-2.953l.792-1.4a1,1,0,0,0,0-.992l-.438-.761a1,1,0,0,0-.859-.5l-1.6-.013a3,3,0,0,1-2.563-1.481L-1979,2.494a1,1,0,0,0-.863-.494h-.87A1,1,0,0,0-1981.6,2.494Zm-2.2,8.006a3.5,3.5,0,0,1,3.5-3.5,3.5,3.5,0,0,1,3.5,3.5,3.5,3.5,0,0,1-3.5,3.5A3.5,3.5,0,0,1-1983.8,10.5Zm2,0a1.5,1.5,0,0,0,1.5,1.5,1.5,1.5,0,0,0,1.5-1.5,1.5,1.5,0,0,0-1.5-1.5A1.5,1.5,0,0,0-1981.8,10.5Z" transform="translate(1990)"/>
                        </svg>
                        Settings
                    </a>
                </li>
                <li @click="handleDropdown('user_acc_dropdown')">
                    <a href="#" @click.prevent="logout" class="flex ai-c gap-10">
                        <svg viewBox="0 0 16.291 17.292">
                            <path d="M-3073.919-628.864a2.912,2.912,0,0,1-2.7-3.08v-4.16a1,1,0,0,1,1-1,1,1,0,0,1,1,1v4.16c0,.636.369,1.08.7,1.08h11.894c.331,0,.7-.444.7-1.08v-4.16a1,1,0,0,1,1-1,1,1,0,0,1,1,1v4.16a2.911,2.911,0,0,1-2.7,3.08Zm4.946-5.953v-6.988l-2.352,2.262a1,1,0,0,1-1.415-.027,1,1,0,0,1,.028-1.414l4.045-3.892a1,1,0,0,1,.442-.247l.007,0,.016,0,.011,0,.012,0,.014,0,.01,0,.014,0,.009,0,.015,0h.008l.015,0h.009l.014,0h.193l.018,0h.005l.019,0h0l.021,0h0l.021,0h0l.022,0,.023.005h0l.022.005h0l.021.005.005,0,.017.005.012,0,.01,0a.979.979,0,0,1,.372.226l4.045,3.892a1,1,0,0,1,.028,1.414,1,1,0,0,1-1.414.027l-2.353-2.263v6.989a1,1,0,0,1-1,1A1,1,0,0,1-3068.973-634.818Z" transform="translate(-628.864 3076.619) rotate(90)"/>
                        </svg>
                        Log out
                    </a>
                </li>
            </ul>
        </div>
    </teleport>
</template>
<script>
import Backdrop from './Backdrop.vue';
import dropdownMixin from '@/mixins/dropdownMixin';
import ProfileAvatar from './ProfileAvatar.vue';
export default {
    name: 'TopBar',
    components: { Backdrop, ProfileAvatar },
    mixins: [dropdownMixin],
    props: {
        auth: Boolean,
        user: Object
    },
    data() {
        return {
            dropdownToggle: false,
        }
    },
    methods: {
        signUp() {
            this.$router.push({ query: { m: 'signup' }}) 
        },
        signIn() {
            this.$router.push({ query: { m: 'signin' }}) 
        },
        async logout() {
            this.$store.dispatch('logout')
        },
        openSettings() {
            this.$router.push({ query: { ...this.$route.query, m: 'settings' } });
        }
    }
}
</script>
<style lang="scss" scoped>
.top-bar-wrapper {
    max-width: 1080px;
    height: 65px;
    padding: 0 20px;
}

button.bg-transparent {
    padding: 4px 4px 4px 16px;
    height: 48px;
    &:hover {
        background-color: var(--main-background-2);
    }
    &:active {
        background-color: var(--main-background-3);
        outline-color: var(--main-background-3) !important;
    }
}
.user-name {
    color: var(--main-font-color-primary);
}
.dropdown {
    width: 200px;
    z-index: 102;
    background-color: var(--modal-main-background);
}


a {
    padding: 8px 18px;
    &:hover {
        background-color: var(--modal-close-button-hover);
    }
    svg {
        height: 16px;
        width: 16px;
    }
}



</style>