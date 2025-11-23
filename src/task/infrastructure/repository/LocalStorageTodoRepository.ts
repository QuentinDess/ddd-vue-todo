import { Todo } from '@/task/domain/entity/Todo'
import type { ITodoRepository } from '@/task/domain/repository/ITodoRepository'
import { injectable, inject } from 'inversify'
import { TodoSeederService } from '@/task/infrastructure/fixtures/TodoSeederService'
import type { TodoStatus } from '@/task/domain/entity/TodoStatus.ts'
import { INTERFACES } from '@/task/infrastructure/di/interfaces.ts'
import type { ITodoFactory } from '@/task/domain/factory/ITodoFactory.ts'

const STORAGE_KEY = 'todos'

export interface ISerializedTodo {
  title: string
  description: string
  due_date: Date
  created_at: Date
  status: TodoStatus
  id: string
}

@injectable()
export class LocalStorageTodoRepository implements ITodoRepository {
  constructor(
    @inject(TodoSeederService)
    private readonly seeder: TodoSeederService,
    @inject(INTERFACES.ITodoFactory) private readonly _todoFactory: ITodoFactory
  ) {
    this.ensureSeeded()
  }

  private ensureSeeded(): void {
    const existing = localStorage.getItem(STORAGE_KEY)
    if (!existing) {
      const seed = this.seeder.mockTodos(10)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
    }
  }

  private load(): Todo[] {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw).map((t: ISerializedTodo) =>
      this._todoFactory.fromPrimitive({
        title: t.title,
        description: t.description,
        createdAt: t.created_at,
        dueDate: t.due_date,
        status: t.status,
        id: t.id
      })
    )
  }

  private saveInLocalStorage(todos: Todo[]): void {
    const serialized: ISerializedTodo[] = todos.map((t) => ({
      title: t.title,
      description: t.description,
      created_at: t.createdAt,
      due_date: t.dueDate,
      status: t.status,
      id: t.id
    }))

    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized))
  }
  public async findAllBy(_filter: string[]): Promise<Todo[]> {
    return this.load()
  }

  public async findById(id: string): Promise<Todo | null> {
    const todos = this.load()
    return todos.find((t) => t.id === id) ?? null
  }

  public async save(todo: Todo): Promise<void> {
    const todos = this.load()
    todos.push(todo)
    this.saveInLocalStorage(todos)
  }

  public async update(updated: Todo): Promise<Todo> {
    const todos = this.load().map((t) => (t.id === updated.id ? updated : t))
    this.saveInLocalStorage(todos)
    return updated
  }

  public async delete(id: string): Promise<void> {
    const todos = this.load().filter((t) => t.id !== id)
    this.saveInLocalStorage(todos)
  }
}
