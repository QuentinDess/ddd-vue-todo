import { injectable, inject } from 'inversify'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
import { TodoCreatedIntegrationEvent } from '@/task/integration/events/TodoCreatedIntegrationEvent.ts'
import { container } from '@/core/infrastructure/di/container.ts'
import { RecordTodoCreatedUseCase } from '@/statistic/application/command/RecordTodoCreated/RecordTodoCreatedUseCase.ts'
import { TodoCompletedIntegrationEvent } from '@/task/integration/events/TodoCompletedIntegrationEvent.ts'
import { RecordTodoCompletedUseCase } from '@/statistic/application/command/RecordTodoTransition/RecordTodoCompletedUseCase.ts'

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
  }

  private async onTodoCreated(_event: TodoCreatedIntegrationEvent) {
    const handler = container.get(RecordTodoCreatedUseCase)
    await handler.execute({})
  }

  private async onTodoCompleted(event: TodoCompletedIntegrationEvent) {
    const handler = container.get(RecordTodoCompletedUseCase)
    await handler.execute({ totalDuration: event.totalDuration })
  }
}
