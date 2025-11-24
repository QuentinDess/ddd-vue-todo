import { v4 as uuidv4 } from 'uuid'
import { TodoStatus } from '@/task/domain/value_objects/TodoStatus.ts'
import type { ITodoEvent } from '@/task/domain/events/ITodoEvent.ts'
import { TodoDeletedEvent } from '@/task/domain/events/TodoDeletedEvent.ts'
import { CannotDeleteCompletedTodo } from '@/task/domain/error/CannotDeleteCompletedTodo.ts'
import { TodoTitle } from '@/task/domain/value_objects/TodoTitle.ts'
import { TodoDescription } from '@/task/domain/value_objects/TodoDescription.ts'
import { CompletionWindow } from '@/task/domain/value_objects/CompletionWindow.ts'
import { TodoUpdatedEvent } from '@/task/domain/events/TodoUpdateEvent.ts'
import { CannotDoTodoTransition } from '@/task/domain/error/CannotDoTodoTransition.ts'
import { TodoCreatedEvent } from '@/task/domain/events/TodoCreatedEvent.ts'
import { DomainError } from '@/core/domain/error/DomainError.ts'

export class Todo {
  private constructor(
    private _title: TodoTitle,
    private _description: TodoDescription,
    private _completionWindow: CompletionWindow,
    private _status: TodoStatus,
    public readonly id: string
  ) {}

  public static create(title: TodoTitle, description: TodoDescription, dueDate: Date): Todo {
    const dateRange = CompletionWindow.create(new Date(), dueDate)
    const todo = new Todo(title, description, dateRange, TodoStatus.IN_PROGRESS, uuidv4())
    todo.domainEvents.push(new TodoCreatedEvent(todo))

    return todo
  }

  public getChillometer(): number | null {
    if (this._status === TodoStatus.COMPLETED || this._status === TodoStatus.ABORTED) {
      return null
    }

    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const nowTime = now.getTime()

    const createdAtDate = new Date(this._completionWindow.getCreatedAt())
    createdAtDate.setHours(0, 0, 0, 0)
    const createdAt = createdAtDate.getTime()

    const dueDateObj = new Date(this._completionWindow.getDueDate())
    dueDateObj.setHours(0, 0, 0, 0)
    const dueDate = dueDateObj.getTime()

    const totalTime = dueDate - createdAt
    const remainingTime = dueDate - nowTime

    const totalDays = totalTime / (1000 * 60 * 60 * 24)
    const remainingDays = remainingTime / (1000 * 60 * 60 * 24)

    if (remainingTime <= 0) return 100
    if (totalTime <= 0) return 100

    const remainingPressure = Math.max(0, 100 - remainingDays * 0.5)
    const deadlinePressure = Math.max(0, 100 - totalDays * 0.5)

    return Math.round(Math.max(remainingPressure, deadlinePressure))
  }

  public get title(): string {
    return this._title.getValue()
  }
  public get description(): string {
    return this._description.getValue()
  }

  public get status(): TodoStatus {
    return this._status
  }

  public get createdAt(): Date {
    return this._completionWindow.getCreatedAt()
  }

  public get dueDate(): Date {
    return this._completionWindow.getDueDate()
  }

  public updateTitle(newTitle: string) {
    this.noUpdateOnCompletedTodo()
    this._title = TodoTitle.create(newTitle)
    this.domainEvents.push(new TodoUpdatedEvent(this))
  }

  public updateDescription(newDescription: string) {
    this.noUpdateOnCompletedTodo()
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

  complete() {
    if (this.status === TodoStatus.COMPLETED || this.status === TodoStatus.ABORTED) {
      throw new CannotDoTodoTransition(this.status, TodoStatus.COMPLETED)
    }
    this._status = TodoStatus.COMPLETED
    this.domainEvents.push(new TodoUpdatedEvent(this))
  }

  abort() {
    if (this.status === TodoStatus.COMPLETED || this.status === TodoStatus.ABORTED) {
      throw new CannotDoTodoTransition(this.status, TodoStatus.ABORTED)
    }
    this._status = TodoStatus.ABORTED
    this.domainEvents.push(new TodoUpdatedEvent(this))
  }

  private noUpdateOnCompletedTodo(): void {
    if (this.status === TodoStatus.COMPLETED) {
      throw new DomainError('You should not update completed todo')
    }
  }

  public static reconstitute(
    id: string,
    title: TodoTitle,
    description: TodoDescription,
    completionWindow: CompletionWindow,
    status: TodoStatus
  ): Todo {
    return new Todo(title, description, completionWindow, status, id)
  }

  completionTime() {
    return new Date().getTime() - this._completionWindow.getCreatedAt().getTime()
  }
}
