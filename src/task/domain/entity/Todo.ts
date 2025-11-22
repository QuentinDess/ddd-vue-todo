import { v4 as uuidv4 } from 'uuid'
import { TodoStatus } from '@/task/domain/entity/TodoStatus.ts'
import type { ITodoEvent } from '@/task/domain/events/ITodoEvent.ts'
import { TodoDeletedEvent } from '@/task/domain/events/TodoDeletedEvent.ts'
import { CannotDeleteCompletedTodo } from '@/task/domain/error/CannotDeleteCompletedTodo.ts'
import { TodoTitle } from '@/task/domain/value_objects/TodoTitle.ts'
import { TodoDescription } from '@/task/domain/value_objects/TodoDescription.ts'
import { CompletionWindow } from '@/task/domain/value_objects/CompletionWindow.ts'
import { TodoUpdatedEvent } from '@/task/domain/events/TodoUpdateEvent.ts'
export class Todo {
  public constructor(
    private _title: TodoTitle,
    private _description: TodoDescription,
    private _completionWindow: CompletionWindow,
    public readonly status: TodoStatus,
    public readonly id: string
  ) {}

  public static create(
    title: TodoTitle,
    description: TodoDescription,
    createdAt: Date,
    dueDate: Date,
    status: TodoStatus,
    id: string = uuidv4()
  ): Todo {
    const dateRange = CompletionWindow.create(createdAt, dueDate)
    return new Todo(title, description, dateRange, status, id)
  }

  public get title(): string {
    return this._title.getValue()
  }
  public get description(): string {
    return this._description.getValue()
  }

  public get createdAt(): Date {
    return this._completionWindow.getCreatedAt()
  }

  public get dueDate(): Date {
    return this._completionWindow.getDueDate()
  }

  public updateTitle(newTitle: string) {
    this._title = TodoTitle.create(newTitle)
    this.domainEvents.push(new TodoUpdatedEvent(this))
  }

  public updateDescription(newDescription: string) {
    this._description = TodoDescription.create(newDescription)
    this.domainEvents.push(new TodoUpdatedEvent(this))
  }

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
