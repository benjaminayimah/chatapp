<template>
    <div ref="scrollContainer" class="flex flex-1 jc-c">
      <div class="main-wrapper flex-1">
        <div v-if="!user && onLoadFetch" class="centered gap-24">
            <profile-page-skeleton />
        </div>
        <div v-else-if="user" class="centered gap-24">
            <div class="flex ai-c flex-column gap-8 profile-header">
                <profile-avatar
                    :image="user.image"
                    :width="100"
                    :height="100"
                    :color="user.color"
                    :name="user.displayName"
                    :fontSize="2"
                    :upload="false"
                />
                <div class="flex ai-c flex-column">
                    <span class="fs-105 fw-600 gap-4 flex ai-c">
                        <span>{{ user.displayName }}</span>
                        <span v-if="user.hasUpgraded" v-html="verifiedIcon(15)"></span>
                    </span>
                    <strong class="fs-08 h-2">@{{ user.username }}</strong>
                </div>
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
import formMixin from '@/mixins/formMixin';
import userMixin from '@/mixins/userMixin';
import titleMixin from '@/mixins/titleMixin';
import EmptyState from '@/components/EmptyState.vue';
import ProfilePageSkeleton from '@/loaders/ProfilePageSkeleton.vue';
import ResponseSkeleton from '@/loaders/ResponseSkeleton.vue';

export default {
    name: 'PublicProfile',
    components: { ProfileAgentTab, ProfileSavedTab, ProfileAvatar, EmptyState, ProfilePageSkeleton, ResponseSkeleton },
    mixins: [formMixin, userMixin, titleMixin],
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
            pageTitle: `@${this.$route.params.username}`,
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
                this.pageTitle = `${res.data.displayName} (@${res.data.username}) | artemis-ai`
            } catch (err) {
                this.handleError(err)
            } finally {
                this.stopOnloadFetch()
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
                this.stopOnloadFetch()
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
