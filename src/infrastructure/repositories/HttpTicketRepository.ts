import { TicketRepository, TicketFilters, CreateTicketInput, UpdateTicketInput } from '@/domain/repositories/TicketRepository';
import { Ticket } from '@/domain/entities/Ticket';
import { PaginatedResult } from '@/domain/value-objects/Pagination';
import { httpClient } from '../http/httpClient';
import { ApiSuccess } from '../http/types';

type RawTicket = Omit<Ticket, 'gameDate' | 'createdAt' | 'updatedAt' | 'amount'> & {
  gameDate: string;
  createdAt: string;
  updatedAt: string;
  amount?: string | number | null;
};

function reviveTicket(raw: RawTicket): Ticket {
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

export class HttpTicketRepository implements TicketRepository {
  async list(filters: TicketFilters): Promise<PaginatedResult<Ticket>> {
    const { data } = await httpClient.get<ApiSuccess<RawTicket[]>>('/tickets', {
      params: stripUndefined(filters),
    });
    return { items: data.data.map(reviveTicket), meta: data.meta! };
  }

  async getById(id: string): Promise<Ticket> {
    const { data } = await httpClient.get<ApiSuccess<RawTicket>>(`/tickets/${id}`);
    return reviveTicket(data.data);
  }

  async create(input: CreateTicketInput): Promise<Ticket> {
    const { data } = await httpClient.post<ApiSuccess<RawTicket>>('/tickets', input);
    return reviveTicket(data.data);
  }

  async update(id: string, input: UpdateTicketInput): Promise<Ticket> {
    const { data } = await httpClient.put<ApiSuccess<RawTicket>>(`/tickets/${id}`, input);
    return reviveTicket(data.data);
  }

  async delete(id: string): Promise<void> {
    await httpClient.delete(`/tickets/${id}`);
  }
}
