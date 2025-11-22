import type { ITodoViewModel } from '@/task/application/query/GetTodosUseCase/ITodoViewModel.ts'

export class TodoViewModel implements ITodoViewModel {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public createdAt: string,
    public dueDate: string,
    public status: string,
    public chillometer: number | null
  ) {}

  public get chillIcon(): string | null {
    if (this.chillometer === null) return null

    if (this.chillometer >= 75) return '🔥'
    if (this.chillometer >= 50) return '😬'
    if (this.chillometer >= 25) return '🌤'
    return '❄️'
  }
}
