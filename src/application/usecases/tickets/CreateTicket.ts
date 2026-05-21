import { TicketRepository, CreateTicketInput } from '@/domain/repositories/TicketRepository';
import { Ticket } from '@/domain/entities/Ticket';

export class CreateTicket {
  constructor(private readonly repo: TicketRepository) {}

  execute(input: CreateTicketInput): Promise<Ticket> {
    return this.repo.create(input);
  }
}
