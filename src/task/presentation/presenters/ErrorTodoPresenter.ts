import type { IErrorTodoPresenter } from '@/task/presentation/presenters/IErrorTodoPresenter.ts'
import type { DomainError } from '@/core/domain/error/DomainError.ts'
import { ErrorViewModel } from '@/core/ui/view/ErrorViewModel.ts'

export class ErrorTodoPresenter implements IErrorTodoPresenter {
  presentDomainError(error: DomainError): ErrorViewModel {
    return new ErrorViewModel(error.internal_code, error.message)
  }
}
