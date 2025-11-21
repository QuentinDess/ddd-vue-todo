import type { Todo } from '@/task/domain/entity/Todo.ts'

export interface IGetTodosResult {
  todos: Todo[]
}
