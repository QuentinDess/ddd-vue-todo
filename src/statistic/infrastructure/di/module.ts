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
import { RecordTodoCompletedUseCase } from '@/statistic/application/command/RecordTodoCompleted/RecordTodoCompletedUseCase.ts'
import TotalAbortedTodoBadge from '@/statistic/presentation/ui/components/TotalAbortedTodoBadge.vue'
import { RecordTodoAbortedUseCase } from '@/statistic/application/command/RecordTodoAborted/RecordTodoAbortedUseCase.ts'
import PerformanceGauge from '@/statistic/presentation/ui/components/PerformanceGauge.vue'
import { RecordTodoDeletedUseCase } from '@/statistic/application/command/RecordTodoDeleted/RecordTodoDeletedUseCase.ts'
export function statisticModule(_router: Router) {
  registerModuleAction(TotalCompletedTodoBadge)
  registerModuleAction(TotalCreatedTodoBadge)
  registerModuleAction(TotalAbortedTodoBadge)
  registerModuleAction(PerformanceGauge)
  container
    .bind<IGlobalTodoStatisticRepository>(INTERFACES.IGlobalTodoStatisticRepository)
    .to(LocalStorageGlobalTodoStatisticsRepository)
  container.bind<IStatisticPresenter>(INTERFACES.IStatisticPresenter).to(StatisticPresenter)
  container.bind(TodoStatisticSubscriber).toSelf().inSingletonScope()
  container.bind(RecordTodoCreatedUseCase).toSelf()
  container.bind(GetStatisticUseCase).toSelf()
  container.bind(RecordTodoAbortedUseCase).toSelf()
  container.bind(RecordTodoCompletedUseCase).toSelf()
  container.bind(RecordTodoDeletedUseCase).toSelf()
  const todoStatisticSubscriber = container.get<TodoStatisticSubscriber>(TodoStatisticSubscriber)
  todoStatisticSubscriber.subscribe()
}
