import type { IUseCase } from '@/core/application/IUseCase.ts'
import { inject, injectable } from 'inversify'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
import type { IGlobalTodoStatisticRepository } from '@/statistic/domain/repository/IGlobalTodoStatisticRepository.ts'
import { INTERFACES } from '@/statistic/infrastructure/di/interfaces.ts'
import { ApplicationStatisticUpdatedEvent } from '@/statistic/application/events/ApplicationStatisticUpdatedEvent.ts'
import type { IRecordTodoDeletedCommand } from '@/statistic/application/command/RecordTodoDeleted/IRecordTodoDeletedCommand.ts'
import type { TodoStatus } from '@/statistic/domain/value_objects/TodoStatus.ts'

@injectable()
export class RecordTodoDeletedUseCase implements IUseCase<IRecordTodoDeletedCommand> {
  public constructor(
    @inject(INTERFACES.IGlobalTodoStatisticRepository)
    private readonly _globalTodoStatisticRepository: IGlobalTodoStatisticRepository,
    @inject(CORE_INTERFACES.IEventBus) private readonly _eventBus: IEventBus
  ) {}

  public async execute(input: IRecordTodoDeletedCommand): Promise<void> {
    const statistic = await this._globalTodoStatisticRepository.get()
    statistic.unrecord(input.status as TodoStatus, input.durationMs)
    await this._globalTodoStatisticRepository.save(statistic)
    await this._eventBus.publish(new ApplicationStatisticUpdatedEvent())
  }
}
