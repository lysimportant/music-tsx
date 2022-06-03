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
        },
        {
          path: '/songlist',
          component: () => import('@/views/SongList/SongList')
        },
        {
          path: '/singer',
          component: () => import('@/views/Singer/Singer')
        },
        {
          path: '/singerdetail/:id',
          component: () => import('@/views/SingerDetail/SingerDetail')
        },
        {
          path: '/mv',
          component: () => import('@/views/MV/MV')
        },
        {
          path: '/mvdetail/:id',
          component: () => import('@/views/MvDetail/MvDetail')
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0, y: 0 }
  }
})

export default router
