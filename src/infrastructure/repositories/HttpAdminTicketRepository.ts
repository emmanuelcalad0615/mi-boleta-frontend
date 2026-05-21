import { AdminTicketRepository, AdminTicketFilters } from '@/domain/repositories/AdminTicketRepository';
import { TicketWithOwner } from '@/domain/entities/Ticket';
import { PaginatedResult } from '@/domain/value-objects/Pagination';
import { httpClient } from '../http/httpClient';
import { ApiSuccess } from '../http/types';

type RawTicketWithOwner = Omit<TicketWithOwner, 'gameDate' | 'createdAt' | 'updatedAt' | 'amount'> & {
  gameDate: string;
  createdAt: string;
  updatedAt: string;
  amount?: string | number | null;
};

function reviveTicket(raw: RawTicketWithOwner): TicketWithOwner {
  return {
    ...raw,
    gameDate: new Date(raw.gameDate),
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
    amount: raw.amount != null ? Number(raw.amount) : null,
  };
}

function stripUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as Partial<T>;
}

export class HttpAdminTicketRepository implements AdminTicketRepository {
  async listAll(filters: AdminTicketFilters): Promise<PaginatedResult<TicketWithOwner>> {
    const { data } = await httpClient.get<ApiSuccess<RawTicketWithOwner[]>>('/admin/tickets', {
      params: stripUndefined(filters),
    });
    return { items: data.data.map(reviveTicket), meta: data.meta! };
  }
}
