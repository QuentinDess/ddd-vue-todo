import type { IErrorTodoPresenter } from '@/task/application/presenters/IErrorTodoPresenter.ts'

export interface IDeleteTodoPresenter extends IErrorTodoPresenter {
  deletedTodo?: string
  presentDeletedTodo(id: string): void
}
