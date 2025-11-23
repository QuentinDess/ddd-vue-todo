export class AverageCompletionTime {
  private _totalDuration = 0
  private _count = 0

  get value(): number | null {
    return this._count === 0 ? null : this._totalDuration / this._count
  }

  addCompletion(durationMs: number, totalCompleted: number): AverageCompletionTime {
    const newAverage = new AverageCompletionTime()
    newAverage._totalDuration = this._totalDuration + durationMs
    newAverage._count = totalCompleted
    return newAverage
  }

  get totalDuration(): number {
    return this._totalDuration
  }

  static fromJSON(json: { totalDuration: number; count: number }): AverageCompletionTime {
    const avg = new AverageCompletionTime()
    avg._totalDuration = json.totalDuration
    avg._count = json.count
    return avg
  }

  removeCompletion(durationMs: number, totalCompleted: number) {
    const newAverage = new AverageCompletionTime()
    newAverage._totalDuration = this._totalDuration - durationMs
    newAverage._count = totalCompleted
    return newAverage
  }
}
