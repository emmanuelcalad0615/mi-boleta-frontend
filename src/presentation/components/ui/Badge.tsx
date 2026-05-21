import { cn } from '@/presentation/lib/cn';
import { TicketStatus } from '@/domain/entities/Ticket';

const statusClasses: Record<TicketStatus, { wrap: string; dot: string }> = {
  Pendiente: { wrap: 'bg-[#FFD166]/12 text-[#FFD166]', dot: 'bg-[#FFD166]' },
  Ganado: { wrap: 'bg-[#00D4FF]/12 text-[#00D4FF]', dot: 'bg-[#00D4FF]' },
  Perdido: { wrap: 'bg-[#FF6B6B]/12 text-[#FF6B6B]', dot: 'bg-[#FF6B6B]' },
};

type BadgeProps = { status: TicketStatus; className?: string };

export function Badge({ status, className }: Readonly<BadgeProps>) {
  const s = statusClasses[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        s.wrap,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', s.dot, status === 'Pendiente' && 'animate-pulse')} />
      {status}
    </span>
  );
}
