import { TicketRepository, TicketFilters } from '@/domain/repositories/TicketRepository';
import { Ticket } from '@/domain/entities/Ticket';
import { PaginatedResult } from '@/domain/value-objects/Pagination';

export class ListTickets {
  constructor(private readonly repo: TicketRepository) {}

  execute(filters: TicketFilters): Promise<PaginatedResult<Ticket>> {
    return this.repo.list(filters);
  }
}
