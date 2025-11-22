import type { Todo } from '@/task/domain/entity/Todo.ts'

export interface ITodoFactory {
  fromPrimitive(raw: {
    title: string
    description: string
    createdAt: Date
    dueDate: Date
    status: string
    id: string
  }): Todo
}
