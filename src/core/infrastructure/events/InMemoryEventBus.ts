import { injectable } from 'inversify'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T> = new (...args: any[]) => T

@injectable()
export class InMemoryEventBus implements IEventBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handlers = new Map<Constructor<any>, Set<(event: any) => Promise<void> | void>>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private queue: any[] = []
  private isProcessing = false

  subscribe<T extends object>(
    eventType: Constructor<T>,
    handler: (event: T) => void | Promise<void>
  ): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set())
    }
    this.handlers.get(eventType)!.add(handler)

    return () => {
      this.handlers.get(eventType)?.delete(handler)
    }
  }

  async publish<T extends object>(event: T): Promise<void> {
    this.queue.push(event)
    await this.processQueue()
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing) return

    this.isProcessing = true

    while (this.queue.length > 0) {
      const event = this.queue.shift()
      const type = event.constructor
      const handlers = this.handlers.get(type)

      if (!handlers) continue

      for (const handler of handlers) {
        await handler(event)
      }
    }

    this.isProcessing = false
  }
}
