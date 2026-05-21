'use client';

import { Search } from 'lucide-react';
import { GAME_TYPES, TICKET_STATUSES, GameType, TicketStatus } from '@/domain/entities/Ticket';
import { Select } from '../ui/Select';
import { cn } from '@/presentation/lib/cn';

type TicketFiltersProps = {
  q: string;
  status: string;
  gameType: string;
  onQChange: (v: string) => void;
  onStatusChange: (v: TicketStatus | '') => void;
  onGameTypeChange: (v: GameType | '') => void;
};

export function TicketFilters({
  q,
  status,
  gameType,
  onQChange,
  onStatusChange,
  onGameTypeChange,
}: Readonly<TicketFiltersProps>) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1 sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888888]" />
        <input
          type="search"
          placeholder="Buscar por nombre o número..."
          value={q}
          onChange={(e) => onQChange(e.target.value)}
          className={cn(
            'block w-full rounded-lg bg-[#1A1A1A] border border-white/10 py-2.5 pl-10 pr-3 text-sm text-[#F0F0F0] outline-none',
            'placeholder:text-[#888888] transition-colors',
            'focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20',
          )}
        />
      </div>
      <Select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as TicketStatus | '')}
        className="sm:w-44"
        aria-label="Filtrar por estado"
      >
        <option value="">Todos los estados</option>
        {TICKET_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </Select>
      <Select
        value={gameType}
        onChange={(e) => onGameTypeChange(e.target.value as GameType | '')}
        className="sm:w-52"
        aria-label="Filtrar por tipo"
      >
        <option value="">Todos los tipos</option>
        {GAME_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
      </Select>
    </div>
  );
}
