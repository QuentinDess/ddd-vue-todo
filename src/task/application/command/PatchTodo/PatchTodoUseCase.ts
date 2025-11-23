import type { IUseCase } from '@/core/application/IUseCase.ts'
import { inject, injectable } from 'inversify'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'
import type { ITodoRepository } from '@/task/domain/repository/ITodoRepository.ts'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
import { NotFoundError } from '@/core/domain/error/NotFoundError.ts'
import { DomainError } from '@/core/domain/error/DomainError.ts'
import type { IPatchTodoCommand } from '@/task/application/command/PatchTodo/IPatchTodoCommand.ts'
import { TodoUpdatedEvent } from '@/task/domain/events/TodoUpdateEvent.ts'
import type { IGetTodoPresenter } from '@/task/application/presenters/IGetTodoPresenter.ts'

@injectable()
export class PatchTodoUseCase implements IUseCase<IPatchTodoCommand, void> {
  public constructor(
    @inject(INTERFACES.ITodoRepository) private readonly _todoRepository: ITodoRepository,
    @inject(CORE_INTERFACES.IEventBus) private readonly _eventBus: IEventBus
  ) {}

  public async execute(input: IPatchTodoCommand, presenter: IGetTodoPresenter): Promise<void> {
    try {
      const todo = await this._todoRepository.findById(input.id)
      if (null === todo) {
        throw new NotFoundError(`Todo with id ${input.id} not found`)
      }

      if (input.title !== undefined) todo.updateTitle(input.title)
      if (input.description !== undefined) todo.updateDescription(input.description)

      await this._todoRepository.update(todo)

      this._eventBus.subscribe(TodoUpdatedEvent, (event: TodoUpdatedEvent) => {
        presenter.presentTodo(event.todo)
      })

      await Promise.all(
        todo.pullDomainEvents().map(async (event) => await this._eventBus.publish(event))
      )
    } catch (err) {
      if (err instanceof DomainError) {
        presenter.presentDomainError(err)
        return
      }
      if (err instanceof NotFoundError) {
        presenter.presentNotFoundError(err)
      }
      throw err
    }
  }
}
