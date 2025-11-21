export interface IEventBus {
  publish(event: object): void
  subscribe<T>(eventType: new (...args: any[]) => T, handler: (event: T) => void): void
}
