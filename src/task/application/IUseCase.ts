export interface IUseCase<TInput, TOutput = void> {
  execute(input: TInput): Promise<TOutput>
}
