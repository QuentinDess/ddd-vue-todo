import { container } from '@/core/infrastructure/di/container.ts'
import { INTERFACES } from '@/core/infrastructure/di/interfaces.ts'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
import { InMemoryEventBus } from '@/core/infrastructure/events/InMemoryEventBus.ts'

export function coreModule() {
  container.bind<IEventBus>(INTERFACES.IEventBus).to(InMemoryEventBus).inSingletonScope()
}
