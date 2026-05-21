import Link from 'next/link';
import { Calendar, CalendarX } from 'lucide-react';
import { motion } from 'framer-motion';
import { Ticket } from '@/domain/entities/Ticket';
import { Badge } from '../ui/Badge';
import { formatDate } from '@/presentation/lib/formatters';

type UpcomingDrawsProps = { tickets: Ticket[] };

export function UpcomingDraws({ tickets }: Readonly<UpcomingDrawsProps>) {
  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-[#888888]">
          <CalendarX className="h-5 w-5" />
        </div>
        <p className="text-sm text-[#888888]">No hay sorteos próximos</p>
      </div>
    );
  }

  return (
    <motion.ul
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      initial="hidden"
      animate="show"
      className="space-y-1"
    >
      {tickets.map((t) => (
        <motion.li
          key={t.id}
          variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } }}
        >
          <Link
            href={`/tickets/${t.id}`}
            className="group flex items-center justify-between gap-3 rounded-lg p-3 transition-colors hover:bg-[#00D4FF]/5"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#00D4FF]/10 text-[#00D4FF]">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#F0F0F0] group-hover:text-[#00D4FF]">
                  {t.title}
                </p>
                <p className="text-xs text-[#888888]">{formatDate(t.gameDate)}</p>
              </div>
            </div>
            <Badge status={t.status} />
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}
