import { createRouter, createWebHistory } from 'vue-router'
import { AuthGuard } from '@/middlewares/authMiddleware'

import Home from '../views/HomeView.vue'
import ChatView from '@/views/ChatView.vue'
import NewChat from '@/views/NewChat.vue'
import CreateAgent from '@/views/CreateAgent.vue'
import PublicProfile from '@/views/PublicProfile.vue'
import AgentChat from '@/views/AgentChat.vue'


// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     // Your routes here
//   ],
//   scrollBehavior(to, from, savedPosition) {
//     if (savedPosition) {
//       // Return to the saved position if navigating back
//       return savedPosition;
//     } else {
//       // Scroll to the top for a new navigation
//       return { top: 0 };
//     }
//   },
// });



const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/chat/:id', name: 'ChatView', component: ChatView, beforeEnter: AuthGuard },
  { path: '/new-chat', name: 'NewChat', component: NewChat, beforeEnter: AuthGuard },
  { path: '/new-agent', name: 'CreateAgent', component: CreateAgent, beforeEnter: AuthGuard },

  { path: '/a/chat/:id', name: 'AgentChat', component: AgentChat },
  { path: '/profile/:username', name: 'PublicProfile', component: PublicProfile }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})


let scrollPositions = {};

router.beforeEach((to, from, next) => {
  const mainElement = document.querySelector('main');
  if (mainElement) {
    // Save scroll position of <main> before navigating away
    scrollPositions[from.path] = mainElement.scrollTop;
  }
  next();
});

router.afterEach((to) => {
  const mainElement = document.querySelector('main');
  if (mainElement) {
    // Restore scroll position for the <main> element
    if (scrollPositions[to.path] !== undefined) {
      mainElement.scrollTo(0, scrollPositions[to.path]);
    } else {
      // Scroll to top for new pages
      mainElement.scrollTo(0, 0);
    }
  }
});

export default router

