import type { IGetTodosPresenter } from '@/task/application/presenters/IGetTodosPresenter.ts'
import type { Todo } from '@/task/domain/entity/Todo.ts'
import { TodoViewModel } from '@/task/presentation/view/TodoViewModel.ts'
import { ErrorTodoPresenter } from '@/task/presentation/presenters/ErrorTodoPresenter.ts'

export class TodosPresenter extends ErrorTodoPresenter implements IGetTodosPresenter {
  viewModel: TodoViewModel[]
  presentTodoList(todoList: Todo[]): TodoViewModel[] {
    const todoListView = []
    for (const item of todoList) {
      todoListView.push(
        new TodoViewModel(
          item.id,
          item.title,
          item.description,
          item.createdAt.toLocaleDateString('fr-FR'),
          item.dueDate.toLocaleDateString('fr-FR'),
          item.status
        )
      )
    }
    this.viewModel = todoListView
  }
}
