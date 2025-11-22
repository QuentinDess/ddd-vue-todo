import { DomainError } from '@/core/domain/error/DomainError.ts'
import type { TodoStatus } from '@/task/domain/entity/TodoStatus.ts'

export class CannotDoTodoTransition extends DomainError {
  public constructor(from: TodoStatus, to: TodoStatus) {
    super(`Can't apply transisiton from: ${from}, to: ${to}`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = new.target.name
  }
}
