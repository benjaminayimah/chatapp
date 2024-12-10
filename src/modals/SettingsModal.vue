<template>
    <Modal :opacity=".5" :zindex="500" :width="700" :minHeight="50">
        <template #header>
            <h4>Settings</h4>
        </template>
        <template #body>
            <div class="flex gap-32" id="modal_body">
                <div class="modal-body-left">
                    <ul class="flex flex-column gap-4 overflow-x-scroll scroll-hidden">
                        <li>
                            <a @click.prevent="handleRoute('profile')" href="#" class="w-100 gap-8 flex ai-c bg-transition" :class="{'active-nav' : $route.query.page === 'profile' ||  $route.query.page == null }">
                                <svg viewBox="0 0 18.494 15.581">
                                    <path d="M-1978.576,15.18a5.086,5.086,0,0,1-1.617-1.09,5.077,5.077,0,0,1-1.09-1.617,5.06,5.06,0,0,1-.4-1.982,5.059,5.059,0,0,1,.4-1.981,5.077,5.077,0,0,1,1.09-1.617,5.086,5.086,0,0,1,1.617-1.09,5.063,5.063,0,0,1,1.981-.4,5.052,5.052,0,0,1,1.981.4A5.07,5.07,0,0,1-1973,6.893a5.063,5.063,0,0,1,1.09,1.617,5.059,5.059,0,0,1,.4,1.981,5.061,5.061,0,0,1-.4,1.982A5.063,5.063,0,0,1-1973,14.09a5.07,5.07,0,0,1-1.618,1.09,5.052,5.052,0,0,1-1.981.4A5.063,5.063,0,0,1-1978.576,15.18Zm3.033-.658a4.144,4.144,0,0,0,1.893-1.086,4.138,4.138,0,0,0,1.194-2.482h-1.849A7.543,7.543,0,0,1-1975.543,14.522Zm-4-1.086a4.138,4.138,0,0,0,1.893,1.085,7.535,7.535,0,0,1-1.238-3.568h-1.849A4.14,4.14,0,0,0-1979.539,13.436Zm2.944.965a6.612,6.612,0,0,0,1.362-3.447h-2.723A6.618,6.618,0,0,0-1976.6,14.4Zm2.291-4.372h1.849a4.138,4.138,0,0,0-1.194-2.481,4.136,4.136,0,0,0-1.893-1.086A7.54,7.54,0,0,1-1974.3,10.029Zm-3.651,0h2.723a6.621,6.621,0,0,0-1.363-3.446A6.618,6.618,0,0,0-1977.956,10.029Zm-1.583-2.481a4.14,4.14,0,0,0-1.194,2.481h1.849a7.538,7.538,0,0,1,1.238-3.568A4.14,4.14,0,0,0-1979.539,7.547Zm-9.54,8.031a.928.928,0,0,1-.921-.9,5.406,5.406,0,0,1,1.54-3.622,7.755,7.755,0,0,1,5.531-2.026,6.518,6.518,0,0,0-.166,1.463c0,.128,0,.257.012.385a5.876,5.876,0,0,0-4.061,1.465,3.54,3.54,0,0,0-1.014,2.3.922.922,0,0,1-.9.941Zm3.03-11.748A3.833,3.833,0,0,1-1982.22,0a3.835,3.835,0,0,1,3.83,3.83,3.8,3.8,0,0,1-.023.418,6.513,6.513,0,0,0-4.031,3.4h0A3.832,3.832,0,0,1-1986.049,3.83Zm1.84,0a1.99,1.99,0,0,0,1.988,1.988,1.991,1.991,0,0,0,1.989-1.988,1.991,1.991,0,0,0-1.989-1.988A1.99,1.99,0,0,0-1984.208,3.83Z" transform="translate(1990)" fill="#191b1f"/>
                                </svg>
                                Public profile
                            </a>
                        </li>
                        <li>
                            <a @click.prevent="handleRoute('account')" href="#" class="w-100 gap-8 flex ai-c bg-transition" :class="{'active-nav' : $route.query.page === 'account' }">
                                <svg viewBox="0 0 18.176 15.581">
                                    <path d="M-1976.963,15.508a8.072,8.072,0,0,1-4.4-7.561.953.953,0,0,1,.589-.881l3.817-1.59a.959.959,0,0,1,.733,0l3.817,1.59a.956.956,0,0,1,.587.881,8.033,8.033,0,0,1-4.405,7.561.961.961,0,0,1-.367.073A.955.955,0,0,1-1976.963,15.508Zm.369-1.233a6.813,6.813,0,0,0,3.5-6.117l-3.5-1.457Zm-12.486,1.3a.928.928,0,0,1-.921-.9,5.406,5.406,0,0,1,1.54-3.622,7.755,7.755,0,0,1,5.531-2.026,6.518,6.518,0,0,0-.166,1.463c0,.128,0,.257.012.385a5.876,5.876,0,0,0-4.061,1.465,3.54,3.54,0,0,0-1.014,2.3.922.922,0,0,1-.9.941Zm3.03-11.748A3.833,3.833,0,0,1-1982.22,0a3.835,3.835,0,0,1,3.83,3.83,3.8,3.8,0,0,1-.023.418,6.513,6.513,0,0,0-4.031,3.4h0A3.832,3.832,0,0,1-1986.049,3.83Zm1.84,0a1.99,1.99,0,0,0,1.988,1.988,1.991,1.991,0,0,0,1.989-1.988,1.991,1.991,0,0,0-1.989-1.988A1.99,1.99,0,0,0-1984.208,3.83Z" transform="translate(1990)" fill="#191b1f"/>
                                </svg>
                                Account
                            </a>
                        </li>
                        <li>
                            <a @click.prevent="handleRoute('preferences')" href="#" class="w-100 gap-8 flex ai-c bg-transition" :class="{'active-nav' : $route.query.page === 'preferences' }">
                                <svg viewBox="0 0 15.5 15.5">
                                    <path d="M-1990,7.75A7.759,7.759,0,0,1-1982.25,0a7.759,7.759,0,0,1,7.75,7.75,7.759,7.759,0,0,1-7.75,7.75A7.759,7.759,0,0,1-1990,7.75Zm1.5,0A6.257,6.257,0,0,0-1982.25,14,6.257,6.257,0,0,0-1976,7.75a6.257,6.257,0,0,0-6.25-6.25A6.257,6.257,0,0,0-1988.5,7.75Zm6.249,4.75A4.756,4.756,0,0,1-1987,7.75,4.756,4.756,0,0,1-1982.25,3v9.5h0Z" transform="translate(1990)"/>
                                </svg>
                                Preferences
                            </a>
                        </li>
                        <li>
                            <a @click.prevent="handleRoute('security')" href="#" class="w-100 gap-8 flex ai-c bg-transition" :class="{'active-nav' : $route.query.page === 'security'}">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 21.197">
                                    <path d="M12.4,3.767a1,1,0,0,0-.8,0l-6,2.625a1,1,0,0,0-.6.916V13a6.972,6.972,0,0,0,1.638,4.5,7,7,0,0,1,10.724,0A6.971,6.971,0,0,0,19,13V7.308a1,1,0,0,0-.6-.916ZM15.87,18.834a5,5,0,0,0-7.74,0c1.109.737,2.439,2.019,3.87,2.019S14.762,19.571,15.87,18.834ZM10.8,1.935a3,3,0,0,1,2.405,0l6,2.625A3,3,0,0,1,21,7.308V13c0,4.971-5.675,9.88-9,9.88S3,17.971,3,13V7.308A3,3,0,0,1,4.8,4.56ZM12,8.5a1.75,1.75,0,1,0,1.75,1.75A1.75,1.75,0,0,0,12,8.5ZM8.25,10.25A3.75,3.75,0,1,1,12,14,3.75,3.75,0,0,1,8.25,10.25Z" transform="translate(-3 -1.683)" fill-rule="evenodd"/>
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
import SettingsSecurity from './SettingsSecurity.vue';
import SettingsProfile from './SettingsProfile.vue';
import SettingsAccount from './SettingsAccount.vue';
import { mapState } from 'vuex';

export default {
    name: 'SettingsModal',
    components: { Modal, SettingsPreferences, SettingsSecurity, SettingsProfile, SettingsAccount },
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
    height: calc(90dvh - 250px);
}
.content-right-wrapper {
    padding: 24px 0 32px 0;
}
ul {
    padding: 20px 0;
    margin-left: -10px;
    a {
        height: 40px;
        padding: 0 18px 0 12px;
        border-radius: 40px;
        white-space: nowrap;
        &:hover {
            background-color: var(--light-surface-hover);
        }
    }
    svg {
        height: 16px;
        width: 16px
    }
    
}

a.active-nav {
    background-color: var(--light-surface-active) !important;
}

.mobile {
    .modal-body-right {
        max-height: calc(90dvh - 109px);
        min-height: calc(90dvh - 109px);

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
        gap: 0;
    }
    .gap-32 {
        gap: 0;
    }
    .modal-body-right {
        padding-left: 20px;
        padding-right: 20px;

    }
    .modal-body-left {
        width: 100%;
        padding-left: 0;
        padding-right: 0;
    }
}
</style>