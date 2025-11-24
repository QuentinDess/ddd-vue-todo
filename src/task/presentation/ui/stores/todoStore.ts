import { container } from '@/core/infrastructure/di/container.ts'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import { GetTodosUseCase } from '@/task/application/query/GetTodosUseCase/GetTodosUseCase.ts'
import { DeleteTodoUseCase } from '@/task/application/command/DeleteTodo/DeleteTodoUseCase.ts'
import { PatchTodoUseCase } from '@/task/application/command/PatchTodo/PatchTodoUseCase.ts'
import { CompleteTodoUseCase } from '@/task/application/command/CompleteTodo/CompleteTodoUseCase.ts'
import { AbortTodoUseCase } from '@/task/application/command/AbortTodo/AbortTodoUseCase.ts'
import { CreateTodoUseCase } from '@/task/application/command/CreateTodo/CreateTodoUseCase.ts'

import type { IGetTodosPresenter } from '@/task/application/presenters/IGetTodosPresenter.ts'
import type { IGetTodoPresenter } from '@/task/application/presenters/IGetTodoPresenter.ts'
import type { IDeleteTodoPresenter } from '@/task/application/presenters/IDeleteTodoPresenter.ts'

import type { ITodoViewModel } from '@/task/application/views/ITodoViewModel.ts'
import { useErrorStore } from '@/core/presentation/ui/store/error.ts'
import type { EditTodoPayload } from '@/task/presentation/ui/dto/EdtitTodoPayload.ts'
import type { CreateTodoPayload } from '@/task/presentation/ui/dto/CreateTodoPayload.ts'

export const useTodoStore = defineStore('todo-store', () => {
  const todos = ref<ITodoViewModel[]>([])

  const getTodos = async () => {
    const handler = container.get(GetTodosUseCase)
    const presenter = container.get<IGetTodosPresenter>(INTERFACES.IGetTodosPresenter)

    await handler.execute({ filter: ['by'] }, presenter)

    const { viewModel } = presenter
    if (viewModel && viewModel.length > 0) todos.value = viewModel
  }

  const deleteTodo = async (id: string) => {
    const handler = container.get(DeleteTodoUseCase)
    const presenter = container.get<IDeleteTodoPresenter>(INTERFACES.IDeleteTodoPresenter)
    await handler.execute({ id: id }, presenter)
    const { errorViewModel, deletedTodo } = presenter
    if (errorViewModel) return useErrorStore().setActiveError(errorViewModel)
    if (deletedTodo) todos.value = todos.value.filter((t) => t.id !== deletedTodo)
  }

  const completeTodo = async (id: string) => {
    const handler = container.get(CompleteTodoUseCase)
    const presenter = container.get<IGetTodoPresenter>(INTERFACES.IGetTodoPresenter)
    await handler.execute({ id: id }, presenter)
    const { errorViewModel, viewModel } = presenter
    if (errorViewModel) return useErrorStore().setActiveError(errorViewModel)
    if (viewModel) {
      todos.value = todos.value.map((t: ITodoViewModel) =>
        t.id === presenter.viewModel?.id ? presenter.viewModel : t
      )
    }
  }

  const createTodo = async (created: CreateTodoPayload) => {
    const handler = container.get(CreateTodoUseCase)
    const presenter = container.get<IGetTodoPresenter>(INTERFACES.IGetTodoPresenter)
    await handler.execute(created, presenter)
    const { errorViewModel, viewModel } = presenter
    if (errorViewModel) {
      useErrorStore().setActiveError(errorViewModel)
      throw new Error(errorViewModel.message)
    }
    if (viewModel) {
      todos.value.push(viewModel)
    }
  }

  const abortTodo = async (id: string) => {
    const handler = container.get(AbortTodoUseCase)
    const presenter = container.get<IGetTodoPresenter>(INTERFACES.IGetTodoPresenter)
    await handler.execute({ id: id }, presenter)
    const { errorViewModel, viewModel } = presenter
    if (errorViewModel) return useErrorStore().setActiveError(errorViewModel)
    if (viewModel) {
      todos.value = todos.value.map((t: ITodoViewModel) =>
        t.id === presenter.viewModel?.id ? presenter.viewModel : t
      )
    }
  }

  const patchTodo = async (updated: EditTodoPayload) => {
    const handler = container.get(PatchTodoUseCase)
    const presenter = container.get<IGetTodoPresenter>(INTERFACES.IGetTodoPresenter)
    await handler.execute(updated, presenter)
    const { errorViewModel, viewModel } = presenter
    if (errorViewModel) return useErrorStore().setActiveError(errorViewModel)
    if (viewModel) {
      todos.value = todos.value.map((t: ITodoViewModel) =>
        t.id === presenter.viewModel?.id ? presenter.viewModel : t
      )
    }
  }

  return { todos, getTodos, deleteTodo, patchTodo, completeTodo, abortTodo, createTodo }
})
