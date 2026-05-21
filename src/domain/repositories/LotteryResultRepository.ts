import type { LotteryResult } from '../entities/LotteryResult';
import type { PaginatedResult } from '../value-objects/Pagination';

export interface LotteryResultRepository {
  listLatest(input: { page?: number; pageSize?: number; loteria?: string }): Promise<PaginatedResult<LotteryResult>>;
  findByDateAndNumber(input: {
    fecha: Date;
    numero: string;
    loteria?: string;
  }): Promise<LotteryResult | null>;
}
