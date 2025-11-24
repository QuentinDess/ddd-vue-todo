import type { Todo } from '@/task/domain/entity/Todo.ts'
import type { ITodoViewModel } from '@/task/application/views/ITodoViewModel.ts'
import type { IPresenter } from '@/core/application/presenters/IPresenter.ts'

export interface IGetTodosPresenter extends IPresenter {
  viewModel?: ITodoViewModel[]
  presentTodoList(todoList: Todo[]): void
}
