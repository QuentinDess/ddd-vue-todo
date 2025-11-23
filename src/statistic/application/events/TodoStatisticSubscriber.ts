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

@injectable()
export class TodoStatisticSubscriber {
  constructor(@inject(CORE_INTERFACES.IEventBus) private _eventBus: IEventBus) {}

  subscribe(): void {
    this._eventBus.subscribe(
      TodoCreatedIntegrationEvent,
      async (event: TodoCreatedIntegrationEvent) => await this.onTodoCreated(event)
    )
    this._eventBus.subscribe(
      TodoCompletedIntegrationEvent,
      async (event: TodoCompletedIntegrationEvent) => await this.onTodoCompleted(event)
    )
    this._eventBus.subscribe(
      TodoAbortedIntegrationEvent,
      async (event: TodoAbortedIntegrationEvent) => await this.onTodoAborted(event)
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
}
