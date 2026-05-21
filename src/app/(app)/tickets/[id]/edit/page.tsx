'use client';

import { use, useState } from 'react';
import { useRouter, notFound } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { useTicketQuery, useUpdateTicketMutation } from '@/presentation/hooks/useTickets';
import { TicketForm } from '@/presentation/components/forms/TicketForm';
import { TicketFormValues } from '@/presentation/lib/validation/ticket.schemas';
import { Spinner } from '@/presentation/components/ui/Spinner';
import { NotFoundError } from '@/domain/errors/NotFoundError';

export default function EditTicketPage({ params }: { readonly params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: ticket, isLoading, error } = useTicketQuery(id);
  const mutation = useUpdateTicketMutation();
  const router = useRouter();
  const [formError, setFormError] = useState('');

  if (isLoading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  if (error instanceof NotFoundError || !ticket) {
    notFound();
  }

  const handleSubmit = async (values: TicketFormValues) => {
    setFormError('');
    try {
      await mutation.mutateAsync({
        id,
        input: {
          title: values.title,
          gameType: values.gameType,
          gameDate: new Date(values.gameDate).toISOString(),
          status: values.status,
          gameNumber: values.gameNumber || undefined,
          amount: values.amount ? Number(values.amount) : undefined,
          place: values.place || undefined,
          notes: values.notes || undefined,
        },
      });
      toast.success('Cambios guardados');
      router.push(`/tickets/${id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al actualizar';
      setFormError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link href={`/tickets/${id}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-[#888888] hover:text-[#00D4FF] mb-4 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Link>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#F0F0F0]">Editar boleta</h1>
        <p className="mt-1 text-sm text-[#888888]">{ticket.title}</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6 sm:p-8">
        <TicketForm mode="edit" initialValues={ticket} onSubmit={handleSubmit} error={formError} />
      </div>
    </div>
  );
}
