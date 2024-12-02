<template>
    <div ref="scrollContainer" class="flex flex-1 jc-c">
      <div class="main-wrapper flex-1">
        <div v-if="!user && fetching" class="centered gap-24">
            <profile-page-skeleton />
        </div>
        <div v-else-if="user" class="centered gap-24">
            <div class="flex ai-c flex-column gap-16 profile-header">
                <profile-avatar
                    :image="user.picture"
                    :width="100"
                    :height="100"
                    :color="user.color"
                    :name="user.username"
                    :fontSize="2"
                    :upload="false"
                />
                <p class="fs-105 fw-600 flex ai-c gap-4">
                    <span>{{ user.username }}</span>
                     <span v-if="user.verified">
                        <svg height="15" viewBox="0 0 15 14.999">
                            <path class="invert-fill-color" d="M-1967.478,2a2.835,2.835,0,0,1-1.142-.239,3.052,3.052,0,0,1-.807-.527A3.417,3.417,0,0,1-1969.9.7a2.391,2.391,0,0,1-.155-.239,3.759,3.759,0,0,1-.56.042h-.052a4.092,4.092,0,0,1-.535-.036,3.273,3.273,0,0,1-.621-.144,2.252,2.252,0,0,1-1.138-.815,3.334,3.334,0,0,1-.48-.939,2.945,2.945,0,0,1-.14-.8,2.727,2.727,0,0,1,.037-.552,1.684,1.684,0,0,1,.049-.206,2.431,2.431,0,0,1-.241-.16,3.469,3.469,0,0,1-.527-.486,2.984,2.984,0,0,1-.518-.817A2.746,2.746,0,0,1-1975-5.6a2.814,2.814,0,0,1,.255-1.123,2.7,2.7,0,0,1,.514-.747,2.914,2.914,0,0,1,.505-.415,2.018,2.018,0,0,1,.229-.129,2.713,2.713,0,0,1-.042-.282,3.587,3.587,0,0,1,0-.7,2.988,2.988,0,0,1,.237-.912,2.632,2.632,0,0,1,.664-.905,3,3,0,0,1,1.035-.607,2.782,2.782,0,0,1,.889-.146,2.66,2.66,0,0,1,.485.044,1.44,1.44,0,0,1,.182.044,2.087,2.087,0,0,1,.15-.233,3.377,3.377,0,0,1,.458-.516,3.019,3.019,0,0,1,.78-.521,2.755,2.755,0,0,1,1.114-.251h.058a2.63,2.63,0,0,1,1.1.238,3.032,3.032,0,0,1,.788.523,3.586,3.586,0,0,1,.474.523,2.437,2.437,0,0,1,.157.238,3.349,3.349,0,0,1,.642-.063h.026a3.618,3.618,0,0,1,.5.035,3.07,3.07,0,0,1,.56.132,2.5,2.5,0,0,1,1.093.73,2.914,2.914,0,0,1,.719,1.78,2.932,2.932,0,0,1-.032.615,1.938,1.938,0,0,1-.05.238,2.4,2.4,0,0,1,.232.144,3.3,3.3,0,0,1,.512.445,2.874,2.874,0,0,1,.518.764,2.7,2.7,0,0,1,.25,1.1,2.651,2.651,0,0,1-.224,1.12,3.063,3.063,0,0,1-.521.806,3.555,3.555,0,0,1-.527.487,2.313,2.313,0,0,1-.24.164,2.067,2.067,0,0,1,.046.244,3.07,3.07,0,0,1,.014.63,2.93,2.93,0,0,1-.2.859,2.989,2.989,0,0,1-.6.934,2.707,2.707,0,0,1-2.022.858,3.09,3.09,0,0,1-.5-.04,1.937,1.937,0,0,1-.192-.04,2,2,0,0,1-.13.236,2.875,2.875,0,0,1-.422.522,2.683,2.683,0,0,1-.76.526,2.792,2.792,0,0,1-1.146.25h-.054Zm-2.888-8.275h0l-.889.877,2.865,2.878,4.644-4.651-.869-.909-3.775,3.775-1.976-1.97Z" transform="translate(1975 13)" fill="#0085ff"/>
                        </svg>
                    </span>
                </p>
                <div class="flex ai-c gap-4">
                    <button class="bg-transparent fs-09 ai-c">0 Followers</button>
                    <span class="fs-105 dot">&#8231;</span> 
                    <button class="bg-transparent fs-09 ai-c">0 Following</button>
                </div>
                <p class="flex gap-8">
                    <button v-if="isOwner" @click="openSettings" class="button-outline ai-c update-info fw-600 fs-09 gap-8">
                        <svg height="16" viewBox="0 0 29.001 27.682">
                            <path d="M-3768.3-858.611a1,1,0,0,1-.264-.95l1.5-6a1.007,1.007,0,0,1,.264-.464l18.75-18.75a4.154,4.154,0,0,1,2.957-1.225,4.156,4.156,0,0,1,2.958,1.225,4.187,4.187,0,0,1,0,5.914l-18.751,18.75a.988.988,0,0,1-.464.263l-6,1.5a.99.99,0,0,1-.243.03A1,1,0,0,1-3768.3-858.611Zm21.664-24.75-18.554,18.554-1.029,4.115,4.114-1.029,18.555-18.554a2.186,2.186,0,0,0,0-3.086,2.167,2.167,0,0,0-1.543-.639A2.167,2.167,0,0,0-3746.636-883.361Zm-7.457,25.043a1,1,0,0,1-1-1,1,1,0,0,1,1-1h13.5a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z" transform="translate(3768.594 886)" fill="#fff"/>
                        </svg>
                        Edit profile
                    </button>
                    <button v-else class="button-primary default fw-600 fs-09 ai-c">
                        Follow
                    </button>
                    <button @click="share" class="button-outline share jc-c ai-c">
                        <svg height="16" viewBox="0 0 14.695 17">
                            <path d="M-3108.6-693.224a2.673,2.673,0,0,1-2.67-2.67,2.683,2.683,0,0,1,.075-.632l-5.614-2.959a2.651,2.651,0,0,1-1.146.258,2.674,2.674,0,0,1-2.671-2.671,2.673,2.673,0,0,1,2.671-2.67,2.676,2.676,0,0,1,1.68.6l4.986-2.91a.786.786,0,0,1,.094-.047,2.667,2.667,0,0,1-.074-.625,2.672,2.672,0,0,1,2.669-2.669,2.672,2.672,0,0,1,2.669,2.669,2.672,2.672,0,0,1-2.669,2.669,2.658,2.658,0,0,1-1.822-.721.807.807,0,0,1-.087.059l-4.895,2.857a2.681,2.681,0,0,1,.119.792,2.673,2.673,0,0,1-.335,1.292l5.21,2.747a2.652,2.652,0,0,1,1.809-.7,2.673,2.673,0,0,1,2.67,2.67A2.673,2.673,0,0,1-3108.6-693.224Zm-.961-3.251a1.117,1.117,0,0,0-.162.581,1.125,1.125,0,0,0,1.123,1.123,1.125,1.125,0,0,0,1.123-1.123,1.125,1.125,0,0,0-1.123-1.123,1.118,1.118,0,0,0-.956.533Zm-8.393-6.547a1.125,1.125,0,0,0-1.124,1.123,1.126,1.126,0,0,0,1.124,1.124,1.112,1.112,0,0,0,.655-.211l.021-.015a1.115,1.115,0,0,0,.448-.9,1.115,1.115,0,0,0-.208-.651h0A1.127,1.127,0,0,0-3117.953-703.022Zm9.355-5.656a1.124,1.124,0,0,0-1.122,1.122,1.124,1.124,0,0,0,1.122,1.122,1.124,1.124,0,0,0,1.123-1.122A1.124,1.124,0,0,0-3108.6-708.678Z" transform="translate(3120.624 710.224)"/>
                        </svg>
                    </button>
                </p>
            </div>
            <ul class="flex gap-8 tab-default">
                <li><router-link :to="{query: { tab: 'agents' }}"  :class="{'active-tab' : $route.query.tab === 'agents' ||  $route.query.tab == null || !isOwner }">{{ isOwner ? 'My Agents' : 'Agents' }}</router-link></li>
                <li v-if="isOwner"><router-link :to="{query: { tab: 'favourites' }}" :class="{'active-tab' : $route.query.tab === 'favourites'}">Favourites</router-link></li>
            </ul>
            <section class="flex pd-b-32 jc-c">
                <component
                    :is="modalContent"
                    :isOwner="isOwner"
                    :isLoading="isLoading"
                    :user="user"
                    :favourites="favourites"
                    :activeSort="activeSort"
                    @sort-item="sortItem"
                ></component>
            </section>
            <!-- <button v-if="this.user.Agents.length != this.total" @click="fetchMoreAgents" class="jc-c ai-c pd-8">More</button> -->
        </div>
        
        <div v-else class="centered gap-24">
            <profile-page-skeleton />
            <empty-state
                :message="computedMessage"
                :button="false"
            />
            <router-link :to="{ name: 'Home' }" class="a-button button-primary default ai-c jc-c fw-600  fs-09">Back home</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import api from '@/services/apis';
import ProfileAgentTab from './fragments/ProfileAgentTab.vue';
import ProfileSavedTab from './fragments/ProfileSavedTab.vue';
import ProfileAvatar from '@/components/ProfileAvatar.vue';
import { mapGetters, mapState } from 'vuex';
import errorHandlerMixin from '@/mixins/errorHandlerMixin';
import EmptyState from '@/components/EmptyState.vue';
import ProfilePageSkeleton from '@/loaders/ProfilePageSkeleton.vue';
import ResponseSkeleton from '@/loaders/ResponseSkeleton.vue';

export default {
    name: 'PublicProfile',
    components: { ProfileAgentTab, ProfileSavedTab, ProfileAvatar, EmptyState, ProfilePageSkeleton, ResponseSkeleton },
    mixins: [errorHandlerMixin],
    computed: {
        ...mapGetters(['auth']),
        ...mapState({
            user: (state) => state.userProfile,
            authUser: (state) => state.auth.user,
            alert: (state) => state.alert,
            favourites: (state) => state.favourites
        }),
        isOwner() {
            return !!(this.authUser && this.authUser.username === this.user.username)
        },
        tabName() {
            return this.$route.query.tab || 'agents'; 
        },
        modalContent() {
            const tabMapping = {
                agents: 'ProfileAgentTab',
                favourites: 'ProfileSavedTab',
            };
            if (!this.auth && this.tabName === 'favourites') {
                return 'ProfileAgentTab';
            }
            return tabMapping[this.tabName] || 'ProfileAgentTab'; 
        },
        computedMessage() {
            const message = {
                heading: this.responseStatusText,
                body: 'An error occurred while fetching this page',
            }
            return message
        },
        computedNoData() {
            return !!(this.user.agents.length === this.total)
        }
        
    },
    watch: {
        '$route.params.username'(newUser) {
            this.fetchThisUser(newUser)
        }
    },
    data() {
        return {
            // currentPage: 2,
            // limit: 50,
            // total: 0,

            agents: [],
            isLoading: false,
            activeSort: 'newest'
        }
    },
    methods: {
        openSettings() {
            this.$router.push({ query: { ...this.$route.query, m: 'settings', page: 'profile' } });
        },
        share() {
            //
        },
        async fetchThisUser(user) {
            try {
                const res = await api.get('/user/profile/'+ user)
                this.$store.commit('setUserProfile', res.data)
            } catch (err) {
                this.handleError(err)
            } finally {
                this.stopFetching()
            }
        },
        async fetchFavourites() {
            try {
                const res = await api.get('/favourite')
                this.$store.commit('setFavourites', res.data.favourites)
                console.log(res.data.favourites)
            } catch (err) {
                this.handleError(err)
            } finally {
                this.stopFetching()
            }
        },
        // async handleScroll() {
        //     const container = this.$refs.scrollContainer;
        //     const scrollTop = container.scrollTop;
        //     const scrollHeight = container.scrollHeight;
        //     const containerHeight = container.clientHeight;

        //     // Check if scrolled near the bottom
        //     if (scrollTop + containerHeight >= scrollHeight - 1) {
        //         this.fetchMoreAgents(); // Fetch more posts
        //         console.log('Attemp fetch')
        //     }
        // },


        // async fetchMoreAgents() {

        //     if (this.isLoading || this.computedNoData) {
        //         this.$refs.scrollContainer.removeEventListener('scroll', this.handleScroll);
        //         return
        //     }
        //     this.isLoading = true;

        //     try {
        //         const body = {
        //             page: this.currentPage,
        //             limit: this.limit,
        //             userId: this.user.id
        //         }
        //         const res = await api.post('/agent/more_agents', body )

        //         this.$store.commit('addToAgents', res.data.agents)
        //         this.total = res.data.total
        //         this.currentPage++
                
        //     } catch (err) {
        //         this.handleError(err)
        //     } finally {
        //         this.isLoading = false;
        //     }
        // },

        // removeScrollListerner(noData) {
        //     noData ? this.$refs.scrollContainer.removeEventListener('scroll', this.handleScroll): ''
        // },
        sortItem(item) {
            this.activeSort = item
        }
    },
    mounted() {
        this.fetchThisUser(this.$route.params.username)
        this.auth ? this.fetchFavourites() : ''
        // this.$refs.scrollContainer.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        // this.$refs.scrollContainer.removeEventListener('scroll', this.handleScroll);
    }
}
</script>
<style lang="scss" scoped>
.main-wrapper {
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
section {
    width: 500px;
}
@media (max-width: 540px) {
    section {
        width: 100%;
    }
}

</style>
