import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GeminiPro from '@/views/GeminiPro.vue'
import VisionPro from '@/views/VisionPro.vue'
import GeminiStart from '@/views/GeminiStart.vue'
// import Settings from '@/modals/SettingsModal.vue'





const routes = [
  { path: '/', name: 'home', component: HomeView},
  { path: '/gemini-pro', name: 'GeminiPro', component: GeminiPro},
  { path: '/vision-pro', name: 'VisionPro', component: VisionPro},
  { path: '/gemini-start', name: 'GeminiStart', component: GeminiStart},

  



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
