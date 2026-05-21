import { motion } from 'framer-motion';
import { Ticket, Clock, Calendar, Trophy } from 'lucide-react';
import { cn } from '@/presentation/lib/cn';

type StatVariant = 'accent' | 'warning' | 'info' | 'success';
type StatIcon = 'ticket' | 'clock' | 'calendar' | 'trophy';

const iconMap: Record<StatIcon, React.ComponentType<{ className?: string }>> = {
  ticket: Ticket,
  clock: Clock,
  calendar: Calendar,
  trophy: Trophy,
};

const variants: Record<StatVariant, { ring: string; bg: string; text: string }> = {
  accent:  { ring: 'border-[#00D4FF]/20', bg: 'bg-[#00D4FF]/10', text: 'text-[#00D4FF]' },
  warning: { ring: 'border-[#FFD166]/20', bg: 'bg-[#FFD166]/10', text: 'text-[#FFD166]' },
  info:    { ring: 'border-white/10',     bg: 'bg-white/5',      text: 'text-[#F0F0F0]' },
  success: { ring: 'border-[#00D4FF]/20', bg: 'bg-[#00D4FF]/10', text: 'text-[#00D4FF]' },
};

type StatCardProps = {
  label: string;
  value: number;
  icon: StatIcon;
  variant?: StatVariant;
};

export function StatCard({ label, value, icon, variant = 'accent' }: Readonly<StatCardProps>) {
  const v = variants[variant];
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group rounded-2xl border bg-[#1A1A1A] p-5 transition-all hover:border-white/20 hover:shadow-[0_0_24px_rgba(0,212,255,0.08)]',
        v.ring,
      )}
    >
      <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', v.bg, v.text)}>
        <Icon className="h-5 w-5" />
      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-[#888888]">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold tabular-nums text-[#F0F0F0]">{value}</p>
    </motion.div>
  );
}
