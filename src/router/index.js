import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatView from '@/views/ChatView.vue'
import NewChat from '@/views/NewChat.vue'




const routes = [
  { path: '/', name: 'Home', component: HomeView},
  { path: '/chat/:id', name: 'ChatView', component: ChatView },
  { path: '/new-chat', name: 'NewChat', component: NewChat }



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
