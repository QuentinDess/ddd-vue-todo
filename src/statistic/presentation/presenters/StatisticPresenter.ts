import { ErrorPresenter } from '@/core/application/presenters/ErrorPresenter.ts'
import { StatisticViewModel } from '@/statistic/presentation/view/StatisticViewModel.ts'
import type { GlobalTodoStatistic } from '@/statistic/domain/entity/GlobalTodoStatistic.ts'
import type { IStatisticPresenter } from '@/statistic/application/presenters/IStatisticPresenter.ts'

export class StatisticPresenter extends ErrorPresenter implements IStatisticPresenter {
  public viewModel?: StatisticViewModel
  presentStatistic(statistic: Readonly<GlobalTodoStatistic>): void {
    this.viewModel = new StatisticViewModel(
      statistic.totalCompleted,
      statistic.totalCreated,
      statistic.totalAborted
    )
  }
}
