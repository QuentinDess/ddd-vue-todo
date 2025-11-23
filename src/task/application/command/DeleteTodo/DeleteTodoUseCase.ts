import type { IUseCase } from '@/core/application/IUseCase.ts'
import { inject, injectable } from 'inversify'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'
import type { ITodoRepository } from '@/task/domain/repository/ITodoRepository.ts'
import type { IDeleteTodoCommand } from '@/task/application/command/DeleteTodo/IDeleteTodoCommand.ts'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
import { NotFoundError } from '@/core/domain/error/NotFoundError.ts'
import { DomainError } from '@/core/domain/error/DomainError.ts'
import { TodoDeletedEvent } from '@/task/domain/events/TodoDeletedEvent.ts'
import type { IDeleteTodoPresenter } from '@/task/application/presenters/IDeleteTodoPresenter.ts'

@injectable()
export class DeleteTodoUseCase implements IUseCase<IDeleteTodoCommand, void> {
  public constructor(
    @inject(INTERFACES.ITodoRepository) private readonly _todoRepository: ITodoRepository,
    @inject(CORE_INTERFACES.IEventBus) private readonly _eventBus: IEventBus
  ) {}

  public async execute(input: IDeleteTodoCommand, presenter: IDeleteTodoPresenter): Promise<void> {
    const todo = await this._todoRepository.findById(input.id)
    if (null === todo) {
      throw new NotFoundError(`Todo with id ${input.id} not found`)
    }

    try {
      todo.delete()
      await this._todoRepository.delete(input.id)
      this._eventBus.subscribe(TodoDeletedEvent, (event: TodoDeletedEvent) => {
        presenter.presentDeletedTodo(event.id)
      })
      todo.pullDomainEvents().forEach((event) => this._eventBus.publish(event))
    } catch (err) {
      if (err instanceof DomainError) {
        presenter.presentDomainError(err)
        return
      }
      throw err
    }
  }
}
