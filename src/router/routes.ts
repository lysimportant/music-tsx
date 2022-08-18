import type { RouteRecordRaw } from 'vue-router'
export const routes_: RouteRecordRaw[] = [
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
        path: '/songlist/:tag?',
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
      },
      {
        path: '/songlist/:id/detail',
        component: () => import('@/views/SongListDetail/SongListDetail')
      },
      {
        path: '/album/:id/detail',
        component: () => import('@/views/AlbumDetail/AlbumDetail')
      },
      {
        path: '/user/:id/detail',
        component: () => import('@/views/UserInfo/UserInfo')
      },
      {
        path: '/user/follows/:id',
        component: () => import('@/views/UserInfo/components/user-follows')
      },
      {
        path: '/user/followed/:id',
        component: () => import('@/views/UserInfo/components/user-follows')
      },
      {
        path: '/search/:comment',
        component: () => import('@/views/search/search')
      },
      {
        path: '/dj/:id/detail',
        component: () => import('@/views/DjDetail/DjDetail')
      },
      {
        path: '/lrc/:id/:songname?',
        component: () => import('@/views/LRC')
      }
    ]
  }
]
