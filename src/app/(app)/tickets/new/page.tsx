'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { TicketForm } from '@/presentation/components/forms/TicketForm';
import { TicketFormValues } from '@/presentation/lib/validation/ticket.schemas';
import { useCreateTicketMutation } from '@/presentation/hooks/useTickets';

export default function NewTicketPage() {
  const router = useRouter();
  const mutation = useCreateTicketMutation();
  const [error, setError] = useState('');

  const handleSubmit = async (values: TicketFormValues) => {
    setError('');
    try {
      await mutation.mutateAsync({
        title: values.title,
        gameType: values.gameType,
        gameDate: new Date(values.gameDate).toISOString(),
        status: values.status,
        gameNumber: values.gameNumber || undefined,
        amount: values.amount ? Number(values.amount) : undefined,
        place: values.place || undefined,
        notes: values.notes || undefined,
      });
      toast.success('Boleta registrada');
      router.push('/tickets');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al crear la boleta';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/tickets" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#888888] hover:text-[#00D4FF] mb-4 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Link>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#F0F0F0]">Nueva boleta</h1>
        <p className="mt-1 text-sm text-[#888888]">Registra una rifa, sorteo, lotería o juego ocasional.</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 sm:p-8">
        <TicketForm mode="create" onSubmit={handleSubmit} error={error} />
      </div>
    </div>
  );
}
