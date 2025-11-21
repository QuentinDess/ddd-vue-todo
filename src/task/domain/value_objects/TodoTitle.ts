import { DomainError } from '@/core/domain/error/DomainError.ts'

export class TodoTitle {
  private constructor(private readonly value: string) {}

  static create(title: string): TodoTitle {
    if (!title || title.trim().length === 0) {
      throw new DomainError('Title cannot be empty')
    }
    if (title.length > 100) {
      throw new DomainError('Title cannot exceed 100 characters')
    }
    return new TodoTitle(title)
  }

  getValue(): string {
    return this.value
  }
}
