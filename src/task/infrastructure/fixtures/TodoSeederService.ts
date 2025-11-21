import { fakerFR as faker } from '@faker-js/faker'
import { TodoStatus } from '@/task/domain/entity/TodoStatus.ts'
import { v4 as uuidv4 } from 'uuid'
import type { ISerializedTodo } from '@/task/infrastructure/repository/LocalStorageTodoRepository.ts'

export class TodoSeederService {
  mockTodos = (n: number): ISerializedTodo[] => {
    const todos = []
    for (let i = 0; i < n; i++) {
      const todo = {
        title: faker.lorem.words(2),
        description: faker.lorem.paragraph(2),
        due_date: faker.date.future(),
        created_at: faker.date.past(),
        status: faker.helpers.arrayElement(Object.values(TodoStatus)),
        id: uuidv4()
      }
      todos.push(todo)
    }
    return todos
  }
}
