import { container } from '@/core/infrastructure/di/container.ts'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'
import { ApplicationTodoTransitionEvent } from '@/task/application/events/ApplicationTodoTransitionEvent.ts'
import type { InMemoryEventBus } from '@/core/infrastructure/events/InMemoryEventBus.ts'
import type { IApplicationEvent } from '@/task/application/events/IApplicationEvent.ts'

export const useUiEventStore = defineStore('uiTodoEventStore', () => {
  const currentEvent = ref<IApplicationEvent | null>(null)

  const applicationEventBus = container.get<InMemoryEventBus>(CORE_INTERFACES.IEventBus)

  applicationEventBus.subscribe(
    ApplicationTodoTransitionEvent,
    (evt: ApplicationTodoTransitionEvent) => {
      currentEvent.value = evt
    }
  )
  const consume = (): void => {
    currentEvent.value = null
  }
  return { currentEvent, consume }
})
