import { NonNegativeNumber } from '@/statistic/domain/value_objects/NonNegativeNumber.ts'
import { AverageCompletionTime } from '@/statistic/domain/value_objects/AverageCompletionTime.ts'

export class GlobalTodoStatistic {
  constructor(
    private _totalCreated: NonNegativeNumber = new NonNegativeNumber(0),
    private _totalCompleted: NonNegativeNumber = new NonNegativeNumber(0),
    private _totalAborted: NonNegativeNumber = new NonNegativeNumber(0),
    private _averageCompletionTime: AverageCompletionTime = new AverageCompletionTime()
  ) {}

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
