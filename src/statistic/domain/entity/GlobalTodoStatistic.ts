import { NonNegativeNumber } from '@/statistic/domain/value_objects/NonNegativeNumber.ts'
import { AverageCompletionTime } from '@/statistic/domain/value_objects/AverageCompletionTime.ts'
import { PerformanceScore } from '@/statistic/domain/value_objects/PerformanceScore.ts'
import { TodoStatus } from '@/statistic/domain/value_objects/TodoStatus.ts'
import { DomainError } from '@/core/domain/error/DomainError.ts'

export class GlobalTodoStatistic {
  constructor(
    private _totalCreated: NonNegativeNumber = new NonNegativeNumber(0),
    private _totalCompleted: NonNegativeNumber = new NonNegativeNumber(0),
    private _totalAborted: NonNegativeNumber = new NonNegativeNumber(0),
    private _averageCompletionTime: AverageCompletionTime = new AverageCompletionTime()
  ) {}
  static readonly TARGETED_COMPLETION_TIME = 22

  computedPerformanceScore(): PerformanceScore {
    if (this.totalCreated === 0) {
      return new PerformanceScore(0)
    }

    const completionRate = this.totalCompleted / this.totalCreated

    const average = this.averageCompletionTime

    const timeEfficiency = average
      ? Math.min(1, GlobalTodoStatistic.TARGETED_COMPLETION_TIME / average)
      : 0

    const score = completionRate * 70 + timeEfficiency * 30

    return new PerformanceScore(Math.round(score))
  }

  recordCreated() {
    this._totalCreated = new NonNegativeNumber(this.totalCreated + 1)
  }

  recordCompleted(durationMs: number) {
    this._totalCompleted = new NonNegativeNumber(this.totalCompleted + 1)
    this._averageCompletionTime = this._averageCompletionTime.addCompletion(
      durationMs,
      this.totalCompleted
    )
  }

  recordAborted() {
    this._totalAborted = new NonNegativeNumber(this.totalAborted + 1)
  }

  get totalCreated(): number {
    return this._totalCreated.value
  }

  get totalCompleted(): number {
    return this._totalCompleted.value
  }

  get totalAborted(): number {
    return this._totalAborted.value
  }

  get averageCompletionTime(): number | null {
    return this._averageCompletionTime.value
  }

  get totalCompletionTime(): number {
    return this._averageCompletionTime.totalDuration
  }

  unrecord(status: TodoStatus, durationMs?: number) {
    this._totalCreated = new NonNegativeNumber(this.totalCreated - 1)

    switch (status) {
      case TodoStatus.IN_PROGRESS:
        break
      case TodoStatus.COMPLETED:
        this._totalCompleted = new NonNegativeNumber(this.totalCompleted - 1)
        if (durationMs) {
          this._averageCompletionTime = this._averageCompletionTime.removeCompletion(
            durationMs,
            this.totalCompleted
          )
        }
        break

      case TodoStatus.ABORTED:
        this._totalAborted = new NonNegativeNumber(this.totalAborted - 1)
        break

      default:
        throw new DomainError(`Unexpected TodoStatus: ${status}`)
    }
  }
}
