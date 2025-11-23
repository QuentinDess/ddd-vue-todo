import type { IPresenter } from '@/core/application/presenters/IPresenter.ts'

export interface IUseCase<TInput, TOutput = void> {
  execute(input: TInput, presenter?: IPresenter): Promise<TOutput>
}
