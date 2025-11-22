import type { Todo } from '@/task/domain/entity/Todo.ts'
import { TodoViewModel } from '@/task/presentation/view/TodoViewModel.ts'
import type { IGetTodoPresenter } from '@/task/application/IGetTodosPresenter.ts'

export class TodoPresenter implements IGetTodoPresenter {
  public viewModel?: TodoViewModel
  presentTodo(todo: Readonly<Todo>): void {
    this.viewModel = new TodoViewModel(
      todo.id,
      todo.title,
      todo.description,
      todo.createdAt.toLocaleDateString('fr-FR'),
      todo.dueDate.toLocaleDateString('fr-FR'),
      todo.status
    )
  }
}
