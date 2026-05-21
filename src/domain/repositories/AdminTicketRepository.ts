import { TicketWithOwner } from '../entities/Ticket';
import { TicketFilters } from './TicketRepository';
import { PaginatedResult } from '../value-objects/Pagination';

export type AdminTicketFilters = TicketFilters & { userId?: string };

export interface AdminTicketRepository {
  listAll(filters: AdminTicketFilters): Promise<PaginatedResult<TicketWithOwner>>;
}
