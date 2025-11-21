import type { IUseCase } from '@/task/application/IUseCase.ts'
import type { IGetTodosDto } from '@/task/application/GetTodosUseCase/IGetTodosDto.ts'
import type { IGetTodosResult } from '@/task/application/GetTodosUseCase/IGetTodosResult.ts'
import { inject, injectable } from 'inversify'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import type { ITodoRepository } from '@/task/domain/repository/ITodoRepository.ts'
import type { IGetTodosPresenter } from '@/task/application/GetTodosUseCase/IGetTodosPresenter.ts'

@injectable()
export class GetTodosUseCase implements IUseCase<IGetTodosDto, IGetTodosResult> {
  public constructor(
    @inject(INTERFACES.ITodoRepository) private readonly _todoRepository: ITodoRepository
  ) {}

  public async execute(input: IGetTodosDto): Promise<IGetTodosResult> {
    const todos = await this._todoRepository.findAllBy(input.filter)
    return { todos: todos }
  }
}
