import type { Router } from 'vue-router'
import TodoPage from '@/task/presentation/ui/pages/TodoPage.vue'
import { container } from '@/core/infrastructure/di/container.ts'
import type { ITodoRepository } from '@/task/domain/repository/ITodoRepository.ts'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import { LocalStorageTodoRepository } from '@/task/infrastructure/repository/LocalStorageTodoRepository.ts'
import { GetTodosUseCase } from '@/task/application/GetTodosUseCase/GetTodosUseCase.ts'
import { TodoSeederService } from '@/task/infrastructure/fixtures/TodoSeederService.ts'
import { TodosPresenter } from '@/task/presentation/presenters/TodosPresenter.ts'
import type { IGetTodosPresenter } from '@/task/application/GetTodosUseCase/IGetTodosPresenter.ts'
import { DeleteTodoUseCase } from '@/task/application/DeleteTodo/DeleteTodoUseCase.ts'
import { DeleteTodoPresenter } from '@/task/presentation/presenters/DeleteTodoPresenter.ts'
import type { IDeleteTodoPresenter } from '@/task/application/DeleteTodo/IDeleteTodoPresenter.ts'

export function todoModule(router: Router) {
  router.addRoute({
    path: '/todo',
    name: 'Todo',
    component: TodoPage
  })

  container.bind<ITodoRepository>(INTERFACES.ITodoRepository).to(LocalStorageTodoRepository)
  container.bind<IGetTodosPresenter>(INTERFACES.IGetTodosPresenter).to(TodosPresenter)
  container.bind<IDeleteTodoPresenter>(INTERFACES.IDeleteTodoPresenter).to(DeleteTodoPresenter)
  container.bind(GetTodosUseCase).toSelf()
  container.bind(DeleteTodoUseCase).toSelf()
  container.bind(TodoSeederService).toSelf()
}
