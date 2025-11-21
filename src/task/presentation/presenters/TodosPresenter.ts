import type { IGetTodosPresenter } from '@/task/application/GetTodosUseCase/IGetTodosPresenter.ts'
import type { Todo } from '@/task/domain/entity/Todo.ts'
import { TodoViewModel } from '@/task/presentation/view/TodoViewModel.ts'

export class TodosPresenter implements IGetTodosPresenter {
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
    return todoListView
  }
}
