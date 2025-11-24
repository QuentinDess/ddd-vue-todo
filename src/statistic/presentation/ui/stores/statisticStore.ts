import { container } from '@/core/infrastructure/di/container.ts'
import { INTERFACES } from '@/statistic/infrastructure/di/interfaces.ts'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'
import { StatisticViewModel } from '@/statistic/application/view/StatisticViewModel.ts'
import type { StatisticPresenter } from '@/statistic/application/presenters/StatisticPresenter.ts'
import { GetStatisticUseCase } from '@/statistic/application/query/GetStatistic/GetStatisticUseCase.ts'
import type { InMemoryEventBus } from '@/core/infrastructure/events/InMemoryEventBus.ts'
import { ApplicationStatisticUpdatedEvent } from '@/statistic/application/events/ApplicationStatisticUpdatedEvent.ts'

export const useStatisticStore = defineStore('statistic-store', () => {
  const statistic = ref<StatisticViewModel | null>(null)
  const eventBus = container.get<InMemoryEventBus>(CORE_INTERFACES.IEventBus)
  eventBus.subscribe(
    ApplicationStatisticUpdatedEvent,
    async (_event: ApplicationStatisticUpdatedEvent) => {
      await getStatistic()
    }
  )
  const getStatistic = async () => {
    const handler = container.get(GetStatisticUseCase)
    const presenter = container.get<StatisticPresenter>(INTERFACES.IStatisticPresenter)

    await handler.execute({ filter: ['by'] }, presenter)

    const { viewModel } = presenter
    if (viewModel) statistic.value = viewModel
  }

  return { statistic, getStatistic }
})
