import type { Router } from 'vue-router'
import StatisticPage from '@/statistic/ui/pages/StatisticPage.vue'

export function registerStatisticRoutes(router: Router) {
  router.addRoute({
    path: '/statistic',
    name: 'Stat',
    component: StatisticPage
  })
}
