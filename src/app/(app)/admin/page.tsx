'use client';

import { useState } from 'react';
import { Shield } from 'lucide-react';
import { useAdminTicketsQuery } from '@/presentation/hooks/useAdminTickets';
import { useDebouncedValue } from '@/presentation/hooks/useDebouncedValue';
import { TicketFilters } from '@/presentation/components/tickets/TicketFilters';
import { Pagination } from '@/presentation/components/tickets/Pagination';
import { Badge } from '@/presentation/components/ui/Badge';
import { Spinner } from '@/presentation/components/ui/Spinner';
import { Alert } from '@/presentation/components/ui/Alert';
import { formatDate } from '@/presentation/lib/formatters';
import { GameType, TicketStatus } from '@/domain/entities/Ticket';

export default function AdminPage() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<TicketStatus | ''>('');
  const [gameType, setGameType] = useState<GameType | ''>('');
  const [page, setPage] = useState(1);

  const debouncedQ = useDebouncedValue(q, 300);

  const { data, isLoading, isError, error } = useAdminTicketsQuery({
    q: debouncedQ || undefined,
    status: status || undefined,
    gameType: gameType || undefined,
    page,
    pageSize: 20,
  });

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-[#00D4FF]/20 bg-[#1A1A1A] p-6 shadow-[0_0_24px_rgba(0,212,255,0.08)]">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#00D4FF] opacity-10 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF]">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-[#F0F0F0]">Panel de administrador</h1>
            <p className="text-sm text-[#888888]">Todos los tickets del sistema</p>
          </div>
        </div>
      </div>

      <TicketFilters
        q={q}
        status={status}
        gameType={gameType}
        onQChange={(v) => { setQ(v); setPage(1); }}
        onStatusChange={(v) => { setStatus(v); setPage(1); }}
        onGameTypeChange={(v) => { setGameType(v); setPage(1); }}
      />

      {isLoading && <div className="flex justify-center py-16"><Spinner size="lg" /></div>}
      {isError && <Alert message={error instanceof Error ? error.message : 'Error al cargar'} />}

      {data && (
        <>
          <p className="text-sm text-[#888888]">
            <span className="font-semibold text-[#F0F0F0]">{data.meta.total}</span> resultado(s)
          </p>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10 bg-[#1A1A1A]">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-[#242424]">
                <tr>
                  {['Dueño', 'Título', 'Tipo', 'Número', 'Fecha', 'Estado'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-medium text-[#888888] uppercase tracking-wider text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.items.map((t) => (
                  <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#F0F0F0]">{t.owner.name}</p>
                      <p className="text-xs text-[#888888]">{t.owner.email}</p>
                    </td>
                    <td className="px-4 py-3 font-medium text-[#F0F0F0] max-w-xs truncate">{t.title}</td>
                    <td className="px-4 py-3 text-[#888888]">{t.gameType}</td>
                    <td className="px-4 py-3 font-mono text-[#00D4FF]">{t.gameNumber ?? '—'}</td>
                    <td className="px-4 py-3 text-[#888888]">{formatDate(t.gameDate)}</td>
                    <td className="px-4 py-3"><Badge status={t.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {data.items.map((t) => (
              <div key={t.id} className="rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-[#F0F0F0] truncate">{t.title}</p>
                    <p className="text-xs text-[#888888] truncate">{t.owner.name} · {t.owner.email}</p>
                  </div>
                  <Badge status={t.status} />
                </div>
                <div className="mt-2 text-sm text-[#888888] space-y-1">
                  <p>{t.gameType} · {formatDate(t.gameDate)}</p>
                  {t.gameNumber && <p>Número: <span className="font-mono text-[#00D4FF]">{t.gameNumber}</span></p>}
                </div>
              </div>
            ))}
          </div>

          <Pagination meta={data.meta} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
