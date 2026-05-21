import type { LotteryResultRepository } from '@/domain/repositories/LotteryResultRepository';
import type { CheckTicketInput, CheckTicketOutput } from '@/application/dtos/lotteryResults.dto';

function normalizeNumber(value: string): string {
  return value.trim().replace(/[-\s]/g, '').replace(/^0+/, '') || '0';
}

export class CheckTicketAgainstResults {
  constructor(private readonly repo: LotteryResultRepository) {}

  async execute({ ticket }: CheckTicketInput): Promise<CheckTicketOutput> {
    if (!ticket.gameNumber) {
      return { matched: false, reason: 'number-not-winner' };
    }

    const result = await this.repo.findByDateAndNumber({
      fecha: ticket.gameDate,
      numero: ticket.gameNumber,
    });

    if (result === null) {
      const page = await this.repo.listLatest({ page: 1, pageSize: 1 });
      if (page.meta.total === 0) {
        return { matched: false, reason: 'no-results-for-date' };
      }

      const hasDate = page.items.some(
        (r: { fecha: Date }) =>
          r.fecha.toDateString() === ticket.gameDate.toDateString(),
      );

      return {
        matched: false,
        reason: hasDate ? 'number-not-winner' : 'no-results-for-date',
      };
    }

    const normalizedTicket = normalizeNumber(ticket.gameNumber);
    const normalizedResult = normalizeNumber(result.numero);

    if (normalizedTicket !== normalizedResult) {
      return { matched: false, reason: 'number-not-winner' };
    }

    return { matched: true, result };
  }
}
