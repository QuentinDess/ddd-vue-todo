import { DomainError } from '@/core/domain/error/DomainError.ts'

export class NonNegativeNumber {
  constructor(public readonly value: number) {
    if (value < 0) throw new DomainError('Value cannot be negative')
  }

  increment(): NonNegativeNumber {
    return new NonNegativeNumber(this.value + 1)
  }
}
