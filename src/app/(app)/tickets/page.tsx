'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { useTicketsQuery, useDeleteTicketMutation } from '@/presentation/hooks/useTickets';
import { useDebouncedValue } from '@/presentation/hooks/useDebouncedValue';
import { TicketFilters } from '@/presentation/components/tickets/TicketFilters';
import { TicketsList } from '@/presentation/components/tickets/TicketsList';
import { Pagination } from '@/presentation/components/tickets/Pagination';
import { Modal } from '@/presentation/components/ui/Modal';
import { Button } from '@/presentation/components/ui/Button';
import { Spinner } from '@/presentation/components/ui/Spinner';
import { Alert } from '@/presentation/components/ui/Alert';
import { GameType, TicketStatus } from '@/domain/entities/Ticket';

export default function TicketsPage() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<TicketStatus | ''>('');
  const [gameType, setGameType] = useState<GameType | ''>('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const debouncedQ = useDebouncedValue(q, 300);
  const deleteMutation = useDeleteTicketMutation();

  const { data, isLoading, isError, error } = useTicketsQuery({
    q: debouncedQ || undefined,
    status: status || undefined,
    gameType: gameType || undefined,
    page,
    pageSize: 12,
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      setDeleteId(null);
      toast.success('Boleta eliminada');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al eliminar');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#F0F0F0]">Mis Boletas</h1>
          <p className="mt-1 text-sm text-[#888888]">Todas tus rifas, loterías y sorteos en un solo lugar.</p>
        </div>
        <Link href="/tickets/new">
          <Button variant="accent">
            <Plus className="h-4 w-4" />
            Nueva
          </Button>
        </Link>
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
      {isError && <Alert message={error instanceof Error ? error.message : 'Error al cargar boletas'} />}

      {data && (
        <>
          <TicketsList tickets={data.items} onDelete={setDeleteId} />
          <Pagination meta={data.meta} onPageChange={setPage} />
        </>
      )}

      <Modal
        open={!!deleteId}
        title="Eliminar boleta"
        description="Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        loading={deleteMutation.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
