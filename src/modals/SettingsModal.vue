<template>
    <Modal :opacity=".5" :zindex="500" :width="700" :minHeight="50">
        <template #header>
            <h4>Settings</h4>
        </template>
        <template #body>
            <div class="flex gap-32" id="modal_body">
                <div class="modal-body-left">
                    <ul class="flex flex-column overflow-x-scroll scroll-hidden">
                        <li>
                            <a @click.prevent="handleRoute('profile')" href="#" class="w-100 gap-8 flex ai-c bg-transition" :class="{'active-nav' : $route.query.page === 'profile' ||  $route.query.page == null }">
                                <svg height="18" viewBox="0 0 19.4 21">
                                    <path d="M-1980.735,21a3,3,0,0,1-2.588-1.481l-.811-1.382a1,1,0,0,0-.855-.493l-1.6-.014a3,3,0,0,1-2.576-1.5l-.439-.76a3,3,0,0,1-.012-2.974l.792-1.4a1,1,0,0,0,0-.985l-.792-1.4a3,3,0,0,1,.012-2.974l.439-.761a3,3,0,0,1,2.576-1.5l1.6-.013a1,1,0,0,0,.855-.493l.811-1.382A3,3,0,0,1-1980.735,0h.87a3,3,0,0,1,2.588,1.481l.811,1.382a1,1,0,0,0,.854.493l1.6.013a3,3,0,0,1,2.576,1.5l.438.761a3,3,0,0,1,.013,2.974l-.792,1.4a1,1,0,0,0,0,.985l.792,1.4a3,3,0,0,1-.013,2.974l-.438.76a3,3,0,0,1-2.576,1.5l-1.6.014a1,1,0,0,0-.854.493l-.811,1.382A3,3,0,0,1-1979.865,21Zm-.862-18.506-.811,1.382a3,3,0,0,1-2.564,1.481l-1.6.013a1,1,0,0,0-.859.5l-.439.761a1,1,0,0,0,0,.992l.792,1.4a3,3,0,0,1,0,2.953l-.792,1.4a1,1,0,0,0,0,.991l.439.761a1,1,0,0,0,.859.5l1.6.014a3,3,0,0,1,2.564,1.481l.811,1.381a1,1,0,0,0,.862.494h.87a1,1,0,0,0,.863-.494l.811-1.381a3,3,0,0,1,2.563-1.481l1.6-.014a1,1,0,0,0,.859-.5l.438-.761a1,1,0,0,0,0-.991l-.792-1.4a3,3,0,0,1,0-2.953l.792-1.4a1,1,0,0,0,0-.992l-.438-.761a1,1,0,0,0-.859-.5l-1.6-.013a3,3,0,0,1-2.563-1.481L-1979,2.494a1,1,0,0,0-.863-.494h-.87A1,1,0,0,0-1981.6,2.494Zm-2.2,8.006a3.5,3.5,0,0,1,3.5-3.5,3.5,3.5,0,0,1,3.5,3.5,3.5,3.5,0,0,1-3.5,3.5A3.5,3.5,0,0,1-1983.8,10.5Zm2,0a1.5,1.5,0,0,0,1.5,1.5,1.5,1.5,0,0,0,1.5-1.5,1.5,1.5,0,0,0-1.5-1.5A1.5,1.5,0,0,0-1981.8,10.5Z" transform="translate(1990)"/>
                                </svg>
                                Public profile
                            </a>
                        </li>
                        <li>
                            <a @click.prevent="handleRoute('account')" href="#" class="w-100 gap-8 flex ai-c bg-transition" :class="{'active-nav' : $route.query.page === 'account' }">
                                <svg height="18" viewBox="0 0 19.4 21">
                                    <path d="M-1980.735,21a3,3,0,0,1-2.588-1.481l-.811-1.382a1,1,0,0,0-.855-.493l-1.6-.014a3,3,0,0,1-2.576-1.5l-.439-.76a3,3,0,0,1-.012-2.974l.792-1.4a1,1,0,0,0,0-.985l-.792-1.4a3,3,0,0,1,.012-2.974l.439-.761a3,3,0,0,1,2.576-1.5l1.6-.013a1,1,0,0,0,.855-.493l.811-1.382A3,3,0,0,1-1980.735,0h.87a3,3,0,0,1,2.588,1.481l.811,1.382a1,1,0,0,0,.854.493l1.6.013a3,3,0,0,1,2.576,1.5l.438.761a3,3,0,0,1,.013,2.974l-.792,1.4a1,1,0,0,0,0,.985l.792,1.4a3,3,0,0,1-.013,2.974l-.438.76a3,3,0,0,1-2.576,1.5l-1.6.014a1,1,0,0,0-.854.493l-.811,1.382A3,3,0,0,1-1979.865,21Zm-.862-18.506-.811,1.382a3,3,0,0,1-2.564,1.481l-1.6.013a1,1,0,0,0-.859.5l-.439.761a1,1,0,0,0,0,.992l.792,1.4a3,3,0,0,1,0,2.953l-.792,1.4a1,1,0,0,0,0,.991l.439.761a1,1,0,0,0,.859.5l1.6.014a3,3,0,0,1,2.564,1.481l.811,1.381a1,1,0,0,0,.862.494h.87a1,1,0,0,0,.863-.494l.811-1.381a3,3,0,0,1,2.563-1.481l1.6-.014a1,1,0,0,0,.859-.5l.438-.761a1,1,0,0,0,0-.991l-.792-1.4a3,3,0,0,1,0-2.953l.792-1.4a1,1,0,0,0,0-.992l-.438-.761a1,1,0,0,0-.859-.5l-1.6-.013a3,3,0,0,1-2.563-1.481L-1979,2.494a1,1,0,0,0-.863-.494h-.87A1,1,0,0,0-1981.6,2.494Zm-2.2,8.006a3.5,3.5,0,0,1,3.5-3.5,3.5,3.5,0,0,1,3.5,3.5,3.5,3.5,0,0,1-3.5,3.5A3.5,3.5,0,0,1-1983.8,10.5Zm2,0a1.5,1.5,0,0,0,1.5,1.5,1.5,1.5,0,0,0,1.5-1.5,1.5,1.5,0,0,0-1.5-1.5A1.5,1.5,0,0,0-1981.8,10.5Z" transform="translate(1990)"/>
                                </svg>
                                Account
                            </a>
                        </li>
                        <li>
                            <a @click.prevent="handleRoute('preferences')" href="#" class="w-100 gap-8 flex ai-c bg-transition" :class="{'active-nav' : $route.query.page === 'preferences' }">
                                <svg height="18" viewBox="0 0 19.4 21">
                                    <path d="M-1980.735,21a3,3,0,0,1-2.588-1.481l-.811-1.382a1,1,0,0,0-.855-.493l-1.6-.014a3,3,0,0,1-2.576-1.5l-.439-.76a3,3,0,0,1-.012-2.974l.792-1.4a1,1,0,0,0,0-.985l-.792-1.4a3,3,0,0,1,.012-2.974l.439-.761a3,3,0,0,1,2.576-1.5l1.6-.013a1,1,0,0,0,.855-.493l.811-1.382A3,3,0,0,1-1980.735,0h.87a3,3,0,0,1,2.588,1.481l.811,1.382a1,1,0,0,0,.854.493l1.6.013a3,3,0,0,1,2.576,1.5l.438.761a3,3,0,0,1,.013,2.974l-.792,1.4a1,1,0,0,0,0,.985l.792,1.4a3,3,0,0,1-.013,2.974l-.438.76a3,3,0,0,1-2.576,1.5l-1.6.014a1,1,0,0,0-.854.493l-.811,1.382A3,3,0,0,1-1979.865,21Zm-.862-18.506-.811,1.382a3,3,0,0,1-2.564,1.481l-1.6.013a1,1,0,0,0-.859.5l-.439.761a1,1,0,0,0,0,.992l.792,1.4a3,3,0,0,1,0,2.953l-.792,1.4a1,1,0,0,0,0,.991l.439.761a1,1,0,0,0,.859.5l1.6.014a3,3,0,0,1,2.564,1.481l.811,1.381a1,1,0,0,0,.862.494h.87a1,1,0,0,0,.863-.494l.811-1.381a3,3,0,0,1,2.563-1.481l1.6-.014a1,1,0,0,0,.859-.5l.438-.761a1,1,0,0,0,0-.991l-.792-1.4a3,3,0,0,1,0-2.953l.792-1.4a1,1,0,0,0,0-.992l-.438-.761a1,1,0,0,0-.859-.5l-1.6-.013a3,3,0,0,1-2.563-1.481L-1979,2.494a1,1,0,0,0-.863-.494h-.87A1,1,0,0,0-1981.6,2.494Zm-2.2,8.006a3.5,3.5,0,0,1,3.5-3.5,3.5,3.5,0,0,1,3.5,3.5,3.5,3.5,0,0,1-3.5,3.5A3.5,3.5,0,0,1-1983.8,10.5Zm2,0a1.5,1.5,0,0,0,1.5,1.5,1.5,1.5,0,0,0,1.5-1.5,1.5,1.5,0,0,0-1.5-1.5A1.5,1.5,0,0,0-1981.8,10.5Z" transform="translate(1990)"/>
                                </svg>
                                Preferences
                            </a>
                        </li>
                        <li>
                            <a @click.prevent="handleRoute('personalization')" href="#" class="w-100 gap-8 flex ai-c bg-transition" :class="{'active-nav' : $route.query.page === 'personalization'}">
                                <svg height="18" viewBox="0 0 19.4 21">
                                    <path d="M-1980.735,21a3,3,0,0,1-2.588-1.481l-.811-1.382a1,1,0,0,0-.855-.493l-1.6-.014a3,3,0,0,1-2.576-1.5l-.439-.76a3,3,0,0,1-.012-2.974l.792-1.4a1,1,0,0,0,0-.985l-.792-1.4a3,3,0,0,1,.012-2.974l.439-.761a3,3,0,0,1,2.576-1.5l1.6-.013a1,1,0,0,0,.855-.493l.811-1.382A3,3,0,0,1-1980.735,0h.87a3,3,0,0,1,2.588,1.481l.811,1.382a1,1,0,0,0,.854.493l1.6.013a3,3,0,0,1,2.576,1.5l.438.761a3,3,0,0,1,.013,2.974l-.792,1.4a1,1,0,0,0,0,.985l.792,1.4a3,3,0,0,1-.013,2.974l-.438.76a3,3,0,0,1-2.576,1.5l-1.6.014a1,1,0,0,0-.854.493l-.811,1.382A3,3,0,0,1-1979.865,21Zm-.862-18.506-.811,1.382a3,3,0,0,1-2.564,1.481l-1.6.013a1,1,0,0,0-.859.5l-.439.761a1,1,0,0,0,0,.992l.792,1.4a3,3,0,0,1,0,2.953l-.792,1.4a1,1,0,0,0,0,.991l.439.761a1,1,0,0,0,.859.5l1.6.014a3,3,0,0,1,2.564,1.481l.811,1.381a1,1,0,0,0,.862.494h.87a1,1,0,0,0,.863-.494l.811-1.381a3,3,0,0,1,2.563-1.481l1.6-.014a1,1,0,0,0,.859-.5l.438-.761a1,1,0,0,0,0-.991l-.792-1.4a3,3,0,0,1,0-2.953l.792-1.4a1,1,0,0,0,0-.992l-.438-.761a1,1,0,0,0-.859-.5l-1.6-.013a3,3,0,0,1-2.563-1.481L-1979,2.494a1,1,0,0,0-.863-.494h-.87A1,1,0,0,0-1981.6,2.494Zm-2.2,8.006a3.5,3.5,0,0,1,3.5-3.5,3.5,3.5,0,0,1,3.5,3.5,3.5,3.5,0,0,1-3.5,3.5A3.5,3.5,0,0,1-1983.8,10.5Zm2,0a1.5,1.5,0,0,0,1.5,1.5,1.5,1.5,0,0,0,1.5-1.5,1.5,1.5,0,0,0-1.5-1.5A1.5,1.5,0,0,0-1981.8,10.5Z" transform="translate(1990)"/>
                                </svg>
                                Personalization
                            </a>
                        </li>
                        <li>
                            <a @click.prevent="handleRoute('security')" href="#" class="w-100 gap-8 flex ai-c bg-transition" :class="{'active-nav' : $route.query.page === 'security'}">
                                <svg height="18" viewBox="0 0 19.4 21">
                                    <path d="M-1980.735,21a3,3,0,0,1-2.588-1.481l-.811-1.382a1,1,0,0,0-.855-.493l-1.6-.014a3,3,0,0,1-2.576-1.5l-.439-.76a3,3,0,0,1-.012-2.974l.792-1.4a1,1,0,0,0,0-.985l-.792-1.4a3,3,0,0,1,.012-2.974l.439-.761a3,3,0,0,1,2.576-1.5l1.6-.013a1,1,0,0,0,.855-.493l.811-1.382A3,3,0,0,1-1980.735,0h.87a3,3,0,0,1,2.588,1.481l.811,1.382a1,1,0,0,0,.854.493l1.6.013a3,3,0,0,1,2.576,1.5l.438.761a3,3,0,0,1,.013,2.974l-.792,1.4a1,1,0,0,0,0,.985l.792,1.4a3,3,0,0,1-.013,2.974l-.438.76a3,3,0,0,1-2.576,1.5l-1.6.014a1,1,0,0,0-.854.493l-.811,1.382A3,3,0,0,1-1979.865,21Zm-.862-18.506-.811,1.382a3,3,0,0,1-2.564,1.481l-1.6.013a1,1,0,0,0-.859.5l-.439.761a1,1,0,0,0,0,.992l.792,1.4a3,3,0,0,1,0,2.953l-.792,1.4a1,1,0,0,0,0,.991l.439.761a1,1,0,0,0,.859.5l1.6.014a3,3,0,0,1,2.564,1.481l.811,1.381a1,1,0,0,0,.862.494h.87a1,1,0,0,0,.863-.494l.811-1.381a3,3,0,0,1,2.563-1.481l1.6-.014a1,1,0,0,0,.859-.5l.438-.761a1,1,0,0,0,0-.991l-.792-1.4a3,3,0,0,1,0-2.953l.792-1.4a1,1,0,0,0,0-.992l-.438-.761a1,1,0,0,0-.859-.5l-1.6-.013a3,3,0,0,1-2.563-1.481L-1979,2.494a1,1,0,0,0-.863-.494h-.87A1,1,0,0,0-1981.6,2.494Zm-2.2,8.006a3.5,3.5,0,0,1,3.5-3.5,3.5,3.5,0,0,1,3.5,3.5,3.5,3.5,0,0,1-3.5,3.5A3.5,3.5,0,0,1-1983.8,10.5Zm2,0a1.5,1.5,0,0,0,1.5,1.5,1.5,1.5,0,0,0,1.5-1.5,1.5,1.5,0,0,0-1.5-1.5A1.5,1.5,0,0,0-1981.8,10.5Z" transform="translate(1990)"/>
                                </svg>
                                Security
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="modal-body-right flex-1 overflow-y-scroll custom-scrollbar">
                    <div class="flex flex-column gap-14 content-right-wrapper">
                        <component v-if="isModalOpen" :is="modalContent" :user="user"></component>
                    </div>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script>
import Modal from './Modal.vue'
import SettingsPreferences from './SettingsPreferences.vue';
import SettingsPersonalization from './SettingsPersonalization.vue';
import SettingsSecurity from './SettingsSecurity.vue';
import SettingsProfile from './SettingsProfile.vue';
import SettingsAccount from './SettingsAccount.vue';
import { mapState } from 'vuex';

export default {
    name: 'SettingsModal',
    components: { Modal, SettingsPreferences, SettingsPersonalization, SettingsSecurity, SettingsProfile, SettingsAccount },
    props: {
        auth: Boolean
    },
    computed: {
        ...mapState({
            user: (state) => state.auth.user
        }),
        isModalOpen() {
            return !!this.$route.query.m;
        },
        pageName() {
            return this.$route.query.page
        },
        modalContent() {
            switch (this.pageName) {
                case 'profile':
                    return 'SettingsProfile';
                case 'account':
                    return 'SettingsAccount';
                case 'preferences':
                    return 'SettingsPreferences';
                case 'personalization':
                    return 'SettingsPersonalization';
                case 'security':
                    return 'SettingsSecurity';
                default:
                    return 'SettingsProfile';
            }
        }
    },
    methods: {
        handleRoute(param) {
            this.$router.push({ query: { ...this.$route.query, m: 'settings', page: param } });
        }
    },
    mounted() {
        !this.auth ? this.$router.push({ query: { m: 'signup' }}) : ''
    }
}
</script>

<style lang="scss" scoped>

#modal_body {
    font-size: .95rem;
}
.modal-body-left {
    width: 180px;
    padding-left: 20px;
}
.modal-body-right {
    padding-right: 30px;
    padding-left: 10px;
    max-height: calc(90dvh - 49px);
}
.content-right-wrapper {
    padding: 16px 0 32px 0;
}
ul {
    padding: 20px 0;
    margin-left: -10px;
    a {
        height: 38px;
        padding: 0 18px 0 12px;
        border-radius: 40px;
        white-space: nowrap;
        &:hover {
            background-color: var(--light-surface-hover);
        }
    }
    
}
.desktop,.tablet {
    a.active-nav {
        background-color: var(--light-surface-active);
    }
}

.mobile {
    .modal-body-right {
        max-height: calc(90dvh - 109px);
    }
    #modal_body {
        flex-direction: column;
    }
    ul {
        margin-left: 0;
        flex-direction: row;
        position: sticky;
        top: 500px;
        padding: 8px 20px;
    }
    .gap-32 {
        gap: 0;
    }
    .modal-body-right {
        padding-left: 20px;
        padding-right: 20px;

    }
    .content-right-wrapper {
        padding: 8px 0 40px 0;
    }
    .modal-body-left {
        width: 100%;
        padding-left: 0;
        padding-right: 0;
    }
    a.active-nav {
        background-color: var(--main-background-secondary);
        color: var(--main-background-primary);
        path {
            fill: var(--main-background-primary);
        }
        &:active {
            background-color: var(--main-background-secondary-hover);
        }
    }
}
</style>