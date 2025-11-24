export interface ITodoViewModel {
  id: string
  title: string
  description: string
  createdAt: string
  dueDate: string
  status: string
  chillometer: number | null
  get chillIcon(): string | null
}
