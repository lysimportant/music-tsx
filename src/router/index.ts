import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Layout'),
      redirect: '/recommend',
      children: [
        {
          path: '/recommend',
          component: () => import('@/views/Home/Home')
        },
        {
          path: '/newsong',
          component: () => import('@/views/NewMusic/NewMusic')
        },
        {
          path: '/leaderboard',
          component: () => import('@/views/LeaderBoard/LeaderBoard')
        }
      ]
    }
  ]
})

export default router
