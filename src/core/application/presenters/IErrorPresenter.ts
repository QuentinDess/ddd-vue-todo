import type { DomainError } from '@/core/domain/error/DomainError.ts'
import type { IErrorViewModel } from '@/core/application/view/IErrorViewModel.ts'
import type { IPresenter } from '@/core/application/presenters/IPresenter.ts'
import type { NotFoundError } from '@/core/domain/error/NotFoundError.ts'

export interface IErrorPresenter extends IPresenter {
  errorViewModel?: IErrorViewModel
  presentDomainError(error: DomainError): void
  presentNotFoundError(error: NotFoundError): void
}
