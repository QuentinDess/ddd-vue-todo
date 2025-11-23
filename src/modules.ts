import type { Router } from 'vue-router'
import { todoModule } from '@/task/infrastructure/di/module.ts'
import { coreModule } from '@/core/infrastructure/di/module.ts'
import { statisticModule } from '@/statistic/infrastructure/di/module.ts'

export function registerModules(router: Router) {
  coreModule()
  todoModule(router)
  statisticModule(router)
}
