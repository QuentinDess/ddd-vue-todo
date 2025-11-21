import { injectable } from 'inversify'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'

@injectable()
export class InMemoryEventBus implements IEventBus {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private handlers = new Map<Function, Function[]>()

  publish(event: object): void {
    const type = event.constructor
    const subscribers = this.handlers.get(type) ?? []
    for (const handler of subscribers) {
      handler(event)
    }
  }

  subscribe<T>(eventType: new (...args: any[]) => T, handler: (event: T) => void): void {
    const handlers = this.handlers.get(eventType) ?? []
    handlers.push(handler)
    this.handlers.set(eventType, handlers)
  }
}
