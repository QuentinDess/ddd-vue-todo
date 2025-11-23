import type { IErrorPresenter } from '@/core/application/presenters/IErrorPresenter.ts'

export interface IDeleteTodoPresenter extends IErrorPresenter {
  deletedTodo?: string
  presentDeletedTodo(id: string): void
}
