import { TodoStatus } from '@/task/domain/entity/TodoStatus.ts'
import type { IApplicationEvent } from '@/task/application/events/IApplicationEvent.ts'
import type { Todo } from '@/task/domain/entity/Todo.ts'

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
