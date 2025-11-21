import { Todo } from '@/task/domain/entity/Todo.ts'

export interface ITodoRepository {
  findAllBy(filter: string[]): Promise<Todo[]>
  save(todo: Todo): Promise<void>
  update(updated: Todo): Promise<Todo>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Todo | null>
}
