import { cn } from '@/presentation/lib/cn';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

type AlertVariant = 'error' | 'success' | 'info';

type AlertProps = { variant?: AlertVariant; message: string; className?: string };

const config: Record<AlertVariant, { wrap: string; Icon: React.ComponentType<{ className?: string }> }> = {
  error:   { wrap: 'bg-[#FF6B6B]/10 text-[#FF6B6B] border-[#FF6B6B]/30', Icon: AlertTriangle },
  success: { wrap: 'bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/30', Icon: CheckCircle2 },
  info:    { wrap: 'bg-white/5 text-[#F0F0F0] border-white/10',           Icon: Info },
};

export function Alert({ variant = 'error', message, className }: Readonly<AlertProps>) {
  const { wrap, Icon } = config[variant];
  return (
    <div role="alert" className={cn('flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm', wrap, className)}>
      <Icon className="h-4 w-4 shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
}
