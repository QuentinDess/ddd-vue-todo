import type { DomainError } from '@/core/domain/error/DomainError.ts'
import type { IErrorViewModel } from '@/core/application/view/IErrorViewModel.ts'

export interface IErrorTodoPresenter {
  viewModel?: IErrorViewModel
  presentDomainError(error: DomainError): void
}
