'use client';

import { useState } from 'react';
import { Trophy } from 'lucide-react';
import { useLatestLotteryResultsQuery } from '@/presentation/hooks/useLotteryResults';
import { LotteryResultsList } from '@/presentation/components/lottery/LotteryResultsList';
import { Pagination } from '@/presentation/components/tickets/Pagination';

const LOTERIAS = [
  'Todas',
  'Lotería de Bogotá',
  'Lotería de Medellín',
  'Lotería de la Cruz Roja',
  'Lotería del Quindío',
  'Lotería de Boyacá',
];

export default function ResultadosPage() {
  const [page, setPage] = useState(1);
  const [loteria, setLoteria] = useState<string | undefined>(undefined);
  const { data, isLoading, error } = useLatestLotteryResultsQuery(page, loteria);

  function handleLoteria(value: string) {
    setLoteria(value || undefined);
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00D4FF]/10 text-[#00D4FF]">
              <Trophy className="h-4.5 w-4.5" />
            </div>
            <h1 className="font-display text-2xl font-bold text-[#F0F0F0]">Resultados</h1>
          </div>
          <p className="mt-1 text-sm text-[#888888]">
            Sorteos publicados en datos.gov.co
          </p>
        </div>

        <select
          value={loteria ?? ''}
          onChange={(e) => handleLoteria(e.target.value)}
          className="rounded-lg border border-white/10 bg-[#1A1A1A] px-3 py-2 text-sm text-[#F0F0F0] focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/20"
          aria-label="Filtrar por lotería"
        >
          {LOTERIAS.map((l) => (
            <option key={l} value={l === 'Todas' ? '' : l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <LotteryResultsList
        results={data?.items ?? []}
        isLoading={isLoading}
        error={error}
      />

      {data?.meta && (
        <Pagination meta={data.meta} onPageChange={setPage} />
      )}
    </div>
  );
}
