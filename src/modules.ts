import type { Router } from 'vue-router'
import { todoModule } from '@/task/infrastructure/di/module.ts'
import { coreModule } from '@/core/infrastructure/di/module.ts'
import { statisticModule } from '@/statistic/infrastructure/di/module.ts'

export async function registerModules(router: Router) {
  coreModule()
  statisticModule(router)
  todoModule(router)
}
