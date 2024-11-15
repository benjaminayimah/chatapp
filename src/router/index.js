import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Home from '../views/HomeView.vue'
import ChatView from '@/views/ChatView.vue'
import NewChat from '@/views/NewChat.vue'
import CreateAvatar from '@/views/CreateAvatar.vue'
import PublicProfile from '@/views/PublicProfile.vue'

// Guards
const AuthGuard = (to, from, next) => {
  // Perform your checks here
  if (store.getters.auth) {
    // If the condition is met, allow the route transition
    next();
  } else {
    next({
      name: 'Home'
    });
  }
};


const routes = [
  { path: '/', name: 'Home', component: Home},
  { path: '/chat/:id', name: 'ChatView', component: ChatView, beforeEnter: AuthGuard},
  { path: '/new-chat', name: 'NewChat', component: NewChat, beforeEnter: AuthGuard },
  { path: '/create-avatar', name: 'CreateAvatar', component: CreateAvatar, beforeEnter: AuthGuard },
  { path: '/profile/:user', name: 'PublicProfile', component: PublicProfile}

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
