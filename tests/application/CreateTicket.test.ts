import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTicket } from '@/application/usecases/tickets/CreateTicket';
import { TicketRepository, CreateTicketInput } from '@/domain/repositories/TicketRepository';
import { Ticket } from '@/domain/entities/Ticket';

const mockTicket: Ticket = {
  id: 'uuid-1',
  userId: 'user-1',
  title: 'Lotería Medellín',
  gameType: 'Lotería',
  gameDate: new Date('2026-06-15T20:00:00Z'),
  status: 'Pendiente',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockRepo: TicketRepository = {
  list: vi.fn(),
  getById: vi.fn(),
  create: vi.fn().mockResolvedValue(mockTicket),
  update: vi.fn(),
  delete: vi.fn(),
};

describe('CreateTicket', () => {
  beforeEach(() => vi.clearAllMocks());

  it('calls repo.create with input', async () => {
    const useCase = new CreateTicket(mockRepo);
    const input: CreateTicketInput = {
      title: 'Lotería Medellín',
      gameType: 'Lotería',
      gameDate: '2026-06-15T20:00:00.000Z',
      status: 'Pendiente',
    };
    await useCase.execute(input);
    expect(mockRepo.create).toHaveBeenCalledWith(input);
  });

  it('returns ticket from repo', async () => {
    const useCase = new CreateTicket(mockRepo);
    const result = await useCase.execute({
      title: 'Lotería Medellín',
      gameType: 'Lotería',
      gameDate: '2026-06-15T20:00:00.000Z',
      status: 'Pendiente',
    });
    expect(result).toEqual(mockTicket);
  });
});
