import type { IUseCase } from '@/core/application/IUseCase.ts'
import { inject, injectable } from 'inversify'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'
import type { ITodoRepository } from '@/task/domain/repository/ITodoRepository.ts'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
import { NotFoundError } from '@/core/domain/error/NotFoundError.ts'
import { DomainError } from '@/core/domain/error/DomainError.ts'
import type { IGetTodoPresenter } from '@/task/application/presenters/IGetTodoPresenter.ts'
import { ApplicationTodoTransitionEvent } from '@/task/application/events/ApplicationTodoTransitionEvent.ts'
import type { IAbortTodoCommand } from '@/task/application/command/AbortTodo/IAbortTodoCommand.ts'
import { TodoAbortedIntegrationEvent } from '@/task/integration/events/TodoAbortedIntegrationEvent.ts'

@injectable()
export class AbortTodoUseCase implements IUseCase<IAbortTodoCommand, void> {
  public constructor(
    @inject(INTERFACES.ITodoRepository) private readonly _todoRepository: ITodoRepository,
    @inject(CORE_INTERFACES.IEventBus) private readonly _eventBus: IEventBus
  ) {}

  public async execute(input: IAbortTodoCommand, presenter: IGetTodoPresenter): Promise<void> {
    try {
      const todo = await this._todoRepository.findById(input.id)
      if (null === todo) {
        throw new NotFoundError(`Todo with id ${input.id} not found`)
      }
      todo.abort()
      await this._todoRepository.update(todo)
      await Promise.all(
        todo.pullDomainEvents().map(async (event) => await this._eventBus.publish(event))
      )
      this._eventBus.publish(new ApplicationTodoTransitionEvent(todo))
      this._eventBus.publish(new TodoAbortedIntegrationEvent(todo.id))
      presenter.presentTodo(todo)
    } catch (err) {
      if (err instanceof DomainError) {
        presenter.presentDomainError(err)
        return
      }
      if (err instanceof NotFoundError) {
        presenter.presentNotFoundError(err)
        return
      }
      throw err
    }
  }
}
