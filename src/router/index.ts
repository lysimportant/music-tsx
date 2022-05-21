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
        }
      ]
    }
  ]
})

export default router
