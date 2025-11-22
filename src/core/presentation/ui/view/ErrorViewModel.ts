import type { IErrorViewModel } from '@/core/application/view/IErrorViewModel.ts'

export class ErrorViewModel implements IErrorViewModel {
  constructor(
    public code: number,
    public message: string
  ) {}
}
