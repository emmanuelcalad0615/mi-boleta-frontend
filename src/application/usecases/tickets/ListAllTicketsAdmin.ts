import { AdminTicketRepository, AdminTicketFilters } from '@/domain/repositories/AdminTicketRepository';
import { TicketWithOwner } from '@/domain/entities/Ticket';
import { PaginatedResult } from '@/domain/value-objects/Pagination';

export class ListAllTicketsAdmin {
  constructor(private readonly repo: AdminTicketRepository) {}

  execute(filters: AdminTicketFilters): Promise<PaginatedResult<TicketWithOwner>> {
    return this.repo.listAll(filters);
  }
}
