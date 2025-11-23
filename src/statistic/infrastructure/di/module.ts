import type { Router } from 'vue-router'
import { container } from '@/core/infrastructure/di/container.ts'
import { TodoStatisticSubscriber } from '@/statistic/application/events/TodoStatisticSubscriber.ts'
import { INTERFACES } from '@/statistic/infrastructure/di/interfaces.ts'
import type { IGlobalTodoStatisticRepository } from '@/statistic/domain/repository/IGlobalTodoStatisticRepository.ts'
import { LocalStorageGlobalTodoStatisticsRepository } from '@/statistic/infrastructure/repository/LocalStorageGlobalTodoStatisticsRepository.ts'
import { RecordTodoCreatedUseCase } from '@/statistic/application/command/RecordTodoCreated/RecordTodoCreatedUseCase.ts'
import { registerModuleAction } from '@/core/presentation/ui/store/navStore.ts'
import TotalCompletedTodoBadge from '@/statistic/presentation/ui/components/TotalCompletedTodoBadge.vue'
import { GetStatisticUseCase } from '@/statistic/application/query/GetStatistic/GetStatisticUseCase.ts'
import { StatisticPresenter } from '@/statistic/presentation/presenters/StatisticPresenter.ts'
import type { IStatisticPresenter } from '@/statistic/application/presenters/IStatisticPresenter.ts'
import TotalCreatedTodoBadge from '@/statistic/presentation/ui/components/TotalCreatedTodoBadge.vue'
import { RecordTodoCompletedUseCase } from '@/statistic/application/command/RecordTodoTransition/RecordTodoCompletedUseCase.ts'
export function statisticModule(_router: Router) {
  registerModuleAction(TotalCompletedTodoBadge)
  registerModuleAction(TotalCreatedTodoBadge)
  container
    .bind<IGlobalTodoStatisticRepository>(INTERFACES.IGlobalTodoStatisticRepository)
    .to(LocalStorageGlobalTodoStatisticsRepository)
  container.bind<IStatisticPresenter>(INTERFACES.IStatisticPresenter).to(StatisticPresenter)
  container.bind(TodoStatisticSubscriber).toSelf().inSingletonScope()
  container.bind(RecordTodoCreatedUseCase).toSelf()
  container.bind(GetStatisticUseCase).toSelf()
  container.bind(RecordTodoCompletedUseCase).toSelf()
  const todoStatisticSubscriber = container.get(TodoStatisticSubscriber)
  todoStatisticSubscriber.subscribe()
}
