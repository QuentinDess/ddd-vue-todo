import { DomainError } from '@/core/domain/error/DomainError.ts'

export class CannotDeleteCompletedTodo extends DomainError {
  public constructor() {
    super(`The Todo cannot be deleted it's already completed.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = new.target.name
  }
}
