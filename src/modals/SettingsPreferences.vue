<template>
    <h4 class="settings-tab-title">Preferences</h4>
    <div class="flex jc-sb ai-c">
        <div>Theme</div>
        <div class="flex flex-wrap gap-4">
            <button id="theme_toggler" @click="handleDropdown('theme_toggler', 'theme')" class="button-outline default fs-095 gap-4 ai-c">
                {{ computedTheme.name }}
                <svg height="6" viewBox="0 0 10 5.714">
                    <path d="M1.533,10a.714.714,0,0,1-.505-1.219L4.809,5,1.028,1.22A.714.714,0,0,1,2.038.21L6.324,4.5a.714.714,0,0,1,0,1.01L2.038,9.791A.712.712,0,0,1,1.533,10Z" transform="translate(10.001 -0.819) rotate(90)"/>
                </svg>
            </button>
        </div>
    </div>
    <hr class="w-100">
    <div class="flex jc-sb ai-c">
        <div>Language</div>
        <div class="flex flex-wrap gap-4">
            <button id="language_toggler" @click="handleDropdown('language_toggler', 'language')" class="button-outline default fs-095 gap-4 ai-c">
                {{ language.name }}
                <svg height="6" viewBox="0 0 10 5.714">
                    <path d="M1.533,10a.714.714,0,0,1-.505-1.219L4.809,5,1.028,1.22A.714.714,0,0,1,2.038.21L6.324,4.5a.714.714,0,0,1,0,1.01L2.038,9.791A.712.712,0,0,1,1.533,10Z" transform="translate(10.001 -0.819) rotate(90)"/>
                </svg>
            </button>
        </div>
    </div>
    <teleport to="body">
        <backdrop @click="handleDropdown('theme_toggler', null)" v-if="dropdownToggle" :opacity="0" :zindex="501" />
        <div v-if="dropdownType === 'theme'" class="dropdown bg-transition fixed" :style="{ top: dropdown.top + 40 + 'px', left: dropdown.left + 'px'}">
            <ul>
                <div @click="handleDropdown('theme_toggler', null)">
                    <a v-for="(theme, index) in themes" :key="index" @click.prevent="!theme.system ? $store.commit('setTheme', theme.id): $store.commit(theme.key)" href="#" class="flex ai-c gap-8 jc-sb">
                        {{ theme.name }}
                        <svg v-if="currentTheme === theme.id " width="13" height="13" viewBox="0 0 13 13">
                            <path d="M-1983.5,13a6.458,6.458,0,0,1-4.6-1.9,6.458,6.458,0,0,1-1.9-4.6,6.457,6.457,0,0,1,1.9-4.6,6.458,6.458,0,0,1,4.6-1.9,6.458,6.458,0,0,1,4.6,1.9,6.457,6.457,0,0,1,1.9,4.6,6.458,6.458,0,0,1-1.9,4.6A6.458,6.458,0,0,1-1983.5,13Zm-3.107-6.854a.461.461,0,0,0-.332.14.464.464,0,0,0,.009.656l2.269,2.244a.462.462,0,0,0,.324.132h.023a.465.465,0,0,0,.332-.165l3.946-4.707a.461.461,0,0,0,.106-.338.46.46,0,0,0-.164-.314.464.464,0,0,0-.3-.109.463.463,0,0,0-.355.166l-3.624,4.325-1.912-1.895A.461.461,0,0,0-1986.607,6.146Z" transform="translate(1990)" fill="#fff"/>
                        </svg>
                    </a>
                </div>
            </ul>
        </div>
        <div v-if="dropdownType === 'language'" class="dropdown bg-transition fixed" :style="{ top: dropdown.top + 40 + 'px', left: dropdown.left + 'px'}">
            <ul>
                <div @click="handleDropdown('theme_toggler', null)">
                    <a v-for="(language, index) in languages" :key="index" href="#" class="flex ai-c gap-8 jc-sb">
                        {{ language.name }}
                        <svg v-if="language.key === language.key" height="13" viewBox="0 0 13 13">
                            <path d="M-1983.5,13a6.458,6.458,0,0,1-4.6-1.9,6.458,6.458,0,0,1-1.9-4.6,6.457,6.457,0,0,1,1.9-4.6,6.458,6.458,0,0,1,4.6-1.9,6.458,6.458,0,0,1,4.6,1.9,6.457,6.457,0,0,1,1.9,4.6,6.458,6.458,0,0,1-1.9,4.6A6.458,6.458,0,0,1-1983.5,13Zm-3.107-6.854a.461.461,0,0,0-.332.14.464.464,0,0,0,.009.656l2.269,2.244a.462.462,0,0,0,.324.132h.023a.465.465,0,0,0,.332-.165l3.946-4.707a.461.461,0,0,0,.106-.338.46.46,0,0,0-.164-.314.464.464,0,0,0-.3-.109.463.463,0,0,0-.355.166l-3.624,4.325-1.912-1.895A.461.461,0,0,0-1986.607,6.146Z" transform="translate(1990)" fill="#fff"/>
                        </svg>
                    </a>
                </div>
            </ul>
        </div>
    </teleport>
</template>

<script>
import { mapState } from 'vuex';
import dropdownMixin from '@/mixins/dropdownMixin';
import Backdrop from '@/components/Backdrop.vue';

export default {
    name: 'SettingsPreferences',
    components: { Backdrop },
    props: {
        user: Object
    },
    mixins: [dropdownMixin],
    computed: {
        ...mapState({
            themes: (state) => state.preferences.themes,
            currentTheme: (state) => state.preferences.currentTheme,
            languages: (state) => state.dropdown.languages,
            language: (state) => state.dropdown.language
        }),
        computedTheme() {
            return this.themes.find(theme => theme.id === this.currentTheme)
        }
    },
    data() {
        return {
            dropdownToggle: false,
            dropdownType: ''
        }
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>

.mobile {
    .dropdown {
        right: 40px !important;
        left: unset !important;
    }
}


.dropdown {
    width: 200px;
    z-index: 502;
    background-color: var(--modal-main-background-2);
    font-size: 0.95rem;
    a {
        padding: 5px 12px 5px 16px;
        &:hover {
            background-color: var(--button-press-bg);
        }
    }
}


</style>