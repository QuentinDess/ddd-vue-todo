import type { IUseCase } from '@/core/application/IUseCase.ts'
import { inject, injectable } from 'inversify'
import { INTERFACES } from '@/statistic/infrastructure/di/interfaces.ts'
import type { IGetStatisticQuery } from '@/statistic/application/query/GetStatistic/IGetStatisticQuery.ts'
import type { IStatisticPresenter } from '@/statistic/application/presenters/IStatisticPresenter.ts'
import type { IGlobalTodoStatisticRepository } from '@/statistic/domain/repository/IGlobalTodoStatisticRepository.ts'
import { DomainError } from '@/core/domain/error/DomainError.ts'
import { NotFoundError } from '@/core/domain/error/NotFoundError.ts'

@injectable()
export class GetStatisticUseCase implements IUseCase<IGetStatisticQuery> {
  public constructor(
    @inject(INTERFACES.IGlobalTodoStatisticRepository)
    private readonly _statisticRepository: IGlobalTodoStatisticRepository
  ) {}

  public async execute(input: IGetStatisticQuery, presenter: IStatisticPresenter): Promise<void> {
    try {
      const statistic = await this._statisticRepository.get()
      presenter.presentStatistic(statistic)
    } catch (error) {
      if (error instanceof DomainError) {
        presenter.presentDomainError(error)
        return
      }
      if (error instanceof NotFoundError) {
        presenter.presentNotFoundError(error)
        return
      }
      throw error
    }
  }
}
