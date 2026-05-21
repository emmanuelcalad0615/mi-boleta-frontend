import { useMutation } from '@tanstack/react-query';
import type { Ticket } from '@/domain/entities/Ticket';
import { lotteryUseCases } from '@/infrastructure/di/container';

export function useCheckTicketMutation() {
  return useMutation({
    mutationFn: (ticket: Ticket) =>
      lotteryUseCases.checkTicketAgainstResults.execute({ ticket }),
  });
}
