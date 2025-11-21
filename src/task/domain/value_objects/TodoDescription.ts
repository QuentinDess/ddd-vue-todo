import { DomainError } from '@/core/domain/error/DomainError.ts'

export class TodoDescription {
  private constructor(public readonly value: string) {}

  public static create(description: string): TodoDescription {
    const trimmed = description.trim()

    if (trimmed.length === 0) {
      throw new DomainError('Todo description cannot be empty')
    }

    if (trimmed.length > 500) {
      throw new DomainError('Todo description cannot exceed 500 characters')
    }

    return new TodoDescription(trimmed)
  }

  public getValue(): string {
    return this.value
  }
}
