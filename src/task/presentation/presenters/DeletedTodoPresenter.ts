import type { Todo } from '@/task/domain/entity/Todo.ts'
import { ErrorPresenter } from '@/core/application/presenters/ErrorPresenter.ts'
import type { IDeleteTodoPresenter } from '@/task/application/presenters/IDeleteTodoPresenter.ts'

export class DeletedTodoPresenter extends ErrorPresenter implements IDeleteTodoPresenter {
  public deletedTodo?: string
  presentDeletedTodo(id: string): void {
    this.deletedTodo = id
  }
}
