import type { IUseCase } from '@/core/application/IUseCase.ts'
import { inject, injectable } from 'inversify'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
import type { IGlobalTodoStatisticRepository } from '@/statistic/domain/repository/IGlobalTodoStatisticRepository.ts'
import { INTERFACES } from '@/statistic/infrastructure/di/interfaces.ts'
import { ApplicationStatisticUpdatedEvent } from '@/statistic/application/events/ApplicationStatisticUpdatedEvent.ts'
import type { IRecordTodoAbortedCommand } from '@/statistic/application/command/RecordTodoAborted/IRecordTodoAbortedCommand.ts'

@injectable()
export class RecordTodoAbortedUseCase implements IUseCase<IRecordTodoAbortedCommand> {
  public constructor(
    @inject(INTERFACES.IGlobalTodoStatisticRepository)
    private readonly _globalTodoStatisticRepository: IGlobalTodoStatisticRepository,
    @inject(CORE_INTERFACES.IEventBus) private readonly _eventBus: IEventBus
  ) {}

  public async execute(_input: IRecordTodoAbortedCommand): Promise<void> {
    const statistic = await this._globalTodoStatisticRepository.get()
    statistic.recordAborted()
    await this._globalTodoStatisticRepository.save(statistic)
    this._eventBus.publish(new ApplicationStatisticUpdatedEvent())
  }
}
