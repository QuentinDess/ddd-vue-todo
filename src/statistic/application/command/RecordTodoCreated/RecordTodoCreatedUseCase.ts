import type { IUseCase } from '@/core/application/IUseCase.ts'
import { inject, injectable } from 'inversify'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
import type { IRecordTodoCreatedCommand } from '@/statistic/application/command/RecordTodoCreated/IRecordTodoCreatedCommand.ts'
import type { IGlobalTodoStatisticRepository } from '@/statistic/domain/repository/IGlobalTodoStatisticRepository.ts'
import { INTERFACES } from '@/statistic/infrastructure/di/interfaces.ts'
import { ApplicationStatisticUpdatedEvent } from '@/statistic/application/events/ApplicationStatisticUpdatedEvent.ts'

@injectable()
export class RecordTodoCreatedUseCase implements IUseCase<IRecordTodoCreatedCommand> {
  public constructor(
    @inject(INTERFACES.IGlobalTodoStatisticRepository)
    private readonly _globalTodoStatisticRepository: IGlobalTodoStatisticRepository,
    @inject(CORE_INTERFACES.IEventBus) private readonly _eventBus: IEventBus
  ) {}

  public async execute(_input: IRecordTodoCreatedCommand): Promise<void> {
    const statistic = await this._globalTodoStatisticRepository.get()
    statistic.recordCreated()
    await this._globalTodoStatisticRepository.save(statistic)
    this._eventBus.publish(new ApplicationStatisticUpdatedEvent())
  }
}
