import type { ITodoEvent } from '@/task/domain/events/ITodoEvent.ts'

export class TodoDeletedEvent implements ITodoEvent {
  constructor(public readonly id: string) {}
}
