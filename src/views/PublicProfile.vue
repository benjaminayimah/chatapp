<template>
    <div class="flex chat-body-wrapper flex-1 jc-c overflow-y-scroll">
      <div class="chat-wrapper flex-1">
        <div class="centered gap-24">
            <div class="flex ai-c flex-column gap-16 profile-header">
                <profile-avatar :user="user" :dimension="100" />
                <p class="fs-105rem fw-600">{{ user.name }}</p>
                <div class="flex ai-c gap-4">
                    <button class="bg-transparent fs-09">0 Followers</button>
                    <span>&#8231;</span> 
                    <button class="bg-transparent fs-09">0 Following</button>
                </div>
                <p class="flex gap-8">
                    <button v-if="auth" @click="openSettings" class="button-outline update-info fw-600 fs-09 gap-8">
                        <svg height="16" viewBox="0 0 29.001 27.682">
                            <path d="M-3768.3-858.611a1,1,0,0,1-.264-.95l1.5-6a1.007,1.007,0,0,1,.264-.464l18.75-18.75a4.154,4.154,0,0,1,2.957-1.225,4.156,4.156,0,0,1,2.958,1.225,4.187,4.187,0,0,1,0,5.914l-18.751,18.75a.988.988,0,0,1-.464.263l-6,1.5a.99.99,0,0,1-.243.03A1,1,0,0,1-3768.3-858.611Zm21.664-24.75-18.554,18.554-1.029,4.115,4.114-1.029,18.555-18.554a2.186,2.186,0,0,0,0-3.086,2.167,2.167,0,0,0-1.543-.639A2.167,2.167,0,0,0-3746.636-883.361Zm-7.457,25.043a1,1,0,0,1-1-1,1,1,0,0,1,1-1h13.5a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z" transform="translate(3768.594 886)" fill="#fff"/>
                        </svg>
                        Update info
                    </button>
                    <button v-else class="button-primary default fw-600 fs-09">
                        Follow
                    </button>
                    <button @click="share" class="button-outline share jc-c">
                        <svg height="16" viewBox="0 0 14.695 17">
                            <path d="M-3108.6-693.224a2.673,2.673,0,0,1-2.67-2.67,2.683,2.683,0,0,1,.075-.632l-5.614-2.959a2.651,2.651,0,0,1-1.146.258,2.674,2.674,0,0,1-2.671-2.671,2.673,2.673,0,0,1,2.671-2.67,2.676,2.676,0,0,1,1.68.6l4.986-2.91a.786.786,0,0,1,.094-.047,2.667,2.667,0,0,1-.074-.625,2.672,2.672,0,0,1,2.669-2.669,2.672,2.672,0,0,1,2.669,2.669,2.672,2.672,0,0,1-2.669,2.669,2.658,2.658,0,0,1-1.822-.721.807.807,0,0,1-.087.059l-4.895,2.857a2.681,2.681,0,0,1,.119.792,2.673,2.673,0,0,1-.335,1.292l5.21,2.747a2.652,2.652,0,0,1,1.809-.7,2.673,2.673,0,0,1,2.67,2.67A2.673,2.673,0,0,1-3108.6-693.224Zm-.961-3.251a1.117,1.117,0,0,0-.162.581,1.125,1.125,0,0,0,1.123,1.123,1.125,1.125,0,0,0,1.123-1.123,1.125,1.125,0,0,0-1.123-1.123,1.118,1.118,0,0,0-.956.533Zm-8.393-6.547a1.125,1.125,0,0,0-1.124,1.123,1.126,1.126,0,0,0,1.124,1.124,1.112,1.112,0,0,0,.655-.211l.021-.015a1.115,1.115,0,0,0,.448-.9,1.115,1.115,0,0,0-.208-.651h0A1.127,1.127,0,0,0-3117.953-703.022Zm9.355-5.656a1.124,1.124,0,0,0-1.122,1.122,1.124,1.124,0,0,0,1.122,1.122,1.124,1.124,0,0,0,1.123-1.122A1.124,1.124,0,0,0-3108.6-708.678Z" transform="translate(3120.624 710.224)"/>
                        </svg>
                    </button>
                </p>
            </div>
            <ul class="flex gap-8">
                <li><a @click.prevent="handleRoute('avatar')" href="#"  :class="{'active-tab' : $route.query.tab === 'avatar' ||  $route.query.tab == null || !auth }">{{ auth ? 'My avatars' : 'Avatars' }}</a></li>
                <li v-if="auth"><a @click.prevent="handleRoute('liked')" href="#" :class="{'active-tab' : $route.query.tab === 'liked'}">Liked</a></li>
            </ul>
            <section>
                <component :is="modalContent" :auth="auth"></component>
            </section>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import ProfileAvatarTab from './fragments/ProfileAvatarTab.vue';
import ProfileLikedTab from './fragments/ProfileLikedTab.vue';
import ProfileAvatar from '@/components/ProfileAvatar.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'PublicProfile',
    components: { ProfileAvatarTab, ProfileLikedTab, ProfileAvatar},
    computed: {
        ...mapGetters(['auth']),
        tabName() {
            return this.$route.query.tab || 'avatar'; 
        },
        modalContent() {
            const tabMapping = {
                avatar: 'ProfileAvatarTab',
                liked: 'ProfileLikedTab',
            };
            if (!this.auth && this.tabName === 'liked') {
                return 'ProfileAvatarTab';
            }
            return tabMapping[this.tabName] || 'ProfileAvatarTab'; 
        }
    },
    watch: {
        '$route.params.user'(newUser) {
            this.fetchThisUser(newUser);
        }
    },
    data() {
        return {
            user: {
                name: 'JohnDoe1234',
                color: '#7854da'
            }
        }
    },
    methods: {
        openSettings() {
            this.$router.push({ query: { ...this.$route.query, m: 'settings', page: 'avatar' } });
        },
        handleRoute(param) {
            this.$router.push({query: { tab: param }})

        },
        share() {
            //
        },
        fetchThisUser(user) {
            console.log(user)
        }
    },
    mounted() {
        this.fetchThisUser(this.$route.params.user)
    }
}
</script>
<style lang="scss" scoped>
.chat-wrapper {
    max-width: 1080px;
    padding: 60px 20px 0 20px;
}
button:not(.bg-transparent){
    height: 40px;
}
button.update-info {
    padding: 0 16px
}
button.share {
    width: 40px;
}
button.bg-transparent {
    color: var(--main-font-color-2);
    height: 30px;
    &:hover {
        color: var(--main-font-color-primary);
    }
    &:active {
        outline: unset;
        background-color: var(--main-background-light);
    }
}
li {
    padding: 2px 0;
    a {
        padding: 6px 8px;
        color: var(--font-color-2);
        &:hover {
            color: var(--main-font-color-primary);
        }
    }
}

li:has(.active-tab) {
    border-bottom: 1.5px solid var(--main-font-color-2);
    a {
        font-weight: 600;
        color: var(--main-font-color-primary);
    }
}

</style>
