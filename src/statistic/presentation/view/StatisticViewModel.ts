import type { IStatisticViewModel } from '@/statistic/application/view/IStatisticViewModel.ts'

export class StatisticViewModel implements IStatisticViewModel {
  constructor(
    public readonly totalCompleted: number,
    public readonly totalCreated: number
  ) {}
}
