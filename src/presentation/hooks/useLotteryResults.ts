import { useQuery } from '@tanstack/react-query';
import { lotteryUseCases } from '@/infrastructure/di/container';

export const LOTTERY_PAGE_SIZE = 12;

export function useLatestLotteryResultsQuery(page = 1, loteria?: string) {
  return useQuery({
    queryKey: ['lottery', 'latest', page, loteria],
    queryFn: () =>
      lotteryUseCases.listLatestLotteryResults.execute({
        page,
        pageSize: LOTTERY_PAGE_SIZE,
        loteria,
      }),
    staleTime: 5 * 60_000,
    retry: 1,
    placeholderData: (prev) => prev,
  });
}
