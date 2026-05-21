import type { LotteryResultRepository } from '@/domain/repositories/LotteryResultRepository';
import type { ListLatestLotteryResultsInput, ListLatestLotteryResultsOutput } from '@/application/dtos/lotteryResults.dto';

export class ListLatestLotteryResults {
  constructor(private readonly repo: LotteryResultRepository) {}

  execute(input: ListLatestLotteryResultsInput = {}): Promise<ListLatestLotteryResultsOutput> {
    return this.repo.listLatest({
      page: input.page ?? 1,
      pageSize: input.pageSize ?? 12,
      loteria: input.loteria,
    });
  }
}
