import type { GlobalTodoStatistic } from '@/statistic/domain/entity/GlobalTodoStatistic.ts'

export interface IGlobalTodoStatisticRepository {
  get(): Promise<GlobalTodoStatistic>
  save(stats: GlobalTodoStatistic): Promise<void>
}
