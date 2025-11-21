import { Todo } from '@/task/domain/entity/Todo.ts'
import { fakerFR as faker } from '@faker-js/faker'
import { TodoStatus } from '@/task/domain/entity/TodoStatus.ts'

export class TodoSeederService {
  mockTodos = (n: number): Todo[] => {
    const todos = []
    for (let i = 0; i < n; i++) {
      const todo = new Todo(
        faker.lorem.words(2),
        faker.lorem.paragraph(2),
        faker.date.future(),
        faker.date.past(),
        faker.helpers.arrayElement(Object.values(TodoStatus))
      )
      todos.push(todo)
    }
    return todos
  }
}
