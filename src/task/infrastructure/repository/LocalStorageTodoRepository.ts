import { Todo } from '@/task/domain/entity/Todo'
import type { ITodoRepository } from '@/task/domain/repository/ITodoRepository'
import { injectable, inject } from 'inversify'
import { TodoSeederService } from '@/task/infrastructure/fixtures/TodoSeederService'

const STORAGE_KEY = 'todos'

@injectable()
export class LocalStorageTodoRepository implements ITodoRepository {
  constructor(
    @inject(TodoSeederService)
    private readonly seeder: TodoSeederService
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
    return JSON.parse(raw).map((t: Todo) => t)
  }

  private saveInLocalStorage(todos: Todo[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }

  public async findAllBy(filter: string[]): Promise<Todo[]> {
    return this.load()
  }

  public async findById(id: string): Promise<Todo | null> {
    const todos = this.load()
    const getTodo = todos.find((t) => t.id === id)
    if (!getTodo) return null
    return new Todo(
      getTodo.name,
      getTodo.description,
      getTodo.created_at,
      getTodo.due_date,
      getTodo.status,
      getTodo.id
    )
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
