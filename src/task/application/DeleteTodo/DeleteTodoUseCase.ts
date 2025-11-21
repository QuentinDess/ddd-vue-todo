import type { IUseCase } from '@/task/application/IUseCase.ts'
import { inject, injectable } from 'inversify'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'

import type { ITodoRepository } from '@/task/domain/repository/ITodoRepository.ts'
import type { IDeleteTodoCommand } from '@/task/application/DeleteTodo/IDeleteTodoCommand.ts'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
import { NotFoundError } from '@/task/domain/error/NotFoundError.ts'
import { DomainError } from '@/core/domain/error/DomainError.ts'
import type { DeleteTodoPresenter } from '@/task/presentation/presenters/DeleteTodoPresenter.ts'
import type { IErrorViewModel } from '@/core/application/view/IErrorViewModel.ts'

@injectable()
export class DeleteTodoUseCase implements IUseCase<IDeleteTodoCommand, IErrorViewModel | void> {
  public constructor(
    @inject(INTERFACES.ITodoRepository) private readonly _todoRepository: ITodoRepository,
    @inject(CORE_INTERFACES.IEventBus) private readonly _eventBus: IEventBus,
    @inject(INTERFACES.IDeleteTodoPresenter)
    private readonly _deleteTodoPresenter: DeleteTodoPresenter
  ) {}

  public async execute(input: IDeleteTodoCommand): Promise<IErrorViewModel | void> {
    const todo = await this._todoRepository.findById(input.id)
    if (null === todo) {
      throw new NotFoundError(`Todo with id ${input.id} not found`)
    }

    try {
      todo.delete()
      await this._todoRepository.delete(input.id)
      todo.pullDomainEvents().forEach((event) => this._eventBus.publish(event))
    } catch (err) {
      if (err instanceof DomainError) {
        return this._deleteTodoPresenter.presentDomainError(err)
      }
      throw err
    }
  }
}
