import type { Todo } from '@/task/domain/entity/Todo.ts'
import type { ITodoViewModel } from '@/task/application/views/ITodoViewModel.ts'
import type { IErrorPresenter } from '@/core/application/presenters/IErrorPresenter.ts'

export interface IGetTodoPresenter extends IErrorPresenter {
  viewModel?: ITodoViewModel
  presentTodo(todo: Readonly<Todo>): void
}
