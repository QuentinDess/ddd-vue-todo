import { injectable, inject } from 'inversify'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
import { TodoCreatedIntegrationEvent } from '@/task/integration/events/TodoCreatedIntegrationEvent.ts'
import { container } from '@/core/infrastructure/di/container.ts'
import { RecordTodoCreatedUseCase } from '@/statistic/application/command/RecordTodoCreated/RecordTodoCreatedUseCase.ts'
import { TodoCompletedIntegrationEvent } from '@/task/integration/events/TodoCompletedIntegrationEvent.ts'
import { RecordTodoCompletedUseCase } from '@/statistic/application/command/RecordTodoCompleted/RecordTodoCompletedUseCase.ts'
import { TodoAbortedIntegrationEvent } from '@/task/integration/events/TodoAbortedIntegrationEvent.ts'
import { RecordTodoAbortedUseCase } from '@/statistic/application/command/RecordTodoAborted/RecordTodoAbortedUseCase.ts'
import { TodoDeletedIntegrationEvent } from '@/task/integration/events/TodoDeletedIntegrationEvent.ts'
import { RecordTodoDeletedUseCase } from '@/statistic/application/command/RecordTodoDeleted/RecordTodoDeletedUseCase.ts'

@injectable()
export class TodoStatisticSubscriber {
  constructor(@inject(CORE_INTERFACES.IEventBus) private _eventBus: IEventBus) {}

  async subscribe(): Promise<void> {
    await this._eventBus.subscribe(
      TodoCreatedIntegrationEvent,
      async (event: TodoCreatedIntegrationEvent) => await this.onTodoCreated(event)
    )
    await this._eventBus.subscribe(
      TodoCompletedIntegrationEvent,
      async (event: TodoCompletedIntegrationEvent) => await this.onTodoCompleted(event)
    )
    await this._eventBus.subscribe(
      TodoAbortedIntegrationEvent,
      async (event: TodoAbortedIntegrationEvent) => await this.onTodoAborted(event)
    )
    await this._eventBus.subscribe(
      TodoDeletedIntegrationEvent,
      async (event: TodoDeletedIntegrationEvent) => await this.onTodoDeleted(event)
    )
  }

  private async onTodoCreated(_event: TodoCreatedIntegrationEvent) {
    const handler = container.get<RecordTodoCreatedUseCase>(RecordTodoCreatedUseCase)
    await handler.execute({})
  }

  private async onTodoCompleted(event: TodoCompletedIntegrationEvent) {
    const handler = container.get<RecordTodoCompletedUseCase>(RecordTodoCompletedUseCase)
    await handler.execute({ totalDuration: event.totalDuration })
  }

  private async onTodoAborted(_event: TodoAbortedIntegrationEvent) {
    const handler = container.get<RecordTodoAbortedUseCase>(RecordTodoAbortedUseCase)
    await handler.execute({})
  }

  private async onTodoDeleted(event: TodoDeletedIntegrationEvent) {
    const handler = container.get<RecordTodoDeletedUseCase>(RecordTodoDeletedUseCase)
    await handler.execute({ status: event.status, durationMs: event.completionTime })
  }
}
