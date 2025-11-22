import type { ITodoEvent } from '@/task/domain/events/ITodoEvent.ts'
import type { Todo } from '@/task/domain/entity/Todo.ts'

export class TodoCompleteEvent implements ITodoEvent {
  constructor(public readonly todo: Readonly<Todo>) {}
}
