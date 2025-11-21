import type { Todo } from '@/task/domain/entity/Todo.ts'
import type { ITodoViewModel } from '@/task/application/GetTodosUseCase/ITodoViewModel.ts'

export interface IGetTodosPresenter {
  presentTodoList(todoList: Todo[]): ITodoViewModel[]
}
