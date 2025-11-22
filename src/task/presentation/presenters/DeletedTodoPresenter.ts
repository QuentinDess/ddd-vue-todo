import type { Todo } from '@/task/domain/entity/Todo.ts'
import { ErrorTodoPresenter } from '@/task/presentation/presenters/ErrorTodoPresenter.ts'
import type { IDeleteTodoPresenter } from '@/task/application/presenters/IDeleteTodoPresenter.ts'

export class DeletedTodoPresenter extends ErrorTodoPresenter implements IDeleteTodoPresenter {
  public deletedTodo?: string
  presentDeletedTodo(id: string): void {
    this.deletedTodo = id
  }
}
