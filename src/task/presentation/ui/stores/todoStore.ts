import { container } from '@/core/infrastructure/di/container.ts'
import { GetTodosUseCase } from '@/task/application/query/GetTodosUseCase/GetTodosUseCase.ts'
import type { TodoViewModel } from '@/task/presentation/view/TodoViewModel.ts'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import type { TodosPresenter } from '@/task/presentation/presenters/TodosPresenter.ts'
import { DeleteTodoUseCase } from '@/task/application/command/DeleteTodo/DeleteTodoUseCase.ts'
import { useErrorStore } from '@/core/presentation/ui/store/error.ts'
import type { IPatchTodoCommand } from '@/task/application/command/PatchTodo/IPatchTodoCommand.ts'
import { PatchTodoUseCase } from '@/task/application/command/PatchTodo/PatchTodoUseCase.ts'
import type { TodoPresenter } from '@/task/presentation/presenters/TodoPresenter.ts'
import type { DeletedTodoPresenter } from '@/task/presentation/presenters/DeletedTodoPresenter.ts'
import { CompleteTodoUseCase } from '@/task/application/command/CompleteTodo/CompleteTodoUseCase.ts'
import { AbortTodoUseCase } from '@/task/application/command/AbortTodo/AbortTodoUseCase.ts'
import type { ICreateTodoCommand } from '@/task/application/command/CreateTodo/ICreateTodoCommand.ts'
import { CreateTodoUseCase } from '@/task/application/command/CreateTodo/CreateTodoUseCase.ts'

export const useTodoStore = defineStore('todo-store', () => {
  const todos = ref<TodoViewModel[]>([])

  const getTodos = async () => {
    const handler = container.get(GetTodosUseCase)
    const presenter = container.get<TodosPresenter>(INTERFACES.IGetTodosPresenter)

    await handler.execute({ filter: ['by'] }, presenter)

    const { viewModel } = presenter
    if (viewModel && viewModel.length > 0) todos.value = viewModel
  }

  const deleteTodo = async (id: string) => {
    const handler = container.get(DeleteTodoUseCase)
    const presenter = container.get<DeletedTodoPresenter>(INTERFACES.IDeleteTodoPresenter)
    await handler.execute({ id: id }, presenter)
    const { errorViewModel, deletedTodo } = presenter
    if (errorViewModel) return useErrorStore().setActiveError(errorViewModel)
    if (deletedTodo) todos.value = todos.value.filter((t) => t.id !== deletedTodo)
  }

  const completeTodo = async (id: string) => {
    const handler = container.get(CompleteTodoUseCase)
    const presenter = container.get<TodoPresenter>(INTERFACES.IGetTodoPresenter)
    await handler.execute({ id: id }, presenter)
    const { errorViewModel, viewModel } = presenter
    if (errorViewModel) return useErrorStore().setActiveError(errorViewModel)
    if (viewModel) {
      todos.value = todos.value.map((t: TodoViewModel) =>
        t.id === presenter.viewModel?.id ? presenter.viewModel : t
      )
    }
  }

  const createTodo = async (created: ICreateTodoCommand) => {
    const handler = container.get(CreateTodoUseCase)
    const presenter = container.get<TodoPresenter>(INTERFACES.IGetTodoPresenter)
    await handler.execute(created, presenter)
    const { errorViewModel, viewModel } = presenter
    console.log(errorViewModel, viewModel)
    if (errorViewModel) {
      useErrorStore().setActiveError(errorViewModel)
      throw new Error(errorViewModel.message)
    }
    if (viewModel) {
      console.log(viewModel)
      todos.value.push(viewModel)
    }
  }

  const abortTodo = async (id: string) => {
    const handler = container.get(AbortTodoUseCase)
    const presenter = container.get<TodoPresenter>(INTERFACES.IGetTodoPresenter)
    await handler.execute({ id: id }, presenter)
    const { errorViewModel, viewModel } = presenter
    if (errorViewModel) return useErrorStore().setActiveError(errorViewModel)
    if (viewModel) {
      todos.value = todos.value.map((t: TodoViewModel) =>
        t.id === presenter.viewModel?.id ? presenter.viewModel : t
      )
    }
  }

  const patchTodo = async (updated: Partial<IPatchTodoCommand> & { id: string }) => {
    const handler = container.get(PatchTodoUseCase)
    const presenter = container.get<TodoPresenter>(INTERFACES.IGetTodoPresenter)
    await handler.execute(updated, presenter)
    const { errorViewModel, viewModel } = presenter
    if (errorViewModel) return useErrorStore().setActiveError(errorViewModel)
    if (viewModel) {
      todos.value = todos.value.map((t: TodoViewModel) =>
        t.id === presenter.viewModel?.id ? presenter.viewModel : t
      )
    }
  }

  return { todos, getTodos, deleteTodo, patchTodo, completeTodo, abortTodo, createTodo }
})
