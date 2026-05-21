'use client';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Trophy, Calendar, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import type { LotteryResult } from '@/domain/entities/LotteryResult';

export const lotteryCardItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

type Props = { result: LotteryResult };

export function LotteryResultCard({ result }: Readonly<Props>) {
  return (
    <motion.div
      variants={lotteryCardItem}
      className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4 flex flex-col gap-3 hover:border-[#00D4FF]/30 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00D4FF]/10 text-[#00D4FF]">
            <Trophy className="h-4 w-4" />
          </div>
          <p className="truncate text-sm font-medium text-[#F0F0F0]">{result.loteria}</p>
        </div>
        {result.tipoDePremio && (
          <span className="shrink-0 rounded-full bg-[#FFD166]/20 px-2.5 py-0.5 text-xs font-medium text-[#FFD166]">
            {result.tipoDePremio}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-xs text-[#888888]">
        <Calendar className="h-3.5 w-3.5" />
        <span>
          {format(result.fecha, "d 'de' MMMM, yyyy", { locale: es })}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-[#888888]">Número ganador</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Hash className="h-3.5 w-3.5 text-[#00D4FF]" />
            <span className="font-display text-xl font-bold text-[#00D4FF]">{result.numero}</span>
          </div>
        </div>
        {result.serie && (
          <div className="flex flex-col border-l border-white/10 pl-3">
            <span className="text-xs text-[#888888]">Serie</span>
            <span className="font-mono text-sm font-medium text-[#F0F0F0] mt-0.5">{result.serie}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
