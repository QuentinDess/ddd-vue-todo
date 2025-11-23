import type { IErrorPresenter } from '@/core/application/presenters/IErrorPresenter.ts'
import type { DomainError } from '@/core/domain/error/DomainError.ts'
import { ErrorViewModel } from '@/core/presentation/ui/view/ErrorViewModel.ts'
import type { IErrorViewModel } from '@/core/application/view/IErrorViewModel.ts'
import type { NotFoundError } from '@/core/domain/error/NotFoundError.ts'

export abstract class ErrorPresenter implements IErrorPresenter {
  errorViewModel?: IErrorViewModel
  presentDomainError(error: DomainError): void {
    this.errorViewModel = new ErrorViewModel(error.internal_code, error.message)
  }
  presentNotFoundError(error: NotFoundError): void {
    this.errorViewModel = new ErrorViewModel(404, error.message)
  }
}
