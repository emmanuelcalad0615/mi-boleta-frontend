export type LotteryResult = {
  id: string;
  loteria: string;
  fecha: Date;
  numero: string;
  serie: string | null;
  numeroDeSorteo: string | null;
  tipoDePremio: string | null;
  raw: Record<string, unknown>;
};

export type LotteryMatchResult =
  | { matched: true; result: LotteryResult }
  | { matched: false; reason: 'no-results-for-date' | 'number-not-winner' };
