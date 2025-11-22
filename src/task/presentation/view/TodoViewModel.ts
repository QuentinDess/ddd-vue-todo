import type { ITodoViewModel } from '@/task/application/query/GetTodosUseCase/ITodoViewModel.ts'

export class TodoViewModel implements ITodoViewModel {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public createdAt: string,
    public dueDate: string,
    public status: string
  ) {}
}
