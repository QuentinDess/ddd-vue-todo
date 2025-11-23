import type { Constructor } from '@/core/infrastructure/events/InMemoryEventBus.ts'

export interface IEventBus {
  publish(event: object): void
  subscribe<T extends object>(eventType: Constructor<T>, handler: (event: T) => void): void
}
