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
import { ErrorTodoPresenter } from '@/task/presentation/presenters/ErrorTodoPresenter.ts'
import type { IErrorTodoPresenter } from '@/task/presentation/presenters/IErrorTodoPresenter.ts'
import type { IGetTodoPresenter } from '@/task/application/IGetTodosPresenter.ts'
import { TodoPresenter } from '@/task/presentation/presenters/TodoPresenter.ts'
import { PatchTodoUseCase } from '@/task/application/PatchTodo/PatchTodoUseCase.ts'

export function todoModule(router: Router) {
  router.addRoute({
    path: '/todo',
    name: 'Todo',
    component: TodoPage
  })

  container.bind<ITodoRepository>(INTERFACES.ITodoRepository).to(LocalStorageTodoRepository)
  container.bind<IGetTodosPresenter>(INTERFACES.IGetTodosPresenter).to(TodosPresenter)
  container.bind<IGetTodoPresenter>(INTERFACES.IGetTodoPresenter).to(TodoPresenter)
  container.bind<IErrorTodoPresenter>(INTERFACES.IErrorTodoPresenter).to(ErrorTodoPresenter)
  container.bind(GetTodosUseCase).toSelf()
  container.bind(PatchTodoUseCase).toSelf()
  container.bind(DeleteTodoUseCase).toSelf()
  container.bind(TodoSeederService).toSelf()
}
