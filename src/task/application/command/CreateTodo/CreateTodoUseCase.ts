import type { IUseCase } from '@/core/application/IUseCase.ts'
import { inject, injectable } from 'inversify'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'
import type { ITodoRepository } from '@/task/domain/repository/ITodoRepository.ts'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
import { NotFoundError } from '@/core/domain/error/NotFoundError.ts'
import { DomainError } from '@/core/domain/error/DomainError.ts'
import type { IGetTodoPresenter } from '@/task/application/presenters/IGetTodoPresenter.ts'
import type { ICreateTodoCommand } from '@/task/application/command/CreateTodo/ICreateTodoCommand.ts'
import { TodoDescription } from '@/task/domain/value_objects/TodoDescription.ts'
import { Todo } from '@/task/domain/entity/Todo.ts'
import { TodoTitle } from '@/task/domain/value_objects/TodoTitle.ts'
import { TodoCreatedEvent } from '@/task/domain/events/TodoCreatedEvent.ts'

@injectable()
export class CreateTodoUseCase implements IUseCase<ICreateTodoCommand, void> {
  public constructor(
    @inject(INTERFACES.ITodoRepository) private readonly _todoRepository: ITodoRepository,
    @inject(CORE_INTERFACES.IEventBus) private readonly _eventBus: IEventBus
  ) {}

  public async execute(input: ICreateTodoCommand, presenter: IGetTodoPresenter): Promise<void> {
    try {
      console.log(input)
      this._eventBus.subscribe(TodoCreatedEvent, (event: TodoCreatedEvent) => {
        presenter.presentTodo(event.todo)
      })

      const todo = Todo.create(
        TodoTitle.create(input.title),
        TodoDescription.create(input.description),
        new Date(input.dueDate)
      )

      await this._todoRepository.save(todo)

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
        return
      }
      console.error(err)
      throw err
    }
  }
}
