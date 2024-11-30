import { createRouter, createWebHistory } from 'vue-router'
import { AuthGuard } from '@/middlewares/authMiddleware'

import Home from '../views/HomeView.vue'
import ChatView from '@/views/ChatView.vue'
import NewChat from '@/views/NewChat.vue'
import CreateAgent from '@/views/CreateAgent.vue'
import PublicProfile from '@/views/PublicProfile.vue'
import AgentChat from '@/views/AgentChat.vue'


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/chat/:id', name: 'ChatView', component: ChatView, beforeEnter: AuthGuard },
  { path: '/new-chat', name: 'NewChat', component: NewChat, beforeEnter: AuthGuard },
  { path: '/new-agent', name: 'CreateAgent', component: CreateAgent, beforeEnter: AuthGuard },

  { path: '/a/chat/:id', name: 'AgentChat', component: AgentChat },
  { path: '/profile/:username', name: 'PublicProfile', component: PublicProfile }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
