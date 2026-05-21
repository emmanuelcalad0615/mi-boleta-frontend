'use client';

import toast from 'react-hot-toast';
import { Search } from 'lucide-react';
import { Button } from '@/presentation/components/ui/Button';
import { useCheckTicketMutation } from '@/presentation/hooks/useCheckTicket';
import type { Ticket } from '@/domain/entities/Ticket';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type Props = { ticket: Ticket };

export function CheckTicketButton({ ticket }: Readonly<Props>) {
  const mutation = useCheckTicketMutation();

  if (!ticket.gameNumber) return null;

  const handleCheck = async () => {
    try {
      const result = await mutation.mutateAsync(ticket);

      if (result.matched) {
        const fecha = format(result.result.fecha, "d 'de' MMMM yyyy", { locale: es });
        toast.success(`¡Coincide! Número ganador del ${fecha} en ${result.result.loteria}.`, {
          duration: 6000,
        });
        return;
      }

      if (result.reason === 'no-results-for-date') {
        toast(`Aún no hay resultados publicados para esa fecha en datos.gov.co.`, {
          icon: '📅',
          duration: 5000,
        });
        return;
      }

      toast(`Este número no aparece como ganador en esa fecha.`, {
        icon: '🎫',
        duration: 5000,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al verificar resultado.');
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleCheck}
      loading={mutation.isPending}
      aria-label="Verificar número contra resultados oficiales"
    >
      <Search className="h-4 w-4" />
      Verificar resultado
    </Button>
  );
}
