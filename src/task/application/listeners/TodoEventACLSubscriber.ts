import { injectable, inject } from 'inversify'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
import { TodoCreatedEvent } from '@/task/domain/events/TodoCreatedEvent.ts'
import { TodoCreatedIntegrationEvent } from '@/task/integration/events/TodoCreatedIntegrationEvent.ts'

/** Subscribe to Domain events and pusblish integration events for ACL and bounded context **/
@injectable()
export class TodoEventACLSubscriber {
  constructor(@inject(CORE_INTERFACES.IEventBus) private readonly _eventBus: IEventBus) {}

  subscribe() {
    this._eventBus.subscribe(TodoCreatedEvent, (event: TodoCreatedEvent) => {
      const todoCreatedIntegrationEvent = new TodoCreatedIntegrationEvent(event.todo.id)
      this._eventBus.publish(todoCreatedIntegrationEvent)
    })
  }
}
