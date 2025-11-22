import type { IPresenter } from '@/task/application/presenters/IPresenter.ts'

export interface IUseCase<TInput, TOutput = void> {
  execute(input: TInput, presenter?: IPresenter): Promise<TOutput>
}
