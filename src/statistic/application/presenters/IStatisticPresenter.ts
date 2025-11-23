import type { IErrorPresenter } from '@/core/application/presenters/IErrorPresenter.ts'
import type { IStatisticViewModel } from '@/statistic/application/view/IStatisticViewModel.ts'
import type { GlobalTodoStatistic } from '@/statistic/domain/entity/GlobalTodoStatistic.ts'

export interface IStatisticPresenter extends IErrorPresenter {
  viewModel?: IStatisticViewModel
  presentStatistic(statistic: Readonly<GlobalTodoStatistic>): void
}
