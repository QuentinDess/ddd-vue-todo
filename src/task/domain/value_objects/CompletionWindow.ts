import { DomainError } from '@/core/domain/error/DomainError.ts'

export class CompletionWindow {
  private constructor(
    private readonly createdAt: Date,
    private readonly dueDate: Date
  ) {}

  public static create(createdAt: Date, dueDate: Date): CompletionWindow {
    this.noCreatedAtInFuture(createdAt)
    this.dueDateShouldBeAfterCreateDate(dueDate, createdAt)
    this.noTodayDueDate(createdAt, dueDate)

    return new CompletionWindow(createdAt, dueDate)
  }

  private static noTodayDueDate(createdAt: Date, dueDate: Date) {
    const sameDay =
      createdAt.getFullYear() === dueDate.getFullYear() &&
      createdAt.getMonth() === dueDate.getMonth() &&
      createdAt.getDate() === dueDate.getDate()

    if (sameDay) {
      throw new DomainError('Due date cannot be on the same day as creation date.')
    }
  }

  private static dueDateShouldBeAfterCreateDate(dueDate: Date, createdAt: Date) {
    if (dueDate <= createdAt) {
      throw new DomainError('Due date must be after creation date.')
    }
  }

  private static noCreatedAtInFuture(createdAt: Date) {
    if (createdAt.getTime() > Date.now()) {
      throw new DomainError('Creation date cannot be in the future.')
    }
  }

  getCreatedAt() {
    return this.createdAt
  }
  getDueDate() {
    return this.dueDate
  }
}
