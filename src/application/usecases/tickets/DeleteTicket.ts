import { TicketRepository } from '@/domain/repositories/TicketRepository';

export class DeleteTicket {
  constructor(private readonly repo: TicketRepository) {}

  execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
