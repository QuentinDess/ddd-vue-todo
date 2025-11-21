import type { Router } from 'vue-router'
import { registerStatisticRoutes } from '@/statistic/ui/routes.ts'
import { todoModule } from '@/task/infrastructure/di/module.ts'
import { coreModule } from '@/core/infrastructure/di/module.ts'

export function registerModules(router: Router) {
  coreModule()
  todoModule(router)
  registerStatisticRoutes(router)
}
