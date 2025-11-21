import type { IDeleteTodoPresenter } from '@/task/application/DeleteTodo/IDeleteTodoPresenter.ts'
import type { DomainError } from '@/core/domain/error/DomainError.ts'
import { ErrorViewModel } from '@/core/ui/view/ErrorViewModel.ts'

export class DeleteTodoPresenter implements IDeleteTodoPresenter {
  presentDomainError(error: DomainError): ErrorViewModel {
    return new ErrorViewModel(error.internal_code, error.message)
  }
}
