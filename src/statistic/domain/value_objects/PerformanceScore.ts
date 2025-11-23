export class PerformanceScore {
  private _value: number

  constructor(value: number) {
    this._value = Math.max(0, Math.min(100, value))
  }

  get value(): number {
    return this._value
  }
}
