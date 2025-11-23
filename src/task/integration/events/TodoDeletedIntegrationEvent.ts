export class TodoDeletedIntegrationEvent {
  constructor(
    public readonly status: string,
    public readonly completionTime: number
  ) {}
}
