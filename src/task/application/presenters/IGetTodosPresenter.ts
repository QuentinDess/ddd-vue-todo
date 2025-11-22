import type { Todo } from '@/task/domain/entity/Todo.ts'
import type { ITodoViewModel } from '@/task/application/query/GetTodosUseCase/ITodoViewModel.ts'
import type { IPresenter } from '@/task/application/presenters/IPresenter.ts'

export interface IGetTodosPresenter extends IPresenter {
  viewModel?: ITodoViewModel[]
  presentTodoList(todoList: Todo[]): void
}
