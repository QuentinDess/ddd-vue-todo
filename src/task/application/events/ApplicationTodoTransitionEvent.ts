import type { TodoUpdatedEvent } from '@/task/domain/events/TodoUpdateEvent.ts'
import { TodoStatus } from '@/task/domain/entity/TodoStatus.ts'
import type { IApplicationEvent } from '@/task/application/events/IApplicationEvent.ts'

export class ApplicationTodoTransitionEvent implements IApplicationEvent {
  public readonly type: string
  constructor(todo: Readonly<Todo>) {
    this.type =
      todo.status === TodoStatus.COMPLETED
        ? ApplicationTransitionSuccedEvent.TodoComplete
        : ApplicationTransitionSuccedEvent.TodoAborted
  }
}
enum ApplicationTransitionSuccedEvent {
  TodoComplete = 'TodoComplete',
  TodoAborted = 'TodoAborted'
}
