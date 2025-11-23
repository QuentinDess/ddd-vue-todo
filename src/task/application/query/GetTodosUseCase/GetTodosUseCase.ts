import type { IUseCase } from '@/core/application/IUseCase.ts'
import type { IGetTodosDto } from '@/task/application/query/GetTodosUseCase/IGetTodosDto.ts'
import { inject, injectable } from 'inversify'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import type { ITodoRepository } from '@/task/domain/repository/ITodoRepository.ts'
import type { IGetTodosPresenter } from '@/task/application/presenters/IGetTodosPresenter.ts'

@injectable()
export class GetTodosUseCase implements IUseCase<IGetTodosDto> {
  public constructor(
    @inject(INTERFACES.ITodoRepository) private readonly _todoRepository: ITodoRepository
  ) {}

  public async execute(input: IGetTodosDto, presenter: IGetTodosPresenter): Promise<void> {
    const todos = await this._todoRepository.findAllBy(input.filter)
    presenter.presentTodoList(todos)
  }
}
