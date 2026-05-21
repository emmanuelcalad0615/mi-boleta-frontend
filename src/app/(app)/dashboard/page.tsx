'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useTicketsQuery } from '@/presentation/hooks/useTickets';
import { useAuth } from '@/presentation/hooks/useAuth';
import { StatCard } from '@/presentation/components/dashboard/StatCard';
import { UpcomingDraws } from '@/presentation/components/dashboard/UpcomingDraws';
import { PendingTickets } from '@/presentation/components/dashboard/PendingTickets';
import { Spinner } from '@/presentation/components/ui/Spinner';
import { Alert } from '@/presentation/components/ui/Alert';
import { Button } from '@/presentation/components/ui/Button';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, isError, error } = useTicketsQuery({ pageSize: 100 });

  const stats = useMemo(() => {
    if (!data) return null;
    const tickets = data.items;
    const now = new Date();
    const upcoming = tickets
      .filter((t) => t.gameDate > now && t.status === 'Pendiente')
      .sort((a, b) => a.gameDate.getTime() - b.gameDate.getTime())
      .slice(0, 5);
    const pending = tickets.filter((t) => t.status === 'Pendiente').slice(0, 5);
    const won = tickets.filter((t) => t.status === 'Ganado').length;
    return { total: data.meta.total, upcoming, pending, won };
  }, [data]);

  if (isLoading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  if (isError) {
    return <Alert message={error instanceof Error ? error.message : 'Error al cargar'} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-[#00D4FF]/20 bg-[#1A1A1A] p-6 sm:p-8 shadow-[0_0_40px_rgba(0,212,255,0.08)]">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#00D4FF] opacity-10 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-[#FFD166] opacity-5 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#00D4FF]">
              ¡Hola, {user?.name?.split(' ')[0] ?? 'jugador'}!
            </p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F0F0F0]">
              Tus boletas, organizadas.
            </h1>
            <p className="mt-2 text-sm text-[#888888]">
              Nunca más vas a olvidar si te ganaste un sorteo.
            </p>
          </div>

          <Link href="/tickets/new">
            <Button variant="accent" size="lg">
              <Plus className="h-4 w-4" />
              Nueva boleta
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total registradas" value={stats?.total ?? 0} icon="ticket" variant="accent" />
        <StatCard label="Pendientes" value={stats?.pending.length ?? 0} icon="clock" variant="warning" />
        <StatCard label="Próximos sorteos" value={stats?.upcoming.length ?? 0} icon="calendar" variant="info" />
        <StatCard label="Ganados" value={stats?.won ?? 0} icon="trophy" variant="success" />
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#00D4FF]/10 text-[#00D4FF]">
              <Calendar className="h-4 w-4" />
            </span>
            <h2 className="font-display font-bold text-[#F0F0F0]">Próximos sorteos</h2>
          </div>
          <UpcomingDraws tickets={stats?.upcoming ?? []} />
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#1A1A1A] p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FFD166]/10 text-[#FFD166]">
              <Clock className="h-4 w-4" />
            </span>
            <h2 className="font-display font-bold text-[#F0F0F0]">Boletas pendientes</h2>
          </div>
          <PendingTickets tickets={stats?.pending ?? []} />
        </section>
      </div>

      <div className="flex justify-center">
        <Link href="/tickets">
          <Button variant="secondary" size="lg">
            Ver todas las boletas
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
