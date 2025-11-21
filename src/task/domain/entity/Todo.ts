import { v4 as uuidv4 } from 'uuid'
import { TodoStatus } from '@/task/domain/entity/TodoStatus.ts'
import type { ITodoEvent } from '@/task/domain/events/ITodoEvent.ts'
import { TodoDeletedEvent } from '@/task/domain/events/TodoDeletedEvent.ts'
import { CannotDeleteCompletedTodo } from '@/task/domain/error/CannotDeleteCompletedTodo.ts'
export class Todo {
  public constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly due_date: Date,
    public readonly created_at: Date,
    public readonly status: TodoStatus,
    public readonly id: string = uuidv4()
  ) {}

  private domainEvents: ITodoEvent[] = []

  public delete(): void {
    if (this.status === TodoStatus.COMPLETED) {
      throw new CannotDeleteCompletedTodo()
    }

    this.domainEvents.push(new TodoDeletedEvent(this.id))
  }

  public pullDomainEvents(): object[] {
    const events = [...this.domainEvents]
    this.domainEvents = []
    return events
  }
}
