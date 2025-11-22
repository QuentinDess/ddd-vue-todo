import type { IErrorTodoPresenter } from '@/task/presentation/presenters/IErrorTodoPresenter.ts'

export const INTERFACES = {
  ITodoRepository: Symbol.for('ITodoRepository'),
  IGetTodosPresenter: Symbol.for('IGetTodosPresenter'),
  IGetTodoPresenter: Symbol.for('IGetTodoPresenter'),
  IErrorTodoPresenter: Symbol.for('IErrorTodoPresenter')
}
