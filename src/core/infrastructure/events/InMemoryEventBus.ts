import { injectable } from 'inversify'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T> = new (...args: any[]) => T

@injectable()
export class InMemoryEventBus implements IEventBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handlers = new Map<Constructor<any>, Array<(event: unknown) => void>>()

  publish<T extends object>(event: T): void {
    const type = event.constructor as Constructor<T>
    const subscribers = this.handlers.get(type) ?? []
    for (const handler of subscribers) {
      handler(event) // type-safe
    }
  }

  subscribe<T extends object>(eventType: Constructor<T>, handler: (event: T) => void): void {
    const handlers = this.handlers.get(eventType) ?? []
    handlers.push(handler as (event: unknown) => void)
    this.handlers.set(eventType, handlers)
  }
}
