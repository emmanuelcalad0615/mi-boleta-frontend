import { Ticket } from 'lucide-react';

type EmptyStateProps = { title: string; description?: string; action?: React.ReactNode };

export function EmptyState({ title, description, action }: Readonly<EmptyStateProps>) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-full bg-[#00D4FF] opacity-20 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1A1A1A] border border-[#00D4FF]/30 text-[#00D4FF] shadow-[0_0_24px_#00D4FF44]">
          <Ticket className="h-9 w-9" />
        </div>
      </div>
      <h3 className="font-display text-xl font-bold text-[#F0F0F0]">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-[#888888]">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
