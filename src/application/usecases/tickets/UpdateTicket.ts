import { TicketRepository, UpdateTicketInput } from '@/domain/repositories/TicketRepository';
import { Ticket } from '@/domain/entities/Ticket';

export class UpdateTicket {
  constructor(private readonly repo: TicketRepository) {}

  execute(id: string, input: UpdateTicketInput): Promise<Ticket> {
    return this.repo.update(id, input);
  }
}
