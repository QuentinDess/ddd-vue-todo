export class DomainError extends Error {
  public internal_code: number
  public constructor(message: string) {
    super(message)
    this.internal_code = 422
  }
}
