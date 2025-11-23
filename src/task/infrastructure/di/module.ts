import type { Router } from 'vue-router'
import TodoPage from '@/task/presentation/ui/pages/TodoPage.vue'
import { container } from '@/core/infrastructure/di/container.ts'
import type { ITodoRepository } from '@/task/domain/repository/ITodoRepository.ts'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import { LocalStorageTodoRepository } from '@/task/infrastructure/repository/LocalStorageTodoRepository.ts'
import { GetTodosUseCase } from '@/task/application/query/GetTodosUseCase/GetTodosUseCase.ts'
import { TodoSeederService } from '@/task/infrastructure/fixtures/TodoSeederService.ts'
import { TodosPresenter } from '@/task/presentation/presenters/TodosPresenter.ts'
import type { IGetTodosPresenter } from '@/task/application/presenters/IGetTodosPresenter.ts'
import { DeleteTodoUseCase } from '@/task/application/command/DeleteTodo/DeleteTodoUseCase.ts'
import type { IGetTodoPresenter } from '@/task/application/presenters/IGetTodoPresenter.ts'
import { TodoPresenter } from '@/task/presentation/presenters/TodoPresenter.ts'
import { PatchTodoUseCase } from '@/task/application/command/PatchTodo/PatchTodoUseCase.ts'
import { DeletedTodoPresenter } from '@/task/presentation/presenters/DeletedTodoPresenter.ts'
import type { IDeleteTodoPresenter } from '@/task/application/presenters/IDeleteTodoPresenter.ts'
import { CompleteTodoUseCase } from '@/task/application/command/CompleteTodo/CompleteTodoUseCase.ts'
import { AbortTodoUseCase } from '@/task/application/command/AbortTodo/AbortTodoUseCase.ts'
import CreateTodoButton from '@/task/presentation/ui/components/CreateTodoButton.vue'
import { registerNavAction } from '@/core/presentation/ui/store/navStore.ts'
import { CreateTodoUseCase } from '@/task/application/command/CreateTodo/CreateTodoUseCase.ts'
import type { ITodoFactory } from '@/task/domain/factory/ITodoFactory.ts'
import { TodoFactory } from '@/task/domain/factory/TodoFactory.ts'
import { TodoEventACLSubscriber } from '@/task/application/listeners/TodoEventACLSubscriber.ts'

export async function todoModule(router: Router) {
  router.addRoute({
    path: '/',
    name: 'Todo',
    component: TodoPage
  })
  registerNavAction(CreateTodoButton)
  container.bind<ITodoRepository>(INTERFACES.ITodoRepository).to(LocalStorageTodoRepository)
  container.bind<IGetTodosPresenter>(INTERFACES.IGetTodosPresenter).to(TodosPresenter)
  container.bind<IGetTodoPresenter>(INTERFACES.IGetTodoPresenter).to(TodoPresenter).inRequestScope()
  container.bind<IDeleteTodoPresenter>(INTERFACES.IDeleteTodoPresenter).to(DeletedTodoPresenter)
  container.bind<ITodoFactory>(INTERFACES.ITodoFactory).to(TodoFactory)
  container.bind(GetTodosUseCase).toSelf()
  container.bind(CompleteTodoUseCase).toSelf()
  container.bind(PatchTodoUseCase).toSelf()
  container.bind(DeleteTodoUseCase).toSelf()
  container.bind(TodoSeederService).toSelf()
  container.bind(AbortTodoUseCase).toSelf()
  container.bind(CreateTodoUseCase).toSelf()
  container.bind(TodoEventACLSubscriber).toSelf().inSingletonScope()
  const todoEventACLSubscriber = container.get(TodoEventACLSubscriber)
  await todoEventACLSubscriber.subscribe()
}
