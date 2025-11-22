import type { DomainError } from '@/core/domain/error/DomainError.ts'
import type { IErrorViewModel } from '@/core/application/view/IErrorViewModel.ts'
import type { IPresenter } from '@/task/application/presenters/IPresenter.ts'
import type { NotFoundError } from '@/task/domain/error/NotFoundError.ts'

export interface IErrorTodoPresenter extends IPresenter {
  errorViewModel?: IErrorViewModel
  presentDomainError(error: DomainError): void
  presentNotFoundError(error: NotFoundError): void
}
