import { NonNegativeNumber } from '@/statistic/domain/value_objects/NonNegativeNumber.ts'
import { AverageCompletionTime } from '@/statistic/domain/value_objects/AverageCompletionTime.ts'
import { PerformanceScore } from '@/statistic/domain/value_objects/PerformanceScore.ts'

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
    this._totalCreated = this._totalCreated.increment()
  }

  recordCompleted(durationMs: number) {
    this._totalCompleted = this._totalCompleted.increment()
    this._averageCompletionTime = this._averageCompletionTime.addCompletion(
      durationMs,
      this._totalCompleted.value
    )
  }

  recordAborted() {
    this._totalAborted = this._totalAborted.increment()
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
}
