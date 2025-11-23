import { injectable } from 'inversify'
import type { IGlobalTodoStatisticRepository } from '@/statistic/domain/repository/IGlobalTodoStatisticRepository.ts'
import { GlobalTodoStatistic } from '@/statistic/domain/entity/GlobalTodoStatistic.ts'
import { NonNegativeNumber } from '@/statistic/domain/value_objects/NonNegativeNumber.ts'
import { AverageCompletionTime } from '@/statistic/domain/value_objects/AverageCompletionTime.ts'

const STORAGE_KEY = 'global_todo_statistics'

@injectable()
export class LocalStorageGlobalTodoStatisticsRepository implements IGlobalTodoStatisticRepository {
  async get(): Promise<GlobalTodoStatistic> {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return new GlobalTodoStatistic()
    }

    const parsed = JSON.parse(raw)
    return new GlobalTodoStatistic(
      new NonNegativeNumber(parsed.totalCreated),
      new NonNegativeNumber(parsed.totalCompleted),
      new NonNegativeNumber(parsed.totalAborted),
      AverageCompletionTime.fromJSON({
        totalDuration: parsed.totalDuration,
        count: parsed.totalCount
      })
    )
  }

  async save(statistic: GlobalTodoStatistic): Promise<void> {
    const serialized = {
      totalCreated: statistic.totalCreated,
      totalCompleted: statistic.totalCompleted,
      totalAborted: statistic.totalAborted,
      totalDuration: statistic.totalCompletionTime
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized))
  }
}
