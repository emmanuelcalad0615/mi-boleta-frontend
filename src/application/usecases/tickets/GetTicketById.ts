import { TicketRepository } from '@/domain/repositories/TicketRepository';
import { Ticket } from '@/domain/entities/Ticket';

export class GetTicketById {
  constructor(private readonly repo: TicketRepository) {}

  execute(id: string): Promise<Ticket> {
    return this.repo.getById(id);
  }
}
