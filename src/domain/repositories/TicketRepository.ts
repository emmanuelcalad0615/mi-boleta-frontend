import { Ticket, GameType, TicketStatus } from '../entities/Ticket';
import { PaginatedResult } from '../value-objects/Pagination';

export type TicketFilters = {
  status?: TicketStatus;
  gameType?: GameType;
  q?: string;
  page?: number;
  pageSize?: number;
};

export type CreateTicketInput = {
  title: string;
  gameType: GameType;
  gameDate: string;
  status: TicketStatus;
  gameNumber?: string;
  amount?: number;
  place?: string;
  notes?: string;
};

export type UpdateTicketInput = Partial<CreateTicketInput>;

export interface TicketRepository {
  list(filters: TicketFilters): Promise<PaginatedResult<Ticket>>;
  getById(id: string): Promise<Ticket>;
  create(input: CreateTicketInput): Promise<Ticket>;
  update(id: string, input: UpdateTicketInput): Promise<Ticket>;
  delete(id: string): Promise<void>;
}
