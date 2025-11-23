import { fakerFR as faker } from '@faker-js/faker'
import { TodoStatus } from '@/task/domain/entity/TodoStatus.ts'
import { v4 as uuidv4 } from 'uuid'
import type { ISerializedTodo } from '@/task/infrastructure/repository/LocalStorageTodoRepository.ts'
import { INTERFACES as CORE_INTERFACES } from '@/core/infrastructure/di/interfaces.ts'
import { injectable, inject } from 'inversify'
import type { IEventBus } from '@/core/infrastructure/events/IEventBus.ts'
import { TodoCreatedIntegrationEvent } from '@/task/integration/events/TodoCreatedIntegrationEvent.ts'
import { TodoCompletedIntegrationEvent } from '@/task/integration/events/TodoCompletedIntegrationEvent.ts'
import { TodoAbortedIntegrationEvent } from '@/task/integration/events/TodoAbortedIntegrationEvent.ts'
@injectable()
export class TodoSeederService {
  constructor(@inject(CORE_INTERFACES.IEventBus) private _eventBus: IEventBus) {}
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
    this.createMockEvents(todos)
    return todos
  }

  private createMockEvents(todos: ISerializedTodo[]) {
    for (const item of todos) {
      this._eventBus.publish(new TodoCreatedIntegrationEvent(item.id))
      if (item.status === TodoStatus.COMPLETED) {
        this._eventBus.publish(
          new TodoCompletedIntegrationEvent(faker.number.int({ min: 1000000, max: 100000000 }))
        )
      }
      if (item.status === TodoStatus.ABORTED) {
        this._eventBus.publish(new TodoAbortedIntegrationEvent(item.id))
      }
    }
  }
}
