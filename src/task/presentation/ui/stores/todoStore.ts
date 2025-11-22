import { container } from '@/core/infrastructure/di/container.ts'
import { GetTodosUseCase } from '@/task/application/query/GetTodosUseCase/GetTodosUseCase.ts'
import type { TodoViewModel } from '@/task/presentation/view/TodoViewModel.ts'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import type { TodosPresenter } from '@/task/presentation/presenters/TodosPresenter.ts'
import { DeleteTodoUseCase } from '@/task/application/command/DeleteTodo/DeleteTodoUseCase.ts'
import { useErrorStore } from '@/core/ui/store/error.ts'
import type { IPatchTodoCommand } from '@/task/application/command/PatchTodo/IPatchTodoCommand.ts'
import { PatchTodoUseCase } from '@/task/application/command/PatchTodo/PatchTodoUseCase.ts'
import type { TodoPresenter } from '@/task/presentation/presenters/TodoPresenter.ts'
import type { DeletedTodoPresenter } from '@/task/presentation/presenters/DeletedTodoPresenter.ts'

export const useTodoStore = defineStore('todo-store', () => {
  const todos = ref<TodoViewModel[]>([])

  const getTodos = async () => {
    const service = container.get(GetTodosUseCase)
    const presenter = container.get<TodosPresenter>(INTERFACES.IGetTodosPresenter)

    await service.execute({ filter: ['by'] }, presenter)

    const { viewModel } = presenter
    if (viewModel && viewModel.length > 0) todos.value = viewModel
  }

  const deleteTodo = async (id: string) => {
    const service = container.get(DeleteTodoUseCase)
    const presenter = container.get<DeletedTodoPresenter>(INTERFACES.IDeleteTodoPresenter)
    await service.execute({ id: id }, presenter)
    const { errorViewModel, deletedTodo } = presenter
    if (errorViewModel) return useErrorStore().setActiveError(errorViewModel)
    if (deletedTodo) todos.value = todos.value.filter((t) => t.id !== deletedTodo)
  }

  const patchTodo = async (updated: Partial<Omit<IPatchTodoCommand, 'id'>> & { id: string }) => {
    const service = container.get(PatchTodoUseCase)
    const presenter = container.get<TodoPresenter>(INTERFACES.IGetTodoPresenter)
    await service.execute(updated, presenter)
    const { errorViewModel, viewModel } = presenter
    if (errorViewModel) return useErrorStore().setActiveError(errorViewModel)
    if (viewModel) {
      todos.value = todos.value.map((t: TodoViewModel) =>
        t.id === presenter.viewModel?.id ? { ...presenter.viewModel } : t
      )
    }
  }

  return { todos, getTodos, deleteTodo, patchTodo }
})
