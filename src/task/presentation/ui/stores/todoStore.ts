import { container } from '@/core/infrastructure/di/container.ts'
import { GetTodosUseCase } from '@/task/application/GetTodosUseCase/GetTodosUseCase.ts'
import type { TodoViewModel } from '@/task/presentation/view/TodoViewModel.ts'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces'
import type { TodosPresenter } from '@/task/presentation/presenters/TodosPresenter.ts'
import { DeleteTodoUseCase } from '@/task/application/DeleteTodo/DeleteTodoUseCase.ts'
import type { InMemoryEventBus } from '@/core/infrastructure/events/InMemoryEventBus.ts'
import { TodoDeletedEvent } from '@/task/domain/events/TodoDeletedEvent.ts'
import { useErrorStore } from '@/core/ui/store/error.ts'

export const useTodoStore = defineStore('todo-store', () => {
  const todos = ref<TodoViewModel[]>([])
  const eventBus = container.get<InMemoryEventBus>(CORE_INTERFACES.IEventBus)

  eventBus.subscribe(TodoDeletedEvent, (event) => {
    todos.value = todos.value.filter((t) => t.id !== event.id)
  })

  const getTodos = async () => {
    const service = container.get(GetTodosUseCase)
    const data = await service.execute({ filter: ['by'] })
    const presenter = container.get<TodosPresenter>(INTERFACES.IGetTodosPresenter)

    todos.value = presenter.presentTodoList(data.todos)
  }

  const deleteTodo = async (id: string) => {
    const service = container.get(DeleteTodoUseCase)
    const error = await service.execute({ id: id })
    if (error) useErrorStore().setActiveError(error)
  }

  return { todos, getTodos, deleteTodo }
})
