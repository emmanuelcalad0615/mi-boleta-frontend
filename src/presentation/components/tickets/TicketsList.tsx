'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Ticket } from '@/domain/entities/Ticket';
import { TicketCard } from './TicketCard';
import { EmptyState } from '../ui/EmptyState';
import { Button } from '../ui/Button';

type TicketsListProps = {
  tickets: Ticket[];
  onDelete: (id: string) => void;
};

export function TicketsList({ tickets, onDelete }: Readonly<TicketsListProps>) {
  if (tickets.length === 0) {
    return (
      <EmptyState
        title="Aún no tienes boletas"
        description="Registra tu primera boleta o sorteo. Nunca más vas a olvidar si te ganaste algo."
        action={
          <Link href="/tickets/new">
            <Button variant="accent" size="lg">
              <Plus className="h-4 w-4" />
              Registrar primera boleta
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} onDelete={onDelete} />
      ))}
    </motion.div>
  );
}
