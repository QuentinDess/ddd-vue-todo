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

  subscribe(): void {
    this._eventBus.subscribe(TodoCreatedIntegrationEvent, (event: TodoCreatedIntegrationEvent) =>
      this.onTodoCreated(event)
    )
    this._eventBus.subscribe(
      TodoCompletedIntegrationEvent,
      (event: TodoCompletedIntegrationEvent) => this.onTodoCompleted(event)
    )
    this._eventBus.subscribe(TodoAbortedIntegrationEvent, (event: TodoAbortedIntegrationEvent) =>
      this.onTodoAborted(event)
    )
    this._eventBus.subscribe(TodoDeletedIntegrationEvent, (event: TodoDeletedIntegrationEvent) =>
      this.onTodoDeleted(event)
    )
  }

  private onTodoCreated(_event: TodoCreatedIntegrationEvent) {
    const handler = container.get<RecordTodoCreatedUseCase>(RecordTodoCreatedUseCase)
    handler.execute({})
  }

  private onTodoCompleted(event: TodoCompletedIntegrationEvent) {
    const handler = container.get<RecordTodoCompletedUseCase>(RecordTodoCompletedUseCase)
    handler.execute({ totalDuration: event.totalDuration })
  }

  private onTodoAborted(_event: TodoAbortedIntegrationEvent) {
    const handler = container.get<RecordTodoAbortedUseCase>(RecordTodoAbortedUseCase)
    handler.execute({})
  }

  private onTodoDeleted(event: TodoDeletedIntegrationEvent) {
    const handler = container.get<RecordTodoDeletedUseCase>(RecordTodoDeletedUseCase)
    handler.execute({ status: event.status, durationMs: event.completionTime })
  }
}
