import type { LotteryMatchResult, LotteryResult } from '@/domain/entities/LotteryResult';
import type { Ticket } from '@/domain/entities/Ticket';
import type { PaginatedResult } from '@/domain/value-objects/Pagination';

export type ListLatestLotteryResultsInput = {
  page?: number;
  pageSize?: number;
  loteria?: string;
};

export type ListLatestLotteryResultsOutput = PaginatedResult<LotteryResult>;

export type CheckTicketInput = {
  ticket: Ticket;
};

export type CheckTicketOutput = LotteryMatchResult;
