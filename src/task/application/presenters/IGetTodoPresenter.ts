import type { Todo } from '@/task/domain/entity/Todo.ts'
import type { ITodoViewModel } from '@/task/application/query/GetTodosUseCase/ITodoViewModel.ts'
import type { IErrorTodoPresenter } from '@/task/application/presenters/IErrorTodoPresenter.ts'

export interface IGetTodoPresenter extends IErrorTodoPresenter {
  viewModel?: ITodoViewModel
  presentTodo(todo: Readonly<Todo>): void
}
