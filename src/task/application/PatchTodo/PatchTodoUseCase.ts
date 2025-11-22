import type { IUseCase } from '@/task/application/IUseCase.ts'
import { inject, injectable } from 'inversify'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'

import type { ITodoRepository } from '@/task/domain/repository/ITodoRepository.ts'
import type { IDeleteTodoCommand } from '@/task/application/DeleteTodo/IDeleteTodoCommand.ts'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
import { NotFoundError } from '@/task/domain/error/NotFoundError.ts'
import { DomainError } from '@/core/domain/error/DomainError.ts'
import type { ErrorTodoPresenter } from '@/task/presentation/presenters/ErrorTodoPresenter.ts'
import type { IErrorViewModel } from '@/core/application/view/IErrorViewModel.ts'
import type { IPatchTodoCommand } from '@/task/application/PatchTodo/IPatchTodoCommand.ts'
import { TodoUpdatedEvent } from '@/task/domain/events/TodoUpdateEvent.ts'
import type { IGetTodoPresenter } from '@/task/application/IGetTodosPresenter.ts'

@injectable()
export class PatchTodoUseCase implements IUseCase<IDeleteTodoCommand, IErrorViewModel | void> {
  public constructor(
    @inject(INTERFACES.ITodoRepository) private readonly _todoRepository: ITodoRepository,
    @inject(CORE_INTERFACES.IEventBus) private readonly _eventBus: IEventBus,
    @inject(INTERFACES.IGetTodoPresenter) private readonly _getTodoPresenter: IGetTodoPresenter,
    @inject(INTERFACES.IErrorTodoPresenter)
    private readonly _errorTodoPresenter: ErrorTodoPresenter
  ) {}

  public async execute(input: IPatchTodoCommand): Promise<IErrorViewModel | void> {
    const todo = await this._todoRepository.findById(input.id)
    if (null === todo) {
      throw new NotFoundError(`Todo with id ${input.id} not found`)
    }
    try {
      if (input.title !== undefined) todo.updateTitle(input.title)
      if (input.description !== undefined) todo.updateDescription(input.description)

      await this._todoRepository.update(todo)

      this._eventBus.subscribe(TodoUpdatedEvent, (event: TodoUpdatedEvent) => {
        this._getTodoPresenter.presentTodo(event.todo)
      })

      todo.pullDomainEvents().forEach((event) => this._eventBus.publish(event))
    } catch (err) {
      if (err instanceof DomainError) {
        return this._errorTodoPresenter.presentDomainError(err)
      }
      throw err
    }
  }
}
