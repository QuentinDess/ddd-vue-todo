import { DomainError } from '@/core/domain/error/DomainError.ts'

export class CompletionWindow {
  private constructor(
    private readonly createdAt: Date,
    private readonly dueDate: Date
  ) {}

  public static create(createdAt: Date, dueDate: Date): CompletionWindow {
    if (dueDate <= createdAt) {
      throw new DomainError('Due date must be after creation date.')
    }
    const sameDay =
      createdAt.getFullYear() === dueDate.getFullYear() &&
      createdAt.getMonth() === dueDate.getMonth() &&
      createdAt.getDate() === dueDate.getDate()

    if (sameDay) {
      throw new DomainError('Due date cannot be on the same day as creation date.')
    }

    return new CompletionWindow(createdAt, dueDate)
  }

  getCreatedAt() {
    return this.createdAt
  }
  getDueDate() {
    return this.dueDate
  }
}
