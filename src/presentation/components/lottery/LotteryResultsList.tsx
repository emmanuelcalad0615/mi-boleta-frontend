'use client';

import { motion } from 'framer-motion';
import { LotteryResultCard, lotteryCardItem } from './LotteryResultCard';
import { EmptyState } from '@/presentation/components/ui/EmptyState';
import type { LotteryResult } from '@/domain/entities/LotteryResult';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

type Props = {
  results: LotteryResult[];
  isLoading: boolean;
  error: Error | null;
};

export function LotteryResultsList({ results, isLoading, error }: Readonly<Props>) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-36 animate-pulse rounded-xl border border-white/10 bg-[#1A1A1A]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        variants={lotteryCardItem}
        initial="hidden"
        animate="show"
        className="rounded-xl border border-[#FF6B6B]/20 bg-[#FF6B6B]/5 p-5 text-sm text-[#FF6B6B]"
      >
        {error.message}
      </motion.div>
    );
  }

  if (results.length === 0) {
    return (
      <EmptyState
        title="Sin resultados"
        description="No se encontraron resultados publicados en datos.gov.co."
      />
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {results.map((r) => (
        <LotteryResultCard key={r.id} result={r} />
      ))}
    </motion.div>
  );
}
