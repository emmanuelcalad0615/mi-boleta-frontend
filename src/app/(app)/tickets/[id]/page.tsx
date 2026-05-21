'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useTicketQuery, useDeleteTicketMutation } from '@/presentation/hooks/useTickets';
import { Badge } from '@/presentation/components/ui/Badge';
import { Button } from '@/presentation/components/ui/Button';
import { Spinner } from '@/presentation/components/ui/Spinner';
import { Modal } from '@/presentation/components/ui/Modal';
import { formatDate, formatCurrency } from '@/presentation/lib/formatters';
import { NotFoundError } from '@/domain/errors/NotFoundError';
import { CheckTicketButton } from '@/presentation/components/lottery/CheckTicketButton';

type FieldProps = { label: string; value: React.ReactNode; mono?: boolean };

function Field({ label, value, mono }: Readonly<FieldProps>) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-[#888888]">{label}</dt>
      <dd className={`mt-1.5 text-sm text-[#F0F0F0] ${mono ? 'font-mono' : ''}`}>{value}</dd>
    </div>
  );
}

export default function TicketDetailPage({ params }: { readonly params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: ticket, isLoading, error } = useTicketQuery(id);
  const deleteMutation = useDeleteTicketMutation();
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);

  if (isLoading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  if (error instanceof NotFoundError || !ticket) {
    notFound();
  }

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Boleta eliminada');
      router.replace('/tickets');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al eliminar');
    }
  };

  const isWon = ticket.status === 'Ganado';

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/tickets" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#888888] hover:text-[#00D4FF] mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Volver a mis boletas
      </Link>

      {/* Hero */}
      <div className={`relative overflow-hidden rounded-2xl border bg-[#1A1A1A] p-6 sm:p-8 ${
        isWon ? 'border-[#00D4FF]/30 shadow-[0_0_24px_rgba(0,212,255,0.15)]' : 'border-white/10'
      }`}>
        {isWon && <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#00D4FF] opacity-10 blur-3xl" />}

        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-[#00D4FF]">{ticket.gameType}</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F0F0F0] break-words">
              {ticket.title}
            </h1>
          </div>
          <Badge status={ticket.status} />
        </div>
      </div>

      {/* Details */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Fecha del sorteo" value={formatDate(ticket.gameDate)} />
          {ticket.gameNumber && <Field label="Número jugado" value={`#${ticket.gameNumber}`} mono />}
          {ticket.place && <Field label="Lugar de compra" value={ticket.place} />}
          {ticket.amount != null && (
            <Field label="Valor apostado" value={<span className="font-display text-base font-bold text-[#F0F0F0]">{formatCurrency(ticket.amount)}</span>} />
          )}
        </dl>

        {ticket.notes && (
          <div className="mt-6 rounded-xl bg-[#FFD166]/5 border border-[#FFD166]/20 p-4">
            <dt className="text-xs font-medium uppercase tracking-wider text-[#FFD166]">📝 Notas</dt>
            <dd className="mt-1.5 text-sm text-[#F0F0F0]/90 whitespace-pre-line">{ticket.notes}</dd>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2 pt-5 border-t border-white/10">
          <Link href={`/tickets/${id}/edit`}>
            <Button variant="secondary">
              <Pencil className="h-4 w-4" />
              Editar
            </Button>
          </Link>
          <CheckTicketButton ticket={ticket} />
          <Button variant="danger" onClick={() => setShowDelete(true)}>
            <Trash2 className="h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </div>

      <Modal
        open={showDelete}
        title="Eliminar boleta"
        description="Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        loading={deleteMutation.isPending}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
}
