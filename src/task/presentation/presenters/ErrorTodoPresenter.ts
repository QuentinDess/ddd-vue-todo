import type { IErrorTodoPresenter } from '@/task/application/presenters/IErrorTodoPresenter.ts'
import type { DomainError } from '@/core/domain/error/DomainError.ts'
import { ErrorViewModel } from '@/core/ui/view/ErrorViewModel.ts'
import type { IErrorViewModel } from '@/core/application/view/IErrorViewModel'
import type { NotFoundError } from '@/task/domain/error/NotFoundError.ts'

export abstract class ErrorTodoPresenter implements IErrorTodoPresenter {
  errorViewModel?: IErrorViewModel
  presentDomainError(error: DomainError): void {
    this.errorViewModel = new ErrorViewModel(error.internal_code, error.message)
  }
  presentNotFoundError(error: NotFoundError): void {
    this.errorViewModel = new ErrorViewModel(404, error.message)
  }
}
