import { createRouter, createWebHashHistory, useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { routes_ } from './routes'
const routes: RouteRecordRaw[] = routes_
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes_,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0, y: 0 }
  }
})
export const useRoute_ = useRoute()

export default router
