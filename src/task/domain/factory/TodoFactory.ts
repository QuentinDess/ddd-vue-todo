import { Todo } from '@/task/domain/entity/Todo.ts'
import { TodoDescription } from '@/task/domain/value_objects/TodoDescription.ts'
import { TodoTitle } from '@/task/domain/value_objects/TodoTitle.ts'
import { CompletionWindow } from '@/task/domain/value_objects/CompletionWindow.ts'
import type { ITodoFactory } from '@/task/domain/factory/ITodoFactory.ts'
import type { TodoStatus } from '@/task/domain/entity/TodoStatus.ts'

export class TodoFactory implements ITodoFactory {
  public fromPrimitive(raw: {
    title: string
    description: string
    createdAt: Date
    dueDate: Date
    status: string
    id: string
  }): Todo {
    return Todo.reconstitute(
      raw.id,
      TodoTitle.create(raw.title),
      TodoDescription.create(raw.description),
      CompletionWindow.create(new Date(raw.createdAt), new Date(raw.dueDate)),
      raw.status as TodoStatus
    )
  }
}
