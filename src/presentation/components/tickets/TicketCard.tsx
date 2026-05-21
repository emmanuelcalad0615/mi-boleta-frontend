'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Pencil, Trash2, Calendar, Ticket as TicketIcon, MapPin } from 'lucide-react';
import { Ticket, TicketStatus } from '@/domain/entities/Ticket';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatDate, formatCurrency } from '@/presentation/lib/formatters';
import { cn } from '@/presentation/lib/cn';

type TicketCardProps = {
  ticket: Ticket;
  onDelete: (id: string) => void;
};

const wonGlow: Record<TicketStatus, string> = {
  Pendiente: '',
  Ganado: 'border-[#00D4FF]/40 shadow-[0_0_16px_#00D4FF22]',
  Perdido: '',
};

export function TicketCard({ ticket, onDelete }: Readonly<TicketCardProps>) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
      className={cn(
        'group rounded-xl border bg-[#1A1A1A] p-5 transition-all',
        'hover:border-white/20',
        wonGlow[ticket.status] || 'border-white/10',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display font-bold text-[#F0F0F0] line-clamp-2 leading-tight">
          {ticket.title}
        </h3>
        <Badge status={ticket.status} />
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-[#888888]">
          <TicketIcon className="h-3.5 w-3.5" />
          <span>{ticket.gameType}</span>
        </div>
        <div className="flex items-center gap-2 text-[#888888]">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(ticket.gameDate)}</span>
        </div>
        {ticket.gameNumber && (
          <div>
            <span className="inline-block rounded-md bg-[#00D4FF]/10 px-2 py-0.5 font-mono text-xs font-semibold text-[#00D4FF]">
              #{ticket.gameNumber}
            </span>
          </div>
        )}
        {ticket.place && (
          <div className="flex items-center gap-2 text-[#888888]">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{ticket.place}</span>
          </div>
        )}
        {ticket.amount != null && (
          <p className="pt-1 font-display text-lg font-bold text-[#F0F0F0]">
            {formatCurrency(ticket.amount)}
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center gap-1.5">
        <Link href={`/tickets/${ticket.id}`} className="flex-1">
          <Button variant="secondary" size="sm" className="w-full">
            <Eye className="h-3.5 w-3.5" />
            Ver
          </Button>
        </Link>
        <Link href={`/tickets/${ticket.id}/edit`}>
          <Button variant="ghost" size="sm" aria-label="Editar">
            <Pencil className="h-3.5 w-3.5" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(ticket.id)}
          aria-label="Eliminar"
          className="text-[#FF6B6B] hover:bg-[#FF6B6B]/10"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.div>
  );
}
